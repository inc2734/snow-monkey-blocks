'use strict';

import Select from 'react-select';
import toNumber from '../../src/js/helper/to-number';

const { apiFetch } = wp;
const { registerStore, withSelect } = wp.data;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl, Dashicon, Spinner } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const actions = {
	setArticleCategories( articleCategories ) {
		return {
			type: 'SET_ARTICLE_CATEGORIES',
			articleCategories,
		};
	},
	receiveArticleCategories( path ) {
		return {
			type: 'RECEIVE_ARTICLE_CATEGORIES',
			path,
		};
	},
};

registerStore(
	'snow-monkey-blocks/categories-list', {
		reducer( state = { articleCategories: {} }, action ) {
			switch ( action.type ) {
				case 'SET_ARTICLE_CATEGORIES':
					return {
						...state,
						articleCategories: action.articleCategories,
					};
			}
			return state;
		},
		actions,
		selectors: {
			receiveArticleCategories( state ) {
				const { articleCategories } = state;
				return articleCategories;
			},
		},
		controls: {
			RECEIVE_ARTICLE_CATEGORIES( action ) {
				return apiFetch( { path: action.path } );
			},
		},
		resolvers: {
			* receiveArticleCategories() {
				const articleCategories = yield actions.receiveArticleCategories( '/snow-monkey-blocks/v4/article-categories/' );
				return actions.setArticleCategories( articleCategories );
			},
		},
	}
);

registerBlockType( 'snow-monkey-blocks/categories-list', {
	title: __( 'Categories list', 'snow-monkey-blocks' ),
	description: __( 'This block is displayed only on the actual screen.', 'snow-monkey-blocks' ),
	icon: 'excerpt-view',
	category: 'smb',
	attributes: {
		exclusionCategories: {
			type: 'string',
			default: null,
		},
	},
	edit: withSelect( ( select ) => {
		return {
			articleCategories: select( 'snow-monkey-blocks/categories-list' ).receiveArticleCategories(),
		};
	} )( ( props ) => {
		const { attributes: { articles, exclusionCategories }, articleCategories, className, setAttributes } = props;
		let selectedExclusionCategories = [];
		if ( null !== exclusionCategories ) {
			selectedExclusionCategories = JSON.parse( exclusionCategories );
		}
		if ( ! articleCategories.length ) {
			return (
				<p className={ className }>
					<Spinner />
					{ __( 'Loading Setting Data', 'snow-monkey-blocks' ) }
				</p>
			);
		}
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Categories list Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Categories List Articles', 'snow-monkey-blocks' ) }
							value={ articles }
							onChange={ ( value ) => setAttributes( { articles: toNumber( value, 1, 5 ) } ) }
							min="1"
							max="5"
						/>
					</PanelBody>
					<PanelBody title={ __( 'Exclusion Categories Settings', 'snow-monkey-blocks' ) }>
						<label className="components-base-control__label" htmlFor="inspector-exclusion-select-0">{ __( 'Exclusion Categories', 'snow-monkey-blocks' ) }</label>
						<Select
							id="inspector-exclusion-select-0"
							value={ selectedExclusionCategories }
							onChange={ ( value ) => setAttributes( { exclusionCategories: JSON.stringify( value ) } ) }
							options={ articleCategories }
							isMulti="true"
						/>
					</PanelBody>
				</InspectorControls>

				<div className="components-placeholder">
					<div className="components-placeholder__label">
						<Dashicon icon="excerpt-view" />
						{ __( 'Categories list', 'snow-monkey-blocks' ) }
					</div>
					<div className="components-placeholder__instructions">
						{ __( 'displayed categories list on the actual screen.', 'snow-monkey-blocks' ) }
					</div>
				</div>
			</Fragment>
		);
	} ),

	save() {
		return null;
	},
} );
