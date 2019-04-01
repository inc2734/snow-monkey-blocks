'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';
import CategoriesList from './_categories-list.js';

const { remove, union, indexOf, compact } = lodash;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl, Placeholder, Spinner, CheckboxControl, SelectControl } = wp.components;
const { Fragment, Component } = wp.element;
const { __ } = wp.i18n;

export const edit = ( props ) => {
	const { attributes: { articles, exclusionCategories, orderby, order }, articleCategories, className, setAttributes } = props;

	const classes = classnames( 'smb-categories-list', className );

	if ( ! articleCategories || ! articleCategories.length ) {
		return (
			<Placeholder
				icon="editor-ul"
				label={ __( 'Categories list', 'snow-monkey-blocks' ) }
			>
				<Spinner />
				{ __( 'Loading Setting Data', 'snow-monkey-blocks' ) }
			</Placeholder>
		);
	}

	const _generateNewExclusionCategories = ( isChecked, categoryId ) => {
		let newExclusionCategories = [];
		if ( exclusionCategories !== undefined && exclusionCategories !== null ) {
			newExclusionCategories = exclusionCategories.split( ',' );
		}
		if ( isChecked ) {
			newExclusionCategories.push( categoryId );
		} else {
			newExclusionCategories = remove( newExclusionCategories, ( value ) => categoryId !== value );
		}
		return compact( union( newExclusionCategories ) ).join( ',' );
	};

	const viewCategoriesPanel = () => {
		const articleCategoriesList = [];
		articleCategories.map( ( category ) => {
			articleCategoriesList.push(
				<CheckboxControl
					label={ category.name }
					value={ String( category.id ) }
					checked={ -1 !== indexOf( exclusionCategories.split( ',' ), String( category.id ) ) }
					onChange={ ( isChecked ) => {
						setAttributes( { exclusionCategories: _generateNewExclusionCategories( isChecked, String( category.id ) ) } );
					} }
				/>
			);
		} );
		return (
			<PanelBody title={ __( 'Exclusion Categories Settings', 'snow-monkey-blocks' ) }>
				<p>{ __( 'Categories with a post count of 0 are not displayed even if they are not excluded', 'snow-monkey-blocks' ) }</p>
				{ articleCategoriesList }
			</PanelBody>
		);
	};

	const View = () => {
		const articleCategoriesList = [];
		articleCategories.map( ( category ) => {
			if ( category.count > 0 && ( -1 === indexOf( exclusionCategories.split( ',' ), String( category.id ) ) ) ) {
				articleCategoriesList.push(
					<li className="smb-categories-list__item">
						<div className="smb-categories-list__item__count">
							{ category.count }
							<span>{ __( 'articles', 'snow-monkey-blocks' ) }</span>
						</div>
						<div className="smb-categories-list__item__detail">
							<div className="smb-categories-list__item__category-name">
								{ category.name }
							</div>
							{ category.description &&
								<div className="smb-categories-list__item__category-description">
									{ category.description }
								</div>
							}
							<div className="smb-categories-list__item__recent-label">
								{ __( 'Recent posts', 'snow-monkey-blocks' ) }
							</div>
							<ul className="smb-categories-list__item__list">
								<li>{ __( 'Only the actual contribution screen is displayed', 'snow-monkey-blocks' ) }</li>
							</ul>
						</div>
					</li>
				);
			}
		} );

		class List extends Component {
			componentDidMount() {
				setTimeout( () => new CategoriesList( this.ulRef ), 0 );
			}

			render() {
				return (
					<ul className="smb-categories-list__list" ref={ ( ref ) => this.ulRef = ref }>
						{ articleCategoriesList }
					</ul>
				);
			}
		}

		return (
			<div className={ classes }>
				<List />
			</div>
		);
	};

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
				{ viewCategoriesPanel() }
				<PanelBody title={ __( 'Display order settings', 'snow-monkey-blocks' ) }>
					<p>{ __( 'The display order you set is valid only on the actual contribution screen', 'snow-monkey-blocks' ) }</p>
					<SelectControl
						label={ __( 'orderby', 'snow-monkey-blocks' ) }
						value={ orderby }
						options={ [
							{ label: __( 'category id', 'snow-monkey-blocks' ), value: 'id' },
							{ label: __( 'category name', 'snow-monkey-blocks' ), value: 'name' },
							{ label: __( 'category slug', 'snow-monkey-blocks' ), value: 'slug' },
							{ label: __( 'category post count', 'snow-monkey-blocks' ), value: 'count' },
							{ label: __( 'term_group', 'snow-monkey-blocks' ), value: 'term_group' },
						] }
						onChange={ ( value ) => setAttributes( { orderby: value } ) }
					/>
					<SelectControl
						label={ __( 'order', 'snow-monkey-blocks' ) }
						value={ order }
						options={ [
							{ label: __( 'asc', 'snow-monkey-blocks' ), value: 'asc' },
							{ label: __( 'desc', 'snow-monkey-blocks' ), value: 'desc' },
						] }
						onChange={ ( value ) => setAttributes( { order: value } ) }
					/>
				</PanelBody>
			</InspectorControls>

			<View />
		</Fragment>
	);
};
