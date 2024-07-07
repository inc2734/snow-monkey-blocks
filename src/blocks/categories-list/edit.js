import classnames from 'classnames';
import { compact, indexOf, remove, union } from 'lodash';

import {
	Placeholder,
	RangeControl,
	SelectControl,
	ToggleControl,
	Spinner,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import { store } from './store';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className } ) {
	const { articles, exclusionCategories, orderby, order } = attributes;

	const ulRef = useRef();

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
					{ __( 'Loading setting data', 'snow-monkey-blocks' ) }
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

	const ArticleCategoriesList = () => {
		return articleCategories.map( ( category ) => {
			return (
				<ToggleControl
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
					onChange={ ( isChecked ) => {
						setAttributes( {
							exclusionCategories:
								_generateNewExclusionCategories(
									isChecked,
									String( category.id )
								),
						} );
					} }
				/>
			);
		} );
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

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							articles !== metadata.attributes.articles.default
						}
						isShownByDefault
						label={ __(
							'Categories list articles',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								articles: metadata.attributes.articles.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Categories list articles',
								'snow-monkey-blocks'
							) }
							value={ articles }
							onChange={ ( value ) =>
								setAttributes( {
									articles: toNumber( value, 1, 5 ),
								} )
							}
							min="1"
							max="5"
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={ __(
						'Exclusion categories settings',
						'snow-monkey-blocks'
					) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							exclusionCategories !==
							metadata.attributes.exclusionCategories.default
						}
						isShownByDefault
						label={ __(
							'Exclusion categories settings',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								exclusionCategories:
									metadata.attributes.exclusionCategories
										.default,
							} )
						}
					>
						<p style={ { gridColumn: '1/-1' } }>
							{ __(
								'Categories with a post count of 0 are not displayed even if they are not excluded',
								'snow-monkey-blocks'
							) }
						</p>

						<div style={ { display: 'grid', gap: '16px' } }>
							<ArticleCategoriesList />
						</div>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={ __(
						'Display order settings',
						'snow-monkey-blocks'
					) }
				>
					<p style={ { gridColumn: '1/-1' } }>
						{ __(
							'The display order you set is valid only on the actual contribution screen',
							'snow-monkey-blocks'
						) }
					</p>

					<ToolsPanelItem
						hasValue={ () =>
							orderby !== metadata.attributes.orderby.default
						}
						isShownByDefault
						label={ __( 'orderby', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								orderby: metadata.attributes.orderby.default,
							} )
						}
					>
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
									label: __(
										'term_group',
										'snow-monkey-blocks'
									),
									value: 'term_group',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									orderby: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							order !== metadata.attributes.order.default
						}
						isShownByDefault
						label={ __( 'order', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								order: metadata.attributes.order.default,
							} )
						}
					>
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
							onChange={ ( value ) =>
								setAttributes( {
									order: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...useBlockProps() }>
				<View />
			</div>
		</>
	);
}
