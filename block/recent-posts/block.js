'use strict';

import toNumber from '../../src/js/helper/to-number';

const { apiFetch } = wp;
const { registerStore, withSelect } = wp.data;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, RangeControl, ServerSideRender, ToggleControl, Spinner } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const actions = {
	setPostCategories( postCategories ) {
		return {
			type: 'SET_POST_CATEGORIES',
			postCategories,
		};
	},
	receivePostCategories( path ) {
		return {
			type: 'RECEIVE_POST_CATEGORIES',
			path,
		};
	},
};

registerStore( 'snow-monkey-blocks/recent-posts', {
	reducer( state = { postCategories: {} }, action ) {
		switch ( action.type ) {
			case 'SET_POST_CATEGORIES':
				return {
					...state,
					postCategories: action.postCategories,
				};
			case 'RECEIVE_POST_CATEGORIES':
				return action.postCategories;
		}
		return state;
	},
	actions,
	selectors: {
		receivePostCategories( state ) {
			const { postCategories } = state;
			return postCategories;
		},
	},
	controls: {
		RECEIVE_POST_CATEGORIES( action ) {
			return apiFetch( { path: action.path } );
		},
	},
	resolvers: {
		* receivePostCategories() {
			const postCategories = yield actions.receivePostCategories( '/wp/v2/categories/?per_page=100' );
			return actions.setPostCategories( postCategories );
		},
	},
} );

registerBlockType( 'snow-monkey-blocks/recent-posts', {
	title: __( 'Recent posts', 'snow-monkey-blocks' ),
	description: __( 'This is a block that displays a list of recent posts', 'snow-monkey-blocks' ),
	icon: 'editor-ul',
	category: 'smb',

	edit: withSelect( ( select ) => {
		return {
			postCategories: select( 'snow-monkey-blocks/recent-posts' ).receivePostCategories(),
		};
	} )( ( props ) => {
		const { attributes, postCategories, className, setAttributes } = props;
		const { postsPerPage, layout, ignoreStickyPosts, postCategory } = attributes;

		if ( ! postCategories.length ) {
			return (
				<p className={ className }>
					<Spinner />
					{ __( 'Loading Setting Data', 'snow-monkey-blocks' ) }
				</p>
			);
		}

		const viewCategoriesPanel = () => {
			const postCategoriesList = [];
			postCategoriesList.push( {
				label: __( 'All', 'snow-monkey-blocks' ),
				value: '',
			} );
			postCategories.map( ( category ) => {
				postCategoriesList.push( {
					label: String( category.name ),
					value: String( category.id ),
				} );
			} );
			return (
				<PanelBody title={ __( 'Categories Settings', 'snow-monkey-blocks' ) }>
					<p>{ __( 'The category with no post is not displayed', 'snow-monkey-blocks' ) }</p>
					<SelectControl
						label={ __( 'Categories', 'snow-monkey-blocks' ) }
						value={ postCategory }
						onChange={ ( value ) => setAttributes( { postCategory: value } ) }
						options={ postCategoriesList }
					/>
				</PanelBody>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Recent Posts Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Number of posts', 'snow-monkey-blocks' ) }
							value={ postsPerPage }
							onChange={ ( value ) => setAttributes( { postsPerPage: toNumber( value, 1, 12 ) } ) }
							min="1"
							max="12"
						/>

						<SelectControl
							label={ __( 'Layout', 'snow-monkey-blocks' ) }
							value={ layout }
							onChange={ ( value ) => setAttributes( { layout: value } ) }
							options={ [
								{
									value: 'rich-media',
									label: __( 'Rich media', 'snow-monkey-blocks' ),
								},
								{
									value: 'simple',
									label: __( 'Simple', 'snow-monkey-blocks' ),
								},
								{
									value: 'text',
									label: __( 'Text', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<ToggleControl
							label={ __( 'Ignore sticky posts', 'snow-monkey-blocks' ) }
							checked={ ignoreStickyPosts }
							onChange={ ( value ) => setAttributes( { ignoreStickyPosts: value } ) }
						/>
					</PanelBody>
					{ viewCategoriesPanel() }
				</InspectorControls>

				<ServerSideRender
					block="snow-monkey-blocks/recent-posts"
					attributes={ attributes }
				/>
			</Fragment>
		);
	} ),

	save() {
		return null;
	},
} );
