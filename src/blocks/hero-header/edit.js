import classnames from 'classnames';

import { startsWith, get } from 'lodash';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalSpacingSizesControl as SpacingSizesControl,
	__experimentalBlockVariationPicker as BlockVariationPicker,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	store as blockEditorStore,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	FocalPointPicker,
	RangeControl,
	TextControl,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

import { justifyLeft, justifyCenter, justifyRight } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { getMediaType, isVideoType, toNumber } from '@smb/helper';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

const ALLOWED_TYPES = [ 'image', 'video' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

import metadata from './block.json';

const justifyOptions = [
	{
		value: 'start',
		icon: justifyLeft,
		label: __( 'Justify items left', 'snow-monkey-blocks' ),
	},
	{
		value: 'center',
		icon: justifyCenter,
		label: __( 'Justify items center', 'snow-monkey-blocks' ),
	},
	{
		value: 'end',
		icon: justifyRight,
		label: __( 'Justify items right', 'snow-monkey-blocks' ),
	},
];

const alignOptions = [
	{
		value: 'start',
		icon: justifyLeft,
		label: __( 'Justify items top', 'snow-monkey-blocks' ),
	},
	{
		value: 'center',
		icon: justifyCenter,
		label: __( 'Justify items center', 'snow-monkey-blocks' ),
	},
	{
		value: 'end',
		icon: justifyRight,
		label: __( 'Justify items bottom', 'snow-monkey-blocks' ),
	},
];

const VARIABLE_REFERENCE_PREFIX = 'var:';
const VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE = '|';
const VARIABLE_PATH_SEPARATOR_TOKEN_STYLE = '--';
function compileStyleValue( uncompiledValue ) {
	if ( startsWith( uncompiledValue, VARIABLE_REFERENCE_PREFIX ) ) {
		const variable = uncompiledValue
			.slice( VARIABLE_REFERENCE_PREFIX.length )
			.split( VARIABLE_PATH_SEPARATOR_TOKEN_ATTRIBUTE )
			.join( VARIABLE_PATH_SEPARATOR_TOKEN_STYLE );
		return `var(--wp--${ variable })`;
	}
	return uncompiledValue;
}

function compileGridStyleValue( uncompiledValue, max ) {
	if ( null == uncompiledValue ) {
		return undefined;
	}

	uncompiledValue = Number( uncompiledValue );

	if ( 0 === uncompiledValue ) {
		return undefined;
	}

	if ( max * -1 > uncompiledValue ) {
		return undefined;
	}

	if ( max < uncompiledValue ) {
		return undefined;
	}

	return String( uncompiledValue );
}

export default function ( {
	name,
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		mediaSizeSlug,
		mediaType,
		focalPoint,
		columns,
		rows,
		maxWidth,
		fit,
		figureGridColumnStart,
		figureGridColumnEnd,
		figureGridRowStart,
		figureGridRowEnd,
		figureAspectRatio,
		maskColor,
		maskGradientColor,
		maskOpacity,
		bodyAlignSelf,
		bodyJustifySelf,
		bodyGridColumnStart,
		bodyGridColumnEnd,
		bodyGridRowStart,
		bodyGridRowEnd,
		bodyMaxWidth,
		bodyPadding,
		style,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( blockEditorStore );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	const defaultAttributes = {};
	Object.values( metadata.attributes || [] ).forEach( ( value, index ) => {
		defaultAttributes[ Object.keys( metadata.attributes )[ index ] ] =
			value.default;
	} );

	const [ isShowPlaceholder, setIsShowPlaceholder ] = useState(
		! hasInnerBlocks && ! mediaUrl
	);

	useEffect( () => {
		setIsShowPlaceholder( ! hasInnerBlocks && ! mediaUrl );
	}, [ mediaUrl, hasInnerBlocks ] );

	const { imageSizes, image } = useSelect(
		( select ) => {
			const { getSettings } = select( blockEditorStore );
			return {
				image:
					mediaId && isSelected
						? select( 'core' ).getMedia( mediaId, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},

		[ isSelected, mediaId, clientId ]
	);

	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	if ( isShowPlaceholder ) {
		return (
			<div { ...useInnerBlocksProps( { ...useBlockProps() } ) }>
				<Placeholder
					name={ name }
					onSelect={ ( nextVariation ) => {
						setIsShowPlaceholder( false );

						if ( !! nextVariation?.attributes ) {
							setAttributes( nextVariation.attributes );
						}

						if ( !! nextVariation?.innerBlocks ) {
							replaceInnerBlocks(
								clientId,
								createBlocksFromInnerBlocksTemplate(
									nextVariation.innerBlocks
								),
								true
							);
						}
					} }
				/>
			</div>
		);
	}

	const imageSizeOptions = imageSizes
		.filter(
			( { slug } ) => image?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name: label, slug } ) => ( { value: slug, label } ) );

	const isVideo = 'video' === mediaType;
	const isImage = 'image' === mediaType || undefined === mediaType;

	const classes = classnames( 'smb-hero-header', className, {
		'smb-hero-header--fit': fit,
	} );

	const styles = {
		'--smb-hero-header--columns': String( columns ) || undefined,
		'--smb-hero-header--rows': String( rows ) || undefined,
		'--smb-hero-header--max-gap': style?.spacing?.blockGap || undefined,
		'--smb-hero-header--object-position-x': !! focalPoint?.x
			? `${ focalPoint?.x * 100 }%`
			: undefined,
		'--smb-hero-header--object-position-y': !! focalPoint?.y
			? `${ focalPoint?.y * 100 }%`
			: undefined,
		'--smb-hero-header--max-width': maxWidth || undefined,
		'--smb-hero-header--figure-grid-column-start':
			( ! fit &&
				compileGridStyleValue( figureGridColumnStart, columns + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-grid-column-end':
			( ! fit &&
				compileGridStyleValue( figureGridColumnEnd, columns + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-grid-row-start':
			( ! fit &&
				compileGridStyleValue( figureGridRowStart, rows + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-grid-row-end':
			( ! fit && compileGridStyleValue( figureGridRowEnd, rows + 1 ) ) ||
			undefined,
		'--smb-hero-header--figure-aspect-ratio':
			( ! fit && figureAspectRatio ) || undefined,
		'--smb-hero-header--mask-color': maskColor || undefined,
		'--smb-hero-header--mask-image': maskGradientColor || undefined,
		'--smb-hero-header--mask-opacity':
			!! maskColor || !! maskGradientColor ? maskOpacity : undefined,
		'--smb-hero-header--body-align-self': bodyAlignSelf || undefined,
		'--smb-hero-header--body-justify-self': bodyJustifySelf || undefined,
		'--smb-hero-header--body-grid-column-start':
			compileGridStyleValue( bodyGridColumnStart, columns + 1 ) ||
			undefined,
		'--smb-hero-header--body-grid-column-end':
			compileGridStyleValue( bodyGridColumnEnd, columns + 1 ) ||
			undefined,
		'--smb-hero-header--body-grid-row-start':
			compileGridStyleValue( bodyGridRowStart, rows + 1 ) || undefined,
		'--smb-hero-header--body-grid-row-end':
			compileGridStyleValue( bodyGridRowEnd, rows + 1 ) || undefined,
		'--smb-hero-header--body-max-width': bodyMaxWidth || undefined,
		'--smb-hero-header--body-padding-top':
			compileStyleValue( bodyPadding?.top ) || undefined,
		'--smb-hero-header--body-padding-right':
			compileStyleValue( bodyPadding?.right ) || undefined,
		'--smb-hero-header--body-padding-bottom':
			compileStyleValue( bodyPadding?.bottom ) || undefined,
		'--smb-hero-header--body-padding-left':
			compileStyleValue( bodyPadding?.left ) || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-hero-header__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					hasValue={ () =>
						maxWidth !== metadata.attributes.maxWidth.default
					}
					isShownByDefault={ !! maxWidth }
					label={ __( 'Maximum width', 'snow-monkey-blocks' ) }
					onDeselect={ () =>
						setAttributes( {
							maxWidth: metadata.attributes.maxWidth.default,
						} )
					}
					panelId={ clientId }
				>
					<UnitControl
						label={ __( 'Maximum width', 'snow-monkey-blocks' ) }
						value={ maxWidth }
						onChange={ ( value ) =>
							setAttributes( {
								maxWidth: value,
							} )
						}
					/>
				</ToolsPanelItem>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							columns !== metadata.attributes.columns.default
						}
						isShownByDefault
						label={ __(
							'Number of columns in grid',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								columns: metadata.attributes.columns.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Number of columns in grid',
								'snow-monkey-blocks'
							) }
							value={ Number( columns ) }
							onChange={ ( value ) =>
								setAttributes( {
									columns: String( value ),
								} )
							}
							min={ 1 }
							max={ 24 }
							step={ 1 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							rows !== metadata.attributes.rows.default
						}
						isShownByDefault
						label={ __(
							'Number of rows in grid',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								rows: metadata.attributes.rows.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Number of rows in grid',
								'snow-monkey-blocks'
							) }
							value={ Number( rows ) }
							onChange={ ( value ) =>
								setAttributes( {
									rows: String( value ),
								} )
							}
							min={ 1 }
							max={ 24 }
							step={ 1 }
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel
					label={ __( 'Background image', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							mediaUrl !== metadata.attributes.mediaUrl.default
						}
						isShownByDefault
						label={ __( 'Image', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								mediaId: metadata.attributes.mediaId.default,
								mediaUrl: metadata.attributes.mediaUrl.default,
								mediaAlt: metadata.attributes.mediaAlt.default,
								mediaWidth:
									metadata.attributes.mediaWidth.default,
								mediaHeight:
									metadata.attributes.mediaHeight.default,
								mediaSizeSlug:
									metadata.attributes.mediaSizeSlug.default,
								mediaType:
									metadata.attributes.mediaType.default,
							} )
						}
					>
						<div className="smb-image-size-control">
							<Figure
								src={ mediaUrl }
								id={ mediaId }
								alt={ mediaAlt }
								width={ mediaWidth }
								height={ mediaHeight }
								onSelect={ ( media ) => {
									const newMediaSizeSlug = !! media?.sizes?.[
										mediaSizeSlug
									]
										? mediaSizeSlug
										: DEFAULT_MEDIA_SIZE_SLUG;
									const newMediaUrl =
										media?.sizes?.[ newMediaSizeSlug ]?.url;
									const newMediaWidth =
										media?.sizes?.[ newMediaSizeSlug ]
											?.width;
									const newMediaHeight =
										media?.sizes?.[ newMediaSizeSlug ]
											?.height;

									setAttributes( {
										mediaType: getMediaType( media ),
										mediaId: media.id,
										mediaUrl: newMediaUrl || media.url,
										mediaAlt: media.alt,
										mediaWidth:
											newMediaWidth || media.width,
										mediaHeight:
											newMediaHeight || media.height,
										mediaSizeSlug: newMediaSizeSlug,
									} );
								} }
								onSelectURL={ ( newMediaUrl ) => {
									if ( newMediaUrl !== mediaUrl ) {
										setAttributes( {
											mediaUrl: newMediaUrl,
											mediaId: 0,
											mediaSizeSlug:
												DEFAULT_MEDIA_SIZE_SLUG,
											mediaType: getMediaType( {
												media_type: isVideoType(
													newMediaUrl
												)
													? 'video'
													: 'image',
											} ),
										} );
									}
								} }
								onRemove={ () => {
									setAttributes( {
										mediaUrl:
											metadata.attributes.mediaUrl
												.default,
										mediaAlt:
											metadata.attributes.mediaAlt
												.default,
										mediaWidth:
											metadata.attributes.mediaWidth
												.default,
										mediaHeight:
											metadata.attributes.mediaHeight
												.default,
										mediaId:
											metadata.attributes.mediaId.default,
										mediaType:
											metadata.attributes.mediaType
												.default,
									} );
								} }
								mediaType={ mediaType }
								allowedTypes={ ALLOWED_TYPES }
							/>
						</div>
					</ToolsPanelItem>

					{ 0 < imageSizeOptions.length && (
						<ResolutionTool
							defaultValue={
								metadata.attributes.mediaSizeSlug.default
							}
							value={ mediaSizeSlug }
							options={ imageSizeOptions }
							onChange={ ( value ) => {
								const newMediaUrl =
									image?.media_details?.sizes?.[ value ]
										?.source_url;
								const newMediaWidth =
									image?.media_details?.sizes?.[ value ]
										?.width;
								const newMediaHeight =
									image?.media_details?.sizes?.[ value ]
										?.height;

								setAttributes( {
									mediaUrl: newMediaUrl,
									mediaWidth: newMediaWidth,
									mediaHeight: newMediaHeight,
									mediaSizeSlug: value,
								} );
							} }
						/>
					) }

					{ !! mediaUrl && (
						<>
							<ToolsPanelItem
								hasValue={ () =>
									focalPoint !==
									metadata.attributes.focalPoint.default
								}
								isShownByDefault
								label={ __(
									'Focal point picker',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										focalPoint:
											metadata.attributes.focalPoint
												.default,
									} )
								}
							>
								<FocalPointPicker
									label={ __(
										'Focal point picker',
										'snow-monkey-blocks'
									) }
									url={ mediaUrl }
									value={ focalPoint }
									onChange={ ( value ) => {
										setAttributes( {
											focalPoint: value,
										} );
									} }
									// onDragStart={ ( value ) => setAttributes }
									onDrag={ ( value ) =>
										setAttributes( { focalPoint: value } )
									}
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									fit !== metadata.attributes.fit.default
								}
								isShownByDefault
								label={ __(
									'Fit to the contents',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										fit: metadata.attributes.fit.default,
									} )
								}
							>
								<ToggleControl
									label={ __(
										'Fit to the contents',
										'snow-monkey-blocks'
									) }
									checked={ fit }
									onChange={ ( value ) =>
										setAttributes( {
											fit: value,
										} )
									}
								/>
							</ToolsPanelItem>

							{ ! fit && (
								<>
									<ToolsPanelItem
										hasValue={ () =>
											figureAspectRatio !==
											metadata.attributes
												.figureAspectRatio.default
										}
										isShownByDefault
										label={ __(
											'Aspect ratio',
											'snow-monkey-blocks'
										) }
										onDeselect={ () =>
											setAttributes( {
												figureAspectRatio:
													metadata.attributes
														.figureAspectRatio
														.default,
											} )
										}
									>
										<TextControl
											label={ __(
												'Aspect ratio',
												'snow-monkey-blocks'
											) }
											help={ __(
												'e.g. 16 / 9',
												'snow-monkey-blocks'
											) }
											value={ figureAspectRatio }
											onChange={ ( value ) =>
												setAttributes( {
													figureAspectRatio: value,
												} )
											}
										/>
									</ToolsPanelItem>

									<ToolsPanelItem
										hasValue={ () =>
											figureGridColumnStart !==
											metadata.attributes
												.figureGridColumnStart.default
										}
										isShownByDefault
										label={ __(
											'Grid column: start',
											'snow-monkey-blocks'
										) }
										onDeselect={ () =>
											setAttributes( {
												figureGridColumnStart:
													metadata.attributes
														.figureGridColumnStart
														.default,
											} )
										}
									>
										<RangeControl
											label={ __(
												'Grid column: start',
												'snow-monkey-blocks'
											) }
											value={ Number(
												figureGridColumnStart
											) }
											onChange={ ( value ) =>
												setAttributes( {
													figureGridColumnStart:
														String( value ),
												} )
											}
											min={ 1 }
											max={ Number( columns ) + 1 }
											step={ 1 }
										/>
									</ToolsPanelItem>

									<ToolsPanelItem
										hasValue={ () =>
											figureGridColumnEnd !==
											metadata.attributes
												.figureGridColumnEnd.default
										}
										isShownByDefault
										label={ __(
											'Grid column: end',
											'snow-monkey-blocks'
										) }
										onDeselect={ () =>
											setAttributes( {
												figureGridColumnEnd:
													metadata.attributes
														.figureGridColumnEnd
														.default,
											} )
										}
									>
										<RangeControl
											label={ __(
												'Grid column: end',
												'snow-monkey-blocks'
											) }
											value={ Number(
												figureGridColumnEnd
											) }
											onChange={ ( value ) =>
												setAttributes( {
													figureGridColumnEnd:
														String( value ),
												} )
											}
											min={ Number( columns ) * -1 - 1 }
											max={ Number( columns ) + 1 }
											step={ 1 }
										/>
									</ToolsPanelItem>

									<ToolsPanelItem
										hasValue={ () =>
											figureGridRowStart !==
											metadata.attributes
												.figureGridRowStart.default
										}
										isShownByDefault
										label={ __(
											'Grid row: start',
											'snow-monkey-blocks'
										) }
										onDeselect={ () =>
											setAttributes( {
												figureGridRowStart:
													metadata.attributes
														.figureGridRowStart
														.default,
											} )
										}
									>
										<RangeControl
											label={ __(
												'Grid row: start',
												'snow-monkey-blocks'
											) }
											value={ Number(
												figureGridRowStart
											) }
											onChange={ ( value ) =>
												setAttributes( {
													figureGridRowStart:
														String( value ),
												} )
											}
											min={ 1 }
											max={ Number( rows ) + 1 }
											step={ 1 }
										/>
									</ToolsPanelItem>

									<ToolsPanelItem
										hasValue={ () =>
											figureGridRowEnd !==
											metadata.attributes.figureGridRowEnd
												.default
										}
										isShownByDefault
										label={ __(
											'Grid row: end',
											'snow-monkey-blocks'
										) }
										onDeselect={ () =>
											setAttributes( {
												figureGridRowEnd:
													metadata.attributes
														.figureGridRowEnd
														.default,
											} )
										}
									>
										<RangeControl
											label={ __(
												'Grid row: end',
												'snow-monkey-blocks'
											) }
											value={ Number( figureGridRowEnd ) }
											onChange={ ( value ) =>
												setAttributes( {
													figureGridRowEnd:
														String( value ),
												} )
											}
											min={ Number( rows ) * -1 - 1 }
											max={ Number( rows ) + 1 }
											step={ 1 }
										/>
									</ToolsPanelItem>
								</>
							) }
						</>
					) }
				</ToolsPanel>

				<ToolsPanel label={ __( 'Overlay', 'snow-monkey-blocks' ) }>
					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __( 'Color', 'snow-monkey-blocks' ),
									colorValue: maskColor,
									gradientValue: maskGradientColor,
									onColorChange: ( value ) =>
										setAttributes( {
											maskColor: value,
										} ),
									onGradientChange: ( value ) =>
										setAttributes( {
											maskGradientColor: value,
										} ),
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...multipleOriginColorsAndGradients }
						/>
					</div>

					{ ( !! maskColor || !! maskGradientColor ) && (
						<ToolsPanelItem
							hasValue={ () =>
								maskOpacity !==
								metadata.attributes.maskOpacity.default
							}
							isShownByDefault
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setAttributes( {
									maskOpacity:
										metadata.attributes.maskOpacity.default,
								} )
							}
						>
							<RangeControl
								label={ __( 'Opacity', 'snow-monkey-blocks' ) }
								value={ Number(
									( 1 - maskOpacity ).toFixed( 1 )
								) }
								onChange={ ( value ) =>
									setAttributes( {
										maskOpacity: toNumber(
											( 1 - value ).toFixed( 1 ),
											0,
											1
										),
									} )
								}
								min={ 0 }
								max={ 1 }
								step={ 0.1 }
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>

				<ToolsPanel label={ __( 'Contents', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							bodyMaxWidth !==
							metadata.attributes.bodyMaxWidth.default
						}
						isShownByDefault
						label={ __( 'Maximum width', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								bodyMaxWidth:
									metadata.attributes.bodyMaxWidth.default,
							} )
						}
					>
						<UnitControl
							label={ __(
								'Maximum width',
								'snow-monkey-blocks'
							) }
							value={ bodyMaxWidth }
							onChange={ ( value ) =>
								setAttributes( {
									bodyMaxWidth: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						className="tools-panel-item-spacing"
						hasValue={ () =>
							JSON.stringify( bodyPadding ) !==
							JSON.stringify(
								metadata.attributes.bodyPadding.default
							)
						}
						isShownByDefault
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								bodyPadding: {
									...metadata.attributes.bodyPadding.default,
								},
							} )
						}
					>
						<SpacingSizesControl
							label={ __( 'Padding', 'snow-monkey-blocks' ) }
							allowReset={ false }
							values={ bodyPadding }
							onChange={ ( value ) =>
								setAttributes( {
									bodyPadding: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							bodyJustifySelf !==
							metadata.attributes.bodyJustifySelf.default
						}
						isShownByDefault
						label={ __(
							'Alignment on inline axis',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								bodyJustifySelf:
									metadata.attributes.bodyJustifySelf.default,
							} )
						}
					>
						<BaseControl
							label={ __(
								'Alignment on inline axis',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/hero-header-backgroun-image-justify-self"
						>
							<div>
								{ justifyOptions.map(
									( { value, icon, iconLabel } ) => {
										return (
											<Button
												key={ value }
												label={ iconLabel }
												icon={ icon }
												isPressed={
													value === bodyJustifySelf
												}
												onClick={ () => {
													setAttributes( {
														bodyJustifySelf:
															value !==
															bodyJustifySelf
																? value
																: undefined,
													} );
												} }
											/>
										);
									}
								) }
							</div>
						</BaseControl>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							bodyAlignSelf !==
							metadata.attributes.bodyAlignSelf.default
						}
						isShownByDefault
						label={ __(
							'Alignment on cross axis',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								bodyAlignSelf:
									metadata.attributes.bodyAlignSelf.default,
							} )
						}
					>
						<BaseControl
							label={ __(
								'Alignment on cross axis',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/hero-header-backgroun-image-align-self"
						>
							<div>
								{ alignOptions.map(
									( { value, icon, iconLabel } ) => {
										return (
											<Button
												style={ {
													transform: 'rotate(90deg)',
												} }
												key={ value }
												label={ iconLabel }
												icon={ icon }
												isPressed={
													value === bodyAlignSelf
												}
												onClick={ () => {
													setAttributes( {
														bodyAlignSelf:
															value !==
															bodyAlignSelf
																? value
																: undefined,
													} );
												} }
											/>
										);
									}
								) }
							</div>
						</BaseControl>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							bodyGridColumnStart !==
							metadata.attributes.bodyGridColumnStart.default
						}
						isShownByDefault
						label={ __(
							'Grid column: start',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								bodyGridColumnStart:
									metadata.attributes.bodyGridColumnStart
										.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Grid column: start',
								'snow-monkey-blocks'
							) }
							value={ Number( bodyGridColumnStart ) }
							onChange={ ( value ) =>
								setAttributes( {
									bodyGridColumnStart: String( value ),
								} )
							}
							min={ 1 }
							max={ Number( columns ) + 1 }
							step={ 1 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							bodyGridColumnEnd !==
							metadata.attributes.bodyGridColumnEnd.default
						}
						isShownByDefault
						label={ __( 'Grid column: end', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								bodyGridColumnEnd:
									metadata.attributes.bodyGridColumnEnd
										.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Grid column: end',
								'snow-monkey-blocks'
							) }
							value={ Number( bodyGridColumnEnd ) }
							onChange={ ( value ) =>
								setAttributes( {
									bodyGridColumnEnd: String( value ),
								} )
							}
							min={ Number( columns ) * -1 - 1 }
							max={ Number( columns ) + 1 }
							step={ 1 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							bodyGridRowStart !==
							metadata.attributes.bodyGridRowStart.default
						}
						isShownByDefault
						label={ __( 'Grid row: start', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								bodyGridRowStart:
									metadata.attributes.bodyGridRowStart
										.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Grid row: start',
								'snow-monkey-blocks'
							) }
							value={ Number( bodyGridRowStart ) }
							onChange={ ( value ) =>
								setAttributes( {
									bodyGridRowStart: String( value ),
								} )
							}
							min={ 1 }
							max={ Number( rows ) + 1 }
							step={ 1 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							bodyGridRowEnd !==
							metadata.attributes.bodyGridRowEnd.default
						}
						isShownByDefault
						label={ __( 'Grid row: end', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								bodyGridRowEnd:
									metadata.attributes.bodyGridRowEnd.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Grid row: end',
								'snow-monkey-blocks'
							) }
							value={ Number( bodyGridRowEnd ) }
							onChange={ ( value ) =>
								setAttributes( {
									bodyGridRowEnd: String( value ),
								} )
							}
							min={ Number( rows ) * -1 - 1 }
							max={ Number( rows ) + 1 }
							step={ 1 }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				{ !! mediaUrl && (
					<div className="smb-hero-header__figure">
						{ 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) ) && (
							<div className="smb-hero-header__mask" />
						) }

						{ isImage && (
							<img
								src={ mediaUrl }
								alt={ mediaAlt }
								width={ mediaWidth }
								height={ mediaHeight }
								className={ `wp-image-${ mediaId }` }
							/>
						) }

						{ isVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ mediaUrl }
								width={ mediaWidth }
								height={ mediaHeight }
							/>
						) }
					</div>
				) }

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}

function Placeholder( { name, onSelect } ) {
	const { blockType, variations } = useSelect(
		( select ) => {
			const { getBlockVariations, getBlockType } = select( blocksStore );

			return {
				blockType: getBlockType( name ),
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ name ]
	);

	return (
		<BlockVariationPicker
			icon={ get( blockType, [ 'icon', 'src' ] ) }
			label={ get( blockType, [ 'title' ] ) }
			variations={ variations }
			onSelect={ onSelect }
			allowSkip={ false }
		/>
	);
}
