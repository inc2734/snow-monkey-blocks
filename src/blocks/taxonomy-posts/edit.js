import { find, times } from 'lodash';

import {
	BaseControl,
	Button,
	Disabled,
	Flex,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	TextareaControl,
	ToggleControl,
	TreeSelect,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useMemo, useEffect } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

import { toNumber, buildTermsTree } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes, clientId } ) {
	const {
		taxonomy,
		termId,
		postsPerPage,
		layout,
		gap,
		ignoreStickyPosts,
		smCols,
		noPostsText,
		itemTitleTagName,
		itemThumbnailSizeSlug,
		forceDisplayItemMeta,
		displayItemAuthor,
		displayItemPublished,
		displayItemModified,
		forceDisplayItemTerms,
		displayItemExcerpt,
		categoryLabelTaxonomy,
		arrows,
		dots,
		interval,
		autoplayButton,
	} = attributes;

	useEffect( () => {
		let newDisplayItemAuthor;
		if ( null == displayItemAuthor ) {
			newDisplayItemAuthor = ! [ 'text', 'text2' ].includes( layout );
		} else {
			newDisplayItemAuthor = displayItemAuthor;
		}

		let newDisplayItemExcerpt;
		if ( null == displayItemExcerpt ) {
			newDisplayItemExcerpt = [
				'rich-media',
				'simple',
				'caroucel',
			].includes( layout );
		} else {
			newDisplayItemExcerpt = displayItemExcerpt;
		}

		setAttributes( {
			displayItemAuthor: newDisplayItemAuthor,
			displayItemExcerpt: newDisplayItemExcerpt,
		} );
	}, [ layout ] );

	useEffect( () => {
		setAttributes( {
			clientId: attributes.clientId || clientId,
		} );
	}, [] );

	const { taxonomiesTerms, taxonomies } = useSelect( ( select ) => {
		const { getTaxonomies, getEntityRecords } = select( 'core' );
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		const shownTaxonomies = allTaxonomies.filter(
			( _taxonomy ) => _taxonomy.visibility.show_ui
		);

		const _taxonomiesTerms = shownTaxonomies
			.map( ( _taxonomy ) => {
				const terms =
					getEntityRecords( 'taxonomy', _taxonomy.slug, {
						per_page: -1,
					} ) || [];
				if ( 0 < terms.length ) {
					return {
						taxonomy: _taxonomy.slug,
						terms,
					};
				}
				return {};
			} )
			.filter( ( taxonomyTerms ) => taxonomyTerms );

		return {
			taxonomiesTerms: _taxonomiesTerms,
			taxonomies: shownTaxonomies,
		};
	}, [] );

	const itemThumbnailSizeSlugOption = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		const { imageSizes } = getSettings();

		return imageSizes.map( ( imageSize ) => {
			return {
				value: imageSize.slug,
				label: imageSize.name,
			};
		} );
	}, [] );

	const categoryLabelTaxonomyOptions = useMemo( () => {
		const _categoryLabelTaxonomyOptions = taxonomies.map( ( _taxonomy ) => {
			return {
				value: _taxonomy.slug,
				label: _taxonomy.name,
			};
		} );
		_categoryLabelTaxonomyOptions.unshift( {
			value: '',
			label: __(
				'Default (Taxonomy selected in this block)',
				'snow-monkey-blocks'
			),
		} );
		return _categoryLabelTaxonomyOptions;
	}, [ taxonomies ] );

	const terms = find( taxonomiesTerms, { taxonomy } );
	const selectedTerm = !! terms
		? find( terms.terms, [ 'id', toNumber( termId ) ] )
		: [];

	const itemTitleTagNames = [ 'h2', 'h3', 'h4' ];

	const gapOptions = [
		{
			label: 'S',
			value: 1,
		},
		{
			label: 'M',
			value: 2,
		},
		{
			label: 'L',
			value: 3,
		},
	];

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					{ ! taxonomiesTerms.length ? (
						<div style={ { gridColumn: '1/-1' } }>
							<BaseControl
								label={ __(
									'Loading taxonomies…',
									'snow-monkey-blocks'
								) }
								id="snow-monkey-blocks/taxonomy-posts/taxonomies"
							>
								<Spinner />
							</BaseControl>
						</div>
					) : (
						<>
							<ToolsPanelItem
								hasValue={ () =>
									taxonomy !==
										metadata.attributes.taxonomy.default ||
									termId !==
										metadata.attributes.termId.default
								}
								isShownByDefault
								label={ __( 'Taxonomy', 'snow-monkey-blocks' ) }
								onDeselect={ () =>
									setAttributes( {
										taxonomy:
											metadata.attributes.taxonomy
												.default,
										termId: metadata.attributes.termId
											.default,
									} )
								}
							>
								<Flex direction="column">
									{ taxonomiesTerms.map(
										( taxonomyTerms ) => {
											const _taxonomy = find(
												taxonomies,
												[
													'slug',
													taxonomyTerms.taxonomy,
												]
											);

											const onChangeTaxonomyTermId = (
												value
											) => {
												setAttributes( {
													taxonomy: _taxonomy.slug,
													termId: toNumber( value ),
												} );
											};

											return (
												!! _taxonomy && (
													<TreeSelect
														key={ `${ _taxonomy.slug }-${ termId }` }
														label={ _taxonomy.name }
														noOptionLabel="-"
														onChange={
															onChangeTaxonomyTermId
														}
														selectedId={ termId }
														tree={ buildTermsTree(
															taxonomyTerms.terms
														) }
													/>
												)
											);
										}
									) }
								</Flex>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									postsPerPage !==
									metadata.attributes.postsPerPage.default
								}
								isShownByDefault
								label={ __(
									'Number of posts',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										postsPerPage:
											metadata.attributes.postsPerPage
												.default,
									} )
								}
							>
								<RangeControl
									label={ __(
										'Number of posts',
										'snow-monkey-blocks'
									) }
									value={ postsPerPage }
									onChange={ ( value ) =>
										setAttributes( {
											postsPerPage: toNumber(
												value,
												1,
												50
											),
										} )
									}
									min="1"
									max="50"
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									layout !==
									metadata.attributes.layout.default
								}
								isShownByDefault
								label={ __( 'Layout', 'snow-monkey-blocks' ) }
								onDeselect={ () =>
									setAttributes( {
										layout: metadata.attributes.layout
											.default,
									} )
								}
							>
								<SelectControl
									label={ __(
										'Layout',
										'snow-monkey-blocks'
									) }
									value={ layout }
									onChange={ ( value ) => {
										setAttributes( {
											layout: value,
										} );
									} }
									options={ [
										{
											value: 'rich-media',
											label: __(
												'Rich media',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'simple',
											label: __(
												'Simple',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'text',
											label: __(
												'Text',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'text2',
											label: __(
												'Text 2',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'panel',
											label: __(
												'Panels',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'carousel',
											label: sprintf(
												// translators: %1$s: Layout
												__(
													'Carousel (%1$s)',
													'snow-monkey-blocks'
												),
												__(
													'Rich media',
													'snow-monkey-blocks'
												)
											),
										},
										{
											value: 'large-image',
											label: __(
												'Large image',
												'snow-monkey-blocks'
											),
										},
									] }
								/>
							</ToolsPanelItem>
						</>
					) }

					{ 'carousel' === layout && (
						<>
							<ToolsPanelItem
								hasValue={ () =>
									arrows !==
									metadata.attributes.arrows.default
								}
								isShownByDefault
								label={ __(
									'Display arrows',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										arrows: metadata.attributes.arrows
											.default,
									} )
								}
							>
								<ToggleControl
									label={ __(
										'Display arrows',
										'snow-monkey-blocks'
									) }
									checked={ arrows }
									onChange={ ( value ) =>
										setAttributes( {
											arrows: value,
										} )
									}
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									dots !== metadata.attributes.dots.default
								}
								isShownByDefault
								label={ __(
									'Display dots',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										dots: metadata.attributes.dots.default,
									} )
								}
							>
								<ToggleControl
									label={ __(
										'Display dots',
										'snow-monkey-blocks'
									) }
									checked={ dots }
									onChange={ ( value ) =>
										setAttributes( {
											dots: value,
										} )
									}
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									interval !==
									metadata.attributes.interval.default
								}
								isShownByDefault
								label={ __(
									'Autoplay Speed in seconds',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										interval:
											metadata.attributes.interval
												.default,
									} )
								}
							>
								<RangeControl
									label={ __(
										'Autoplay Speed in seconds',
										'snow-monkey-blocks'
									) }
									help={ __(
										'If "0", no scroll.',
										'snow-monkey-blocks'
									) }
									value={ interval }
									onChange={ ( value ) =>
										setAttributes( {
											interval: toNumber( value, 0, 10 ),
										} )
									}
									min="0"
									max="10"
								/>
							</ToolsPanelItem>

							{ 0 < interval && (
								<ToolsPanelItem
									hasValue={ () =>
										autoplayButton !==
										metadata.attributes.autoplayButton
											.default
									}
									isShownByDefault
									label={ __(
										'Autoplay Speed in seconds',
										'snow-monkey-blocks'
									) }
									onDeselect={ () =>
										setAttributes( {
											autoplayButton:
												metadata.attributes
													.autoplayButton.default,
										} )
									}
								>
									<ToggleControl
										label={ __(
											'Display pause button for autoplay',
											'snow-monkey-blocks'
										) }
										checked={ autoplayButton }
										onChange={ ( value ) =>
											setAttributes( {
												autoplayButton: value,
											} )
										}
									/>
								</ToolsPanelItem>
							) }
						</>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							itemTitleTagName !==
							metadata.attributes.itemTitleTagName.default
						}
						isShownByDefault
						label={ __(
							'Title tag of each items',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								itemTitleTagName:
									metadata.attributes.itemTitleTagName
										.default,
							} )
						}
					>
						<BaseControl
							label={ __(
								'Title tag of each items',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/taxonomy-posts/item-title-tag-name"
						>
							<div className="smb-list-icon-selector">
								{ times(
									itemTitleTagNames.length,
									( index ) => {
										const onClickItemTitleTagName = () =>
											setAttributes( {
												itemTitleTagName:
													itemTitleTagNames[ index ],
											} );

										return (
											<Button
												variant={
													itemTitleTagName ===
													itemTitleTagNames[ index ]
														? 'primary'
														: 'secondary'
												}
												onClick={
													onClickItemTitleTagName
												}
												key={ index }
											>
												{ itemTitleTagNames[ index ] }
											</Button>
										);
									}
								) }
							</div>
						</BaseControl>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							itemThumbnailSizeSlug !==
							metadata.attributes.itemThumbnailSizeSlug.default
						}
						isShownByDefault
						label={ __(
							'Images size of each items',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								itemThumbnailSizeSlug:
									metadata.attributes.itemThumbnailSizeSlug
										.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Images size of each items',
								'snow-monkey-blocks'
							) }
							value={ itemThumbnailSizeSlug }
							options={ itemThumbnailSizeSlugOption }
							onChange={ ( value ) =>
								setAttributes( {
									itemThumbnailSizeSlug: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ taxonomy !== 'category' && taxonomy !== 'post_tag' && (
						<ToolsPanelItem
							hasValue={ () =>
								forceDisplayItemMeta !==
								metadata.attributes.forceDisplayItemMeta.default
							}
							isShownByDefault
							label={ __(
								'Force display meta of each items',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									forceDisplayItemMeta:
										metadata.attributes.forceDisplayItemMeta
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Force display meta of each items',
									'snow-monkey-blocks'
								) }
								help={ __(
									"If it's already displayed, this setting will be ignored.",
									'snow-monkey-blocks'
								) }
								checked={ forceDisplayItemMeta }
								onChange={ ( value ) =>
									setAttributes( {
										forceDisplayItemMeta: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					{ ( taxonomy === 'category' ||
						taxonomy === 'post_tag' ||
						forceDisplayItemMeta ) &&
						'text' !== layout && (
							<ToolsPanelItem
								hasValue={ () =>
									displayItemAuthor !==
									! [ 'text', 'text2' ].includes( layout )
								}
								isShownByDefault
								label={ __(
									'Display author of each items',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										displayItemAuthor: ! [
											'text',
											'text2',
										].includes( layout ),
									} )
								}
							>
								<ToggleControl
									label={ __(
										'Display author of each items',
										'snow-monkey-blocks'
									) }
									checked={ displayItemAuthor }
									onChange={ ( value ) =>
										setAttributes( {
											displayItemAuthor: value,
										} )
									}
								/>
							</ToolsPanelItem>
						) }

					{ ( taxonomy === 'category' ||
						taxonomy === 'post_tag' ||
						forceDisplayItemMeta ) && (
						<ToolsPanelItem
							hasValue={ () =>
								displayItemPublished !==
								metadata.attributes.displayItemPublished.default
							}
							isShownByDefault
							label={ __(
								'Display published date of each items',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									displayItemPublished:
										metadata.attributes.displayItemPublished
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Display published date of each items',
									'snow-monkey-blocks'
								) }
								checked={ displayItemPublished }
								onChange={ ( value ) =>
									setAttributes( {
										displayItemPublished: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					{ ( taxonomy === 'category' ||
						taxonomy === 'post_tag' ||
						forceDisplayItemMeta ) && (
						<ToolsPanelItem
							hasValue={ () =>
								displayItemModified !==
								metadata.attributes.displayItemModified.default
							}
							isShownByDefault
							label={ __(
								'Display modified date of each items',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									displayItemModified:
										metadata.attributes.displayItemModified
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Display modified date of each items',
									'snow-monkey-blocks'
								) }
								checked={ displayItemModified }
								onChange={ ( value ) =>
									setAttributes( {
										displayItemModified: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					{ [ 'rich-media', 'simple', 'panel', 'carousel' ].includes(
						layout
					) && (
						<ToolsPanelItem
							hasValue={ () =>
								displayItemExcerpt ===
								[
									'rich-media',
									'simple',
									'panel',
									'carousel',
								].includes( layout )
							}
							isShownByDefault
							label={ __(
								'Display excerpt of each items',
								'snow-monkey-blocks'
							) }
							onDeselect={ () => {
								setAttributes( {
									displayItemExcerpt: [
										'rich-media',
										'simple',
										'panel',
										'carousel',
									].includes( layout ),
								} );
							} }
						>
							<ToggleControl
								label={ __(
									'Display excerpt of each items',
									'snow-monkey-blocks'
								) }
								checked={ displayItemExcerpt }
								onChange={ ( value ) =>
									setAttributes( {
										displayItemExcerpt: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					{ taxonomy !== 'category' && taxonomy !== 'post_tag' && (
						<ToolsPanelItem
							hasValue={ () =>
								forceDisplayItemTerms !==
								metadata.attributes.forceDisplayItemTerms
									.default
							}
							isShownByDefault
							label={ __(
								'Force display category label of each items',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									forceDisplayItemTerms:
										metadata.attributes
											.forceDisplayItemTerms.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Force display category label of each items',
									'snow-monkey-blocks'
								) }
								help={ __(
									"If it's already displayed, this setting will be ignored.",
									'snow-monkey-blocks'
								) }
								checked={ forceDisplayItemTerms }
								onChange={ ( value ) =>
									setAttributes( {
										forceDisplayItemTerms: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							categoryLabelTaxonomy !==
							metadata.attributes.categoryLabelTaxonomy.default
						}
						isShownByDefault
						label={ __(
							'Taxonomy to use for the category label',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								categoryLabelTaxonomy:
									metadata.attributes.categoryLabelTaxonomy
										.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Taxonomy to use for the category label',
								'snow-monkey-blocks'
							) }
							help={ __(
								'If no category labels are displayed, this setting will be ignored.',
								'snow-monkey-blocks'
							) }
							value={ categoryLabelTaxonomy }
							options={ categoryLabelTaxonomyOptions }
							onChange={ ( value ) =>
								setAttributes( {
									categoryLabelTaxonomy: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ ( 'rich-media' === layout || 'panel' === layout ) && (
						<ToolsPanelItem
							hasValue={ () =>
								smCols !== metadata.attributes.smCols.default
							}
							isShownByDefault
							label={ __(
								'Number of columns displayed on mobile device',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									smCols: metadata.attributes.smCols.default,
								} )
							}
						>
							<SelectControl
								label={ __(
									'Number of columns displayed on mobile device',
									'snow-monkey-blocks'
								) }
								value={ smCols }
								onChange={ ( value ) =>
									setAttributes( {
										smCols: toNumber( value ),
									} )
								}
								options={ [
									{
										value: 0,
										label: __(
											'Default',
											'snow-monkey-blocks'
										),
									},
									{
										value: 1,
										label: __(
											'1 column',
											'snow-monkey-blocks'
										),
									},
									{
										value: 2,
										label: __(
											'2 columns',
											'snow-monkey-blocks'
										),
									},
								] }
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							ignoreStickyPosts !==
							metadata.attributes.ignoreStickyPosts.default
						}
						isShownByDefault
						label={ __(
							'Ignore sticky posts',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								ignoreStickyPosts:
									metadata.attributes.ignoreStickyPosts
										.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Ignore sticky posts',
								'snow-monkey-blocks'
							) }
							checked={ ignoreStickyPosts }
							onChange={ ( value ) =>
								setAttributes( {
									ignoreStickyPosts: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							noPostsText !==
							metadata.attributes.noPostsText.default
						}
						isShownByDefault
						label={ __(
							'Text if no posts matched',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								noPostsText:
									metadata.attributes.noPostsText.default,
							} )
						}
					>
						<TextareaControl
							label={ __(
								'Text if no posts matched',
								'snow-monkey-blocks'
							) }
							help={ __( 'Allow HTML', 'snow-monkey-blocks' ) }
							value={ noPostsText || '' }
							onChange={ ( value ) =>
								setAttributes( {
									noPostsText: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls group="dimensions">
				<ToolsPanelItem
					hasValue={ () => gap !== metadata.attributes.gap.default }
					isShownByDefault
					label={ __(
						'The gap between each item',
						'snow-monkey-blocks'
					) }
					onDeselect={ () =>
						setAttributes( {
							gap: metadata.attributes.gap.default,
						} )
					}
					panelId={ clientId }
				>
					<BaseControl
						id="snow-monkey-blocks/recent-posts/gap"
						label={ __(
							'The gap between each item',
							'snow-monkey-blocks'
						) }
						className="spacing-sizes-control"
					>
						<RangeControl
							className="spacing-sizes-control__range-control"
							value={
								gapOptions.filter(
									( option ) =>
										option.label?.toLowerCase() === gap
								)?.[ 0 ]?.value
							}
							resetFallbackValue={ undefined }
							onChange={ ( value ) =>
								setAttributes( {
									gap: gapOptions
										.filter(
											( option ) => option.value === value
										)?.[ 0 ]
										?.label?.toLowerCase(),
								} )
							}
							withInputField={ false }
							min={ 1 }
							max={ 3 }
							marks
							renderTooltipContent={ ( _value ) =>
								gapOptions
									.filter(
										( option ) => option.value === _value
									)?.[ 0 ]
									?.label?.toUpperCase()
							}
							hideLabelFromVision
							__nextHasNoMarginBottom
						/>
					</BaseControl>
				</ToolsPanelItem>
			</InspectorControls>

			<div { ...useBlockProps() }>
				{ ! selectedTerm || ! terms ? (
					<Placeholder
						icon="editor-ul"
						label={ __( 'Taxonomy posts', 'snow-monkey-blocks' ) }
					>
						<Spinner />
					</Placeholder>
				) : (
					<Disabled>
						<ServerSideRender
							block="snow-monkey-blocks/taxonomy-posts"
							attributes={ attributes }
						/>
					</Disabled>
				) }
			</div>
		</>
	);
}
