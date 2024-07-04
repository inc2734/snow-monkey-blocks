import { times } from 'lodash';

import {
	BaseControl,
	Button,
	Disabled,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import SearchPostControl from '@smb/component/search-post-control';
import { toNumber } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes, clientId } ) {
	const {
		title,
		layout,
		gap,
		smCols,
		itemTitleTagName,
		itemThumbnailSizeSlug,
		arrows,
		dots,
		interval,
		autoplayButton,
		parent,
	} = attributes;

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
					<ToolsPanelItem
						hasValue={ () =>
							title !== metadata.attributes.title.default
						}
						isShownByDefault
						label={ __( 'Title', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								title: metadata.attributes.title.default,
							} )
						}
					>
						<TextControl
							label={ __( 'Title', 'snow-monkey-blocks' ) }
							value={ title }
							placeholder={ __(
								'Child pages',
								'snow-monkey-blocks'
							) }
							onChange={ ( value ) =>
								setAttributes( {
									title: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							layout !== metadata.attributes.layout.default
						}
						isShownByDefault
						label={ __( 'Layout', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								layout: metadata.attributes.layout.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Layout', 'snow-monkey-blocks' ) }
							value={ layout }
							onChange={ ( value ) =>
								setAttributes( {
									layout: value,
								} )
							}
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
									label: __( 'Simple', 'snow-monkey-blocks' ),
								},
								{
									value: 'text',
									label: __( 'Text', 'snow-monkey-blocks' ),
								},
								{
									value: 'text2',
									label: __( 'Text 2', 'snow-monkey-blocks' ),
								},
								{
									value: 'panel',
									label: __( 'Panels', 'snow-monkey-blocks' ),
								},
								{
									value: 'carousel',
									label: sprintf(
										// translators: %1$s: Layout
										__(
											'Carousel (%1$s)',
											'snow-monkey-blocks'
										),
										__( 'Rich media', 'snow-monkey-blocks' )
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
						label={ __( 'Title tag', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								itemTitleTagName:
									metadata.attributes.itemTitleTagName
										.default,
							} )
						}
					>
						<BaseControl
							label={ __( 'Title tag', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/child-pages/item-title-tag-name"
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
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								itemThumbnailSizeSlug:
									metadata.attributes.itemThumbnailSizeSlug
										.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Images size', 'snow-monkey-blocks' ) }
							value={ itemThumbnailSizeSlug }
							options={ itemThumbnailSizeSlugOption }
							onChange={ ( value ) =>
								setAttributes( {
									itemThumbnailSizeSlug: value,
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
							parent !== metadata.attributes.parent.default
						}
						isShownByDefault
						label={ __(
							'Specify the parent page',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								parent: metadata.attributes.parent.default,
							} )
						}
					>
						<SearchPostControl
							label={ __(
								'Specify the parent page',
								'snow-monkey-blocks'
							) }
							onRemove={ () => setAttributes( { parent: {} } ) }
							settings={ [] }
							searchInputPlaceholder={ __(
								'Search',
								'snow-monkey-blocks'
							) }
							value={ parent }
							onChange={ ( nextValue ) => {
								setAttributes( {
									parent: {
										id: nextValue.id,
										title: nextValue.title,
										url: nextValue.url,
									},
								} );
							} }
							suggestionQuery={ {
								type: 'post',
								subtype: 'page',
							} }
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
						id="snow-monkey-blocks/child-pages/gap"
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
				<Disabled>
					<ServerSideRender
						block="snow-monkey-blocks/child-pages"
						attributes={ attributes }
					/>
				</Disabled>
			</div>
		</>
	);
}
