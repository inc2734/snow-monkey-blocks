import classnames from 'classnames';

import { compact, indexOf, remove, union } from 'lodash';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import {
	CheckboxControl,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
} from '@wordpress/components';

import { toNumber } from '@smb/helper';
import { apply } from './categories-list';
import { store } from './store';

export default function ( { attributes, setAttributes, className } ) {
	const { articles, exclusionCategories, orderby, order } = attributes;

	const ulRef = useRef();

	useEffect( () => {
		if ( !! ulRef.current ) {
			apply( ulRef.current );
		}
	} );

	const articleCategories = useSelect( ( select ) =>
		select( store ).getArticleCategories()
	);

	if ( ! articleCategories || ! articleCategories.length ) {
		return (
			<div { ...useBlockProps() }>
				<Placeholder
					icon="editor-ul"
					label={ __( 'Categories list', 'snow-monkey-blocks' ) }
				>
					<Spinner />
					{ __( 'Loading Setting Data', 'snow-monkey-blocks' ) }
				</Placeholder>
			</div>
		);
	}

	const _generateNewExclusionCategories = ( isChecked, categoryId ) => {
		let newExclusionCategories = [];
		if (
			exclusionCategories !== undefined &&
			exclusionCategories !== null
		) {
			newExclusionCategories = exclusionCategories.split( ',' );
		}
		if ( isChecked ) {
			newExclusionCategories.push( categoryId );
		} else {
			newExclusionCategories = remove(
				newExclusionCategories,
				( value ) => categoryId !== value
			);
		}
		return compact( union( newExclusionCategories ) ).join( ',' );
	};

	const CategoriesPanel = () => {
		const articleCategoriesList = articleCategories.map( ( category ) => {
			const onChangeExclusionCategories = ( isChecked ) => {
				setAttributes( {
					exclusionCategories: _generateNewExclusionCategories(
						isChecked,
						String( category.id )
					),
				} );
			};

			return (
				<CheckboxControl
					key={ category.id }
					label={ category.name }
					value={ String( category.id ) }
					checked={
						-1 !==
						indexOf(
							exclusionCategories.split( ',' ),
							String( category.id )
						)
					}
					onChange={ onChangeExclusionCategories }
				/>
			);
		} );

		return (
			<PanelBody
				title={ __(
					'Exclusion Categories Settings',
					'snow-monkey-blocks'
				) }
			>
				<p>
					{ __(
						'Categories with a post count of 0 are not displayed even if they are not excluded',
						'snow-monkey-blocks'
					) }
				</p>
				{ articleCategoriesList }
			</PanelBody>
		);
	};

	const classes = classnames( 'smb-categories-list', className );

	const View = () => {
		const articleCategoriesList = articleCategories
			.map( ( category ) => {
				if (
					category.count > 0 &&
					-1 ===
						indexOf(
							exclusionCategories.split( ',' ),
							String( category.id )
						)
				) {
					return (
						<li
							className="smb-categories-list__item"
							key={ category.id }
						>
							<div className="smb-categories-list__item__count">
								{ category.count }
								<span>
									{ __( 'articles', 'snow-monkey-blocks' ) }
								</span>
							</div>
							<div className="smb-categories-list__item__detail">
								<div className="smb-categories-list__item__category-name">
									{ category.name }
								</div>
								{ category.description && (
									<div className="smb-categories-list__item__category-description">
										{ category.description }
									</div>
								) }
								<div className="smb-categories-list__item__recent-label">
									{ __(
										'Recent posts',
										'snow-monkey-blocks'
									) }
								</div>
								<ul className="smb-categories-list__item__list">
									<li>
										{ __(
											'Only the actual contribution screen is displayed',
											'snow-monkey-blocks'
										) }
									</li>
								</ul>
							</div>
						</li>
					);
				}
				return null;
			} )
			.filter( ( category ) => category );

		return (
			<div className={ classes }>
				<ul className="smb-categories-list__list" ref={ ulRef }>
					{ articleCategoriesList.filter(
						( articleCategory ) => articleCategory
					) }
				</ul>
			</div>
		);
	};

	const onChangeArticles = ( value ) =>
		setAttributes( {
			articles: toNumber( value, 1, 5 ),
		} );

	const onChangeOrderby = ( value ) =>
		setAttributes( {
			orderby: value,
		} );

	const onChangeOrder = ( value ) =>
		setAttributes( {
			order: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<RangeControl
						label={ __(
							'Categories List Articles',
							'snow-monkey-blocks'
						) }
						value={ articles }
						onChange={ onChangeArticles }
						min="1"
						max="5"
					/>
				</PanelBody>

				<CategoriesPanel />

				<PanelBody
					title={ __(
						'Display order settings',
						'snow-monkey-blocks'
					) }
				>
					<p>
						{ __(
							'The display order you set is valid only on the actual contribution screen',
							'snow-monkey-blocks'
						) }
					</p>
					<SelectControl
						label={ __( 'orderby', 'snow-monkey-blocks' ) }
						value={ orderby }
						options={ [
							{
								label: __(
									'category id',
									'snow-monkey-blocks'
								),
								value: 'id',
							},
							{
								label: __(
									'category name',
									'snow-monkey-blocks'
								),
								value: 'name',
							},
							{
								label: __(
									'category slug',
									'snow-monkey-blocks'
								),
								value: 'slug',
							},
							{
								label: __(
									'category post count',
									'snow-monkey-blocks'
								),
								value: 'count',
							},
							{
								label: __( 'term_group', 'snow-monkey-blocks' ),
								value: 'term_group',
							},
						] }
						onChange={ onChangeOrderby }
					/>
					<SelectControl
						label={ __( 'order', 'snow-monkey-blocks' ) }
						value={ order }
						options={ [
							{
								label: __( 'asc', 'snow-monkey-blocks' ),
								value: 'asc',
							},
							{
								label: __( 'desc', 'snow-monkey-blocks' ),
								value: 'desc',
							},
						] }
						onChange={ onChangeOrder }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<View />
			</div>
		</>
	);
}
