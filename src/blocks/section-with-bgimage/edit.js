import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	useInnerBlocksProps,
	useBlockProps,
	useSettings,
	useSetting, // @deprecated
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	FocalPointPicker,
	RangeControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

import { toNumber, getMediaType, isVideoType } from '@smb/helper';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionBackgroundTextSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

const ALLOWED_TYPES = [ 'image', 'video' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';
const HORIZONTAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		align,

		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageWidth,
		lgImageHeight,
		lgImageMediaType,
		lgImageRepeat,
		lgFocalPoint,
		lgImageSizeSlug,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageWidth,
		mdImageHeight,
		mdImageMediaType,
		mdImageRepeat,
		mdFocalPoint,
		mdImageSizeSlug,
		smImageID,
		smImageURL,
		smImageAlt,
		smImageWidth,
		smImageHeight,
		smImageMediaType,
		smImageRepeat,
		smFocalPoint,
		smImageSizeSlug,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		parallax,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
		disableCustomHeight,
		containerAlign,
		disableContainerPadding,
		contentsMaxWidth,
		isSlim,

		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		topDividerOverlay,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
		bottomDividerOverlay,
		backgroundText,

		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const { imageSizes, lgImage, mdImage, smImage } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				lgImage:
					lgImageID && isSelected
						? select( 'core' ).getMedia( lgImageID, {
								context: 'view',
						  } )
						: null,
				mdImage:
					mdImageID && isSelected
						? select( 'core' ).getMedia( mdImageID, {
								context: 'view',
						  } )
						: null,
				smImage:
					smImageID && isSelected
						? select( 'core' ).getMedia( smImageID, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},
		[ isSelected, lgImageID, mdImageID, smImageID, clientId ]
	);

	const lgImageSizeOptions = imageSizes
		.filter(
			( { slug } ) => lgImage?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const mdImageSizeOptions = imageSizes
		.filter(
			( { slug } ) => mdImage?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const smImageSizeOptions = imageSizes
		.filter(
			( { slug } ) => smImage?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const TagName = wrapperTagName;

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
			[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
			[ `smb-section--bottom-divider-no-overlay` ]:
				! bottomDividerOverlay,
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]:
			!! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull:
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
		alignwide:
			'wide' === containerAlign ||
			( 'contents-wide' === containerAlign && 'full' === align ),
		'c-container--no-padding': disableContainerPadding,
	} );

	let headerContainerClasses = containerClasses
		.replace( 'c-container--no-padding', '' )
		.trim();
	if (
		'contents-wide' === containerAlign ||
		'contents-full' === containerAlign
	) {
		headerContainerClasses = headerContainerClasses
			.replace( 'alignfull', '' )
			.replace( 'alignwide', '' )
			.trim();
	}

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]:
				!! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const hasMask = 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) );

	const isLgVideo = 'video' === lgImageMediaType;
	const isLgImage =
		'image' === lgImageMediaType || undefined === lgImageMediaType;
	const hasLgBackground = !! lgImageURL;
	const showLgFocalPointPicker =
		isLgVideo || ( isLgImage && hasLgBackground && ! parallax );
	const lgPointValue =
		lgFocalPoint && ! parallax
			? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
			: undefined;

	const isMdVideo = 'video' === mdImageMediaType;
	const isMdImage =
		'image' === mdImageMediaType || undefined === mdImageMediaType;
	const hasMdBackground = !! mdImageURL;
	const showMdFocalPointPicker =
		isMdVideo || ( isMdImage && hasMdBackground && ! parallax );
	const mdPointValue =
		mdFocalPoint && ! parallax
			? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
			: undefined;

	const isSmVideo = 'video' === smImageMediaType;
	const isSmImage =
		'image' === smImageMediaType || undefined === smImageMediaType;
	const hasSmBackground = !! smImageURL;
	const showSmFocalPointPicker =
		isSmVideo || ( isSmImage && hasSmBackground && ! parallax );
	const smPointValue =
		smFocalPoint && ! parallax
			? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
			: undefined;

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section--contents-wrapper-width':
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
		'--smb-section--min-height':
			!! height && ! disableCustomHeight ? height : undefined,
		'--smb-section-with-bgimage--mask-color': maskColor || undefined,
		'--smb-section-with-bgimage--mask-image':
			maskGradientColor || undefined,
		'--smb-section-with-bgimage--mask-opacity': String( maskOpacity ),
		'--smb-section-with-bgimage--lg-media-position': lgPointValue,
		'--smb-section-with-bgimage--lg-repeatable-image':
			lgImageRepeat && !! lgImageURL ? `url(${ lgImageURL })` : undefined,
		'--smb-section-with-bgimage--md-media-position': mdPointValue,
		'--smb-section-with-bgimage--md-repeatable-image':
			mdImageRepeat && !! mdImageURL ? `url(${ mdImageURL })` : undefined,
		'--smb-section-with-bgimage--sm-media-position': smPointValue,
		'--smb-section-with-bgimage--sm-repeatable-image':
			smImageRepeat && !! smImageURL ? `url(${ smImageURL })` : undefined,
		...generateStylesForSectionBackground( {
			topDividerVerticalPosition,
			topDividerLevel,
			bottomDividerVerticalPosition,
			bottomDividerLevel,
			backgroundText,
		} ),
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'smb-section__body' ],
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const [ fontSizes ] =
		null != useSettings
			? useSettings( 'typography.fontSizes' )
			: [ useSetting( 'typography.fontSizes' ) ].filter( Boolean );
	const newBackgroundText = { ...backgroundText };

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls>
				<PanelBasicSettings
					disableIsSlim={ !! contentsMaxWidth }
					disableContentsMaxWidth={ isSlim }
					disableContainerAlign={ 'full' !== align }
					disableCustomHeight={ disableCustomHeight }
					settings={ [
						{
							wrapperTagNameValue: wrapperTagName,
							onWrapperTagNameChange: ( value ) =>
								setAttributes( {
									wrapperTagName: value,
								} ),
							defaultValue:
								metadata.attributes.wrapperTagName.default,
						},
						{
							titleTagNameValue: titleTagName,
							onTitleTagNameChange: ( value ) =>
								setAttributes( {
									titleTagName: value,
								} ),
							defaultValue:
								metadata.attributes.titleTagName.default,
						},
						{
							heightValue: height,
							onHeightChange: ( value, newDisableCustomHeight ) =>
								setAttributes( {
									height: value,
									disableCustomHeight: newDisableCustomHeight,
								} ),
							defaultValue: metadata.attributes.height.default,
							defaultDisableCustomHeightValue:
								metadata.attributes.disableCustomHeight.default,
						},
						{
							contentsContainerControl: true,
							containerAlignValue: containerAlign,
							onContainerAlignChange: ( value ) =>
								setAttributes( {
									containerAlign: value,
								} ),
							defaultValue:
								metadata.attributes.containerAlign.default,
						},
						{
							disableContainerPaddingValue:
								disableContainerPadding,
							onDisableContainerPaddingChange: ( value ) =>
								setAttributes( {
									disableContainerPadding: value,
								} ),
							defaultValue:
								metadata.attributes.disableContainerPadding
									.default,
						},
						{
							contentsMaxWidthValue: contentsMaxWidth,
							onContentsMaxWidthChange: ( value ) =>
								setAttributes( {
									contentsMaxWidth: value,
								} ),
							defaultValue:
								metadata.attributes.contentsMaxWidth.default,
						},
						{
							isSlimValue: isSlim,
							onIsSlimChange: ( value ) =>
								setAttributes( {
									isSlim: value,
								} ),
							defaultValue: metadata.attributes.isSlim.default,
						},
					] }
				/>

				<ToolsPanel
					label={ __( 'Media settings', 'snow-monkey-blocks' ) }
				>
					{ ( hasLgBackground ||
						hasMdBackground ||
						hasSmBackground ) && (
						<ToolsPanelItem
							hasValue={ () =>
								parallax !==
								metadata.attributes.parallax.default
							}
							isShownByDefault
							label={ __(
								'Parallax (Deprecated)',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									parallax:
										metadata.attributes.parallax.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Parallax (Deprecated)',
									'snow-monkey-blocks'
								) }
								checked={ parallax }
								onChange={ ( value ) =>
									setAttributes( {
										parallax: value,
									} )
								}
								help={ __(
									'This setting is being retained for backwards compatibility and is not recommended for use. Its use may slow down the page display.',
									'snow-monkey-blocks'
								) }
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							lgImageRepeat !==
								metadata.attributes.lgImageRepeat.default ||
							lgImageSizeSlug !==
								metadata.attributes.lgImageSizeSlug.default ||
							lgFocalPoint !==
								metadata.attributes.lgFocalPoint.default ||
							mdImageRepeat !==
								metadata.attributes.mdImageRepeat.default ||
							mdImageSizeSlug !==
								metadata.attributes.mdImageSizeSlug.default ||
							mdFocalPoint !==
								metadata.attributes.mdFocalPoint.default ||
							smImageRepeat !==
								metadata.attributes.smImageRepeat.default ||
							smImageSizeSlug !==
								metadata.attributes.smImageSizeSlug.default ||
							smFocalPoint !==
								metadata.attributes.smFocalPoint.default
						}
						isShownByDefault
						label={ __( 'Image settings', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								lgImageRepeat:
									metadata.attributes.lgImageRepeat.default,
								lgImageSizeSlug:
									metadata.attributes.lgImageSizeSlug.default,
								lgFocalPoint:
									metadata.attributes.lgFocalPoint.default,
								mdImageRepeat:
									metadata.attributes.mdImageRepeat.default,
								mdImageSizeSlug:
									metadata.attributes.mdImageSizeSlug.default,
								mdFocalPoint:
									metadata.attributes.mdFocalPoint.default,
								smImageRepeat:
									metadata.attributes.smImageRepeat.default,
								smImageSizeSlug:
									metadata.attributes.smImageSizeSlug.default,
								smFocalPoint:
									metadata.attributes.smFocalPoint.default,
							} )
						}
					>
						<ResponsiveTabPanel
							desktop={ () => (
								<>
									<div className="smb-image-size-control">
										<Figure
											src={ lgImageURL }
											id={ lgImageID }
											alt={ lgImageAlt }
											width={ lgImageWidth }
											height={ lgImageHeight }
											onSelect={ ( media ) => {
												const newLgImageSizeSlug =
													!! media?.sizes?.[
														lgImageSizeSlug
													]
														? lgImageSizeSlug
														: DEFAULT_MEDIA_SIZE_SLUG;
												const newLgImageURL =
													media?.sizes?.[
														newLgImageSizeSlug
													]?.url;
												const newLgImageWidth =
													media?.sizes?.[
														newLgImageSizeSlug
													]?.width;
												const newLgImageHeight =
													media?.sizes?.[
														newLgImageSizeSlug
													]?.height;

												setAttributes( {
													lgImageURL:
														newLgImageURL ||
														media.url,
													lgImageID: media.id,
													lgImageAlt: media.alt,
													lgImageWidth:
														newLgImageWidth ||
														media.width,
													lgImageHeight:
														newLgImageHeight ||
														media.height,
													lgImageMediaType:
														getMediaType( media ),
													lgImageSizeSlug:
														newLgImageSizeSlug,
												} );
											} }
											onSelectURL={ ( newLgImageURL ) => {
												if (
													newLgImageURL !== lgImageURL
												) {
													setAttributes( {
														lgImageURL:
															newLgImageURL,
														lgImageID: 0,
														lgImageSizeSlug:
															DEFAULT_MEDIA_SIZE_SLUG,
														lgImageMediaType:
															getMediaType( {
																media_type:
																	isVideoType(
																		newLgImageURL
																	)
																		? 'video'
																		: 'image',
															} ),
													} );
												}
											} }
											onRemove={ () =>
												setAttributes( {
													lgImageURL:
														metadata.attributes
															.lgImageURL.default,
													lgImageAlt:
														metadata.attributes
															.lgImageAlt.default,
													lgImageWidth:
														metadata.attributes
															.lgImageWidth
															.default,
													lgImageHeight:
														metadata.attributes
															.lgImageHeight
															.default,
													lgImageID:
														metadata.attributes
															.lgImageID.default,
													lgImageMediaType:
														metadata.attributes
															.lgImageMediaType
															.default,
												} )
											}
											mediaType={ lgImageMediaType }
											allowedTypes={ ALLOWED_TYPES }
										/>
									</div>

									{ hasLgBackground && isLgImage && (
										<>
											<ToggleControl
												label={ __(
													'Repeat images',
													'snow-monkey-blocks'
												) }
												checked={ lgImageRepeat }
												onChange={ ( value ) =>
													setAttributes( {
														lgImageRepeat: value,
													} )
												}
											/>

											<ResolutionTool
												defaultValue={
													metadata.attributes
														.lgImageSizeSlug.default
												}
												value={ lgImageSizeSlug }
												options={ lgImageSizeOptions }
												onChange={ ( value ) => {
													const newLgImageURL =
														lgImage?.media_details
															?.sizes?.[ value ]
															?.source_url;
													const newLgImageWidth =
														lgImage?.media_details
															?.sizes?.[ value ]
															?.width;
													const newLgImageHeight =
														lgImage?.media_details
															?.sizes?.[ value ]
															?.height;

													setAttributes( {
														lgImageURL:
															newLgImageURL,
														lgImageWidth:
															newLgImageWidth,
														lgImageHeight:
															newLgImageHeight,
														lgImageSizeSlug: value,
													} );
												} }
												withToolsPanelItem={ false }
											/>
										</>
									) }

									{ showLgFocalPointPicker && (
										<FocalPointPicker
											label={ __(
												'Focal point picker',
												'snow-monkey-blocks'
											) }
											url={ lgImageURL }
											value={ lgFocalPoint }
											onChange={ ( value ) => {
												setAttributes( {
													lgFocalPoint: value,
												} );
											} }
										/>
									) }
								</>
							) }
							tablet={ () => (
								<>
									<div className="smb-image-size-control">
										<Figure
											src={ mdImageURL }
											id={ mdImageID }
											alt={ mdImageAlt }
											width={ mdImageWidth }
											height={ mdImageHeight }
											onSelect={ ( media ) => {
												const newMdImageSizeSlug =
													!! media?.sizes?.[
														mdImageSizeSlug
													]
														? mdImageSizeSlug
														: DEFAULT_MEDIA_SIZE_SLUG;
												const newMdImageURL =
													media?.sizes?.[
														newMdImageSizeSlug
													]?.url;
												const newMdImageWidth =
													media?.sizes?.[
														newMdImageSizeSlug
													]?.width;
												const newMdImageHeight =
													media?.sizes?.[
														newMdImageSizeSlug
													]?.height;

												setAttributes( {
													mdImageURL:
														newMdImageURL ||
														media.url,
													mdImageID: media.id,
													mdImageAlt: media.alt,
													mdImageWidth:
														newMdImageWidth ||
														media.width,
													mdImageHeight:
														newMdImageHeight ||
														media.height,
													mdImageMediaType:
														getMediaType( media ),
													mdImageSizeSlug:
														newMdImageSizeSlug,
												} );
											} }
											onSelectURL={ ( newMdImageURL ) => {
												if (
													newMdImageURL !== mdImageURL
												) {
													setAttributes( {
														mdImageURL:
															newMdImageURL,
														mdImageID: 0,
														mdImageSizeSlug:
															DEFAULT_MEDIA_SIZE_SLUG,
														mdImageMediaType:
															getMediaType( {
																media_type:
																	isVideoType(
																		newMdImageURL
																	)
																		? 'video'
																		: 'image',
															} ),
													} );
												}
											} }
											onRemove={ () =>
												setAttributes( {
													mdImageURL:
														metadata.attributes
															.mdImageURL.default,
													mdImageAlt:
														metadata.attributes
															.mdImageAlt.default,
													mdImageWidth:
														metadata.attributes
															.mdImageWidth
															.default,
													mdImageHeight:
														metadata.attributes
															.mdImageHeight
															.default,
													mdImageID:
														metadata.attributes
															.mdImageID.default,
													mdImageMediaType:
														metadata.attributes
															.mdImageMediaType
															.default,
												} )
											}
											mediaType={ mdImageMediaType }
											allowedTypes={ ALLOWED_TYPES }
										/>
									</div>

									{ hasMdBackground && isMdImage && (
										<>
											<ToggleControl
												label={ __(
													'Repeat images',
													'snow-monkey-blocks'
												) }
												checked={ mdImageRepeat }
												onChange={ ( value ) =>
													setAttributes( {
														mdImageRepeat: value,
													} )
												}
											/>

											<ResolutionTool
												defaultValue={
													metadata.attributes
														.mdImageSizeSlug.default
												}
												value={ mdImageSizeSlug }
												options={ mdImageSizeOptions }
												onChange={ ( value ) => {
													const newMdImageURL =
														mdImage?.media_details
															?.sizes?.[ value ]
															?.source_url;
													const newMdImageWidth =
														mdImage?.media_details
															?.sizes?.[ value ]
															?.width;
													const newMdImageHeight =
														mdImage?.media_details
															?.sizes?.[ value ]
															?.height;

													setAttributes( {
														mdImageURL:
															newMdImageURL,
														mdImageWidth:
															newMdImageWidth,
														mdImageHeight:
															newMdImageHeight,
														mdImageSizeSlug: value,
													} );
												} }
												withToolsPanelItem={ false }
											/>
										</>
									) }

									{ showMdFocalPointPicker && (
										<FocalPointPicker
											label={ __(
												'Focal point picker',
												'snow-monkey-blocks'
											) }
											url={ mdImageURL }
											value={ mdFocalPoint }
											onChange={ ( value ) => {
												setAttributes( {
													lgFocalPoint: value,
												} );
											} }
										/>
									) }
								</>
							) }
							mobile={ () => (
								<>
									<div className="smb-image-size-control">
										<Figure
											src={ smImageURL }
											id={ smImageID }
											alt={ smImageAlt }
											width={ smImageWidth }
											height={ smImageHeight }
											onSelect={ ( media ) => {
												const newSmImageSizeSlug =
													!! media?.sizes?.[
														smImageSizeSlug
													]
														? smImageSizeSlug
														: DEFAULT_MEDIA_SIZE_SLUG;
												const newSmImageURL =
													media?.sizes?.[
														newSmImageSizeSlug
													]?.url;
												const newSmImageWidth =
													media?.sizes?.[
														newSmImageSizeSlug
													]?.width;
												const newSmImageHeight =
													media?.sizes?.[
														newSmImageSizeSlug
													]?.height;

												setAttributes( {
													smImageURL:
														newSmImageURL ||
														media.url,
													smImageID: media.id,
													smImageAlt: media.alt,
													smImageWidth:
														newSmImageWidth ||
														media.width,
													smImageHeight:
														newSmImageHeight ||
														media.height,
													smImageMediaType:
														getMediaType( media ),
													smImageSizeSlug:
														newSmImageSizeSlug,
												} );
											} }
											onSelectURL={ ( newSmImageURL ) => {
												if (
													newSmImageURL !== smImageURL
												) {
													setAttributes( {
														smImageURL:
															newSmImageURL,
														smImageID: 0,
														smImageSizeSlug:
															DEFAULT_MEDIA_SIZE_SLUG,
														smImageMediaType:
															getMediaType( {
																media_type:
																	isVideoType(
																		newSmImageURL
																	)
																		? 'video'
																		: 'image',
															} ),
													} );
												}
											} }
											onRemove={ () =>
												setAttributes( {
													smImageURL:
														metadata.attributes
															.smImageURL.default,
													smImageAlt:
														metadata.attributes
															.smImageAlt.default,
													smImageWidth:
														metadata.attributes
															.smImageWidth
															.default,
													smImageHeight:
														metadata.attributes
															.smImageHeight
															.default,
													smImageID:
														metadata.attributes
															.smImageID.default,
													smImageMediaType:
														metadata.attributes
															.smImageMediaType
															.default,
												} )
											}
											mediaType={ smImageMediaType }
											allowedTypes={ ALLOWED_TYPES }
										/>
									</div>

									{ hasSmBackground && isSmImage && (
										<>
											<ToggleControl
												label={ __(
													'Repeat images',
													'snow-monkey-blocks'
												) }
												checked={ smImageRepeat }
												onChange={ ( value ) =>
													setAttributes( {
														smImageRepeat: value,
													} )
												}
											/>

											<ResolutionTool
												defaultValue={
													metadata.attributes
														.smImageSizeSlug.default
												}
												value={ smImageSizeSlug }
												options={ smImageSizeOptions }
												onChange={ ( value ) => {
													const newSmImageURL =
														smImage?.media_details
															?.sizes?.[ value ]
															?.source_url;
													const newSmImageWidth =
														smImage?.media_details
															?.sizes?.[ value ]
															?.width;
													const newSmImageHeight =
														smImage?.media_details
															?.sizes?.[ value ]
															?.height;

													setAttributes( {
														smImageURL:
															newSmImageURL,
														smImageWidth:
															newSmImageWidth,
														smImageHeight:
															newSmImageHeight,
														smImageSizeSlug: value,
													} );
												} }
												withToolsPanelItem={ false }
											/>
										</>
									) }

									{ showSmFocalPointPicker && (
										<FocalPointPicker
											label={ __(
												'Focal point picker',
												'snow-monkey-blocks'
											) }
											url={ smImageURL }
											value={ smFocalPoint }
											onChange={ ( value ) => {
												setAttributes( {
													lgFocalPoint: value,
												} );
											} }
										/>
									) }
								</>
							) }
						/>
					</ToolsPanelItem>
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
							{ ...useMultipleOriginColorsAndGradients() }
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

				<PanelSectionBackgroundTextSettings
					settings={ [
						{
							textValue: backgroundText.text,
							onTextChange: ( value ) => {
								newBackgroundText.text = value;

								setAttributes( {
									backgroundText: {
										...newBackgroundText,
									},
								} );
							},
							defaultValue:
								metadata.attributes.backgroundText.default.text,
						},
						{
							fontSizeValue: backgroundText.fontSize,
							onFontSizeChange: ( value ) => {
								const filteredFontSizes = fontSizes.filter(
									( _fontSize ) => {
										return (
											!! _fontSize?.size &&
											value === _fontSize?.size
										);
									}
								);

								newBackgroundText.fontSize = value;
								newBackgroundText.fontSizeSlug =
									0 < filteredFontSizes.length &&
									!! filteredFontSizes[ 0 ]?.slug
										? filteredFontSizes[ 0 ].slug
										: '';

								setAttributes( {
									backgroundText: {
										...newBackgroundText,
									},
								} );
							},
							defaultValue:
								metadata.attributes.backgroundText.default
									.fontSize,
						},
						{
							lineHeightValue: backgroundText.lineHeight,
							onLineHeightChange: ( value ) => {
								newBackgroundText.lineHeight = value;

								setAttributes( {
									backgroundText: {
										...newBackgroundText,
									},
								} );
							},
							defaultValue:
								metadata.attributes.backgroundText.default
									.lineHeight,
						},
						{
							colorValue: backgroundText.color,
							onColorChange: ( value ) => {
								newBackgroundText.color = value;

								setAttributes( {
									backgroundText: {
										...newBackgroundText,
									},
								} );
							},
							defaultValue:
								metadata.attributes.backgroundText.default
									.color,
						},
						{
							opacityValue: backgroundText.opacity,
							onOpacityChange: ( value ) => {
								newBackgroundText.opacity = value;

								setAttributes( {
									backgroundText: {
										...newBackgroundText,
									},
								} );
							},
							defaultValue:
								metadata.attributes.backgroundText.default
									.opacity,
						},
						{
							positionValue: backgroundText.position,
							onPositionChange: ( value ) => {
								newBackgroundText.position = value;

								setAttributes( {
									backgroundText: {
										...newBackgroundText,
									},
								} );
							},
							defaultValue:
								metadata.attributes.backgroundText.default
									.position,
						},
					] }
				/>

				<PanelSectionTopDividerSettings
					settings={ [
						{
							typeValue: topDividerType,
							onTypeChange: ( value ) =>
								setAttributes( {
									topDividerType: value,
								} ),
							defaultValue:
								metadata.attributes.topDividerType.default,
						},
						{
							levelValue: topDividerLevel,
							onLevelChange: ( value ) =>
								setAttributes( {
									topDividerLevel: toNumber(
										value,
										-100,
										100
									),
								} ),
							defaultValue:
								metadata.attributes.topDividerLevel.default,
						},
						{
							colorValue: topDividerColor,
							onColorChange: ( value ) =>
								setAttributes( {
									topDividerColor: value,
								} ),
							defaultColorValue:
								metadata.attributes.topDividerColor.default,
						},
						{
							verticalPositionValue: topDividerVerticalPosition,
							onVerticalPositionChange: ( value ) =>
								setAttributes( {
									topDividerVerticalPosition: value,
								} ),
							defaultValue:
								metadata.attributes.topDividerVerticalPosition
									.default,
						},
						{
							overlayValue: topDividerOverlay,
							onOverlayChange: ( value ) =>
								setAttributes( {
									topDividerOverlay: value,
								} ),
							defaultValue:
								metadata.attributes.topDividerOverlay.default,
						},
					] }
				/>

				<PanelSectionBottomDividerSettings
					settings={ [
						{
							typeValue: bottomDividerType,
							onTypeChange: ( value ) =>
								setAttributes( {
									bottomDividerType: value,
								} ),
							defaultValue:
								metadata.attributes.bottomDividerType.default,
						},
						{
							levelValue: bottomDividerLevel,
							onLevelChange: ( value ) =>
								setAttributes( {
									bottomDividerLevel: toNumber(
										value,
										-100,
										100
									),
								} ),
							defaultValue:
								metadata.attributes.bottomDividerLevel.default,
						},
						{
							colorValue: bottomDividerColor,
							onColorChange: ( value ) =>
								setAttributes( {
									bottomDividerColor: value,
								} ),
							defaultColorValue:
								metadata.attributes.bottomDividerColor.default,
						},
						{
							verticalPositionValue:
								bottomDividerVerticalPosition,
							onVerticalPositionChange: ( value ) =>
								setAttributes( {
									bottomDividerVerticalPosition: value,
								} ),
							defaultValue:
								metadata.attributes
									.bottomDividerVerticalPosition.default,
						},
						{
							overlayValue: bottomDividerOverlay,
							onOverlayChange: ( value ) =>
								setAttributes( {
									bottomDividerOverlay: value,
								} ),
							defaultValue:
								metadata.attributes.bottomDividerOverlay
									.default,
						},
					] }
				/>
			</InspectorControls>

			<BlockControls group="block">
				{ isItemsAlignmentable && (
					<BlockVerticalAlignmentToolbar
						onChange={ ( value ) =>
							setAttributes( {
								itemsAlignment: value,
							} )
						}
						value={ itemsAlignment }
					/>
				) }

				<JustifyToolbar
					allowedControls={ HORIZONTAL_JUSTIFY_CONTROLS }
					onChange={ ( value ) =>
						setAttributes( {
							contentJustification: value,
						} )
					}
					value={ contentJustification }
				/>

				<AlignmentToolbar
					value={ contentsAlignment }
					onChange={ ( value ) =>
						setAttributes( {
							contentsAlignment: value,
						} )
					}
				/>
			</BlockControls>

			<TagName { ...blockProps }>
				{ hasLgBackground && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--lg'
						) }
					>
						{ hasMask && (
							<div className="smb-section-with-bgimage__mask" />
						) }

						{ isLgImage &&
							( lgImageRepeat ? (
								<div className="smb-section-with-bgimage__repeatable-image">
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										width={ lgImageWidth }
										height={ lgImageHeight }
										className={ `wp-image-${ lgImageID }` }
									/>
								</div>
							) : (
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									width={ lgImageWidth }
									height={ lgImageHeight }
									className={ `wp-image-${ lgImageID }` }
								/>
							) ) }

						{ isLgVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ lgImageURL }
								width={ lgImageWidth }
								height={ lgImageHeight }
							/>
						) }
					</div>
				) }

				{ hasMdBackground && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--md'
						) }
					>
						{ hasMask && (
							<div className="smb-section-with-bgimage__mask" />
						) }

						{ isMdImage &&
							( mdImageRepeat ? (
								<div className="smb-section-with-bgimage__repeatable-image">
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										width={ mdImageWidth }
										height={ mdImageHeight }
										className={ `wp-image-${ mdImageID }` }
									/>
								</div>
							) : (
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									width={ mdImageWidth }
									height={ mdImageHeight }
									className={ `wp-image-${ mdImageID }` }
								/>
							) ) }

						{ isMdVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ mdImageURL }
								width={ mdImageWidth }
								height={ mdImageHeight }
							/>
						) }
					</div>
				) }

				{ hasSmBackground && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--sm'
						) }
					>
						{ hasMask && (
							<div className="smb-section-with-bgimage__mask" />
						) }

						{ isSmImage &&
							( smImageRepeat ? (
								<div className="smb-section-with-bgimage__repeatable-image">
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										width={ smImageWidth }
										height={ smImageHeight }
										className={ `wp-image-${ smImageID }` }
									/>
								</div>
							) : (
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									width={ smImageWidth }
									height={ smImageHeight }
									className={ `wp-image-${ smImageID }` }
								/>
							) ) }

						{ isSmVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ smImageURL }
								width={ smImageWidth }
								height={ smImageHeight }
							/>
						) }
					</div>
				) }

				<SectionBackground
					{ ...{
						topDividerType,
						topDividerLevel,
						topDividerColor,
						bottomDividerType,
						bottomDividerLevel,
						bottomDividerColor,
						backgroundText,
						containerClasses,
					} }
				/>

				<div className={ innerClasses }>
					<div className={ containerClasses }>
						<div className={ contentsWrapperClasses }>
							<Header
								isSelected={ isSelected }
								hasContainer={
									( disableContainerPadding &&
										'full' === containerAlign &&
										'full' === align ) ||
									'contents-wide' === containerAlign ||
									'contents-full' === containerAlign
								}
								containerClassName={ headerContainerClasses }
								settings={ [
									{
										subtitleValue: subtitle,
										onSubtitleChange: ( value ) =>
											setAttributes( {
												subtitle: value,
											} ),
									},
									{
										titleTagNameValue: titleTagName,
										titleValue: title,
										onTitleChange: ( value ) =>
											setAttributes( {
												title: value,
											} ),
									},
									{
										ledeValue: lede,
										onLedeChange: ( value ) =>
											setAttributes( {
												lede: value,
											} ),
									},
								] }
							/>

							<div { ...innerBlocksProps } />
						</div>
					</div>
				</div>
			</TagName>
		</>
	);
}
