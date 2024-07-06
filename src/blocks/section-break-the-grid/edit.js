import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useSettings,
	useSetting, // @deprecated
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { pullLeft, pullRight } from '@wordpress/icons';

import { toNumber, getMediaType, isVideoType } from '@smb/helper';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionMovableBackgroundSettings,
	PanelSectionFixedBackgroundSettings,
	PanelSectionBackgroundTextSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';

const ALLOWED_TYPES = [ 'image', 'video' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

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

		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		imageMediaType,
		textColor,
		imagePosition,
		imageSize,
		imageMatchHeight,
		verticalAlignment,
		contentSize,
		contentHorizontalPosition,
		contentVerticalPosition,
		contentBackgroundColor,
		contentBackgroundOpacity,
		contentPadding,
		removeContentOutsidePadding,
		shadowColor,
		shadowHorizontalPosition,
		shadowVerticalPosition,
		maskColor,
		maskGradientColor,
		maskOpacity,
		mobileOrder,
		contentsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		containerAlign,
		disableContainerPadding,

		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		isBackgroundNoOver,
		backgroundColor,
		backgroundGradientColor,
		backgroundTexture,
		backgroundTextureOpacity,
		backgroundTextureUrl,
		fixedBackgroundColor,
		fixedBackgroundGradientColor,
		fixedBackgroundTexture,
		fixedBackgroundTextureOpacity,
		fixedBackgroundTextureUrl,
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

	const { imageSizes, image } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				image:
					imageID && isSelected
						? select( 'core' ).getMedia( imageID, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},

		[ isSelected, imageID, clientId ]
	);

	const imageSizeOptions = imageSizes
		.filter(
			( { slug } ) => image?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const isAvailableVerticalAlignment = [ 'right', 'left' ].includes(
		imagePosition
	);

	const isNowrapWhenMobile =
		'nowrap' === mobileOrder && isAvailableVerticalAlignment;

	const TagName = wrapperTagName;
	const classes = classnames(
		'smb-section',
		'smb-section-break-the-grid',
		`smb-section-break-the-grid--${ imagePosition }`,
		{
			[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
				contentVerticalPosition &&
				verticalAlignment &&
				'center' !== verticalAlignment &&
				isAvailableVerticalAlignment,
			[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]:
				!! mobileOrder && isAvailableVerticalAlignment,
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
			[ `smb-section--bottom-divider-no-overlay` ]:
				! bottomDividerOverlay,
			[ className ]: !! className,
			[ `smb-section-break-the-grid--match-height` ]:
				imageMatchHeight && isAvailableVerticalAlignment,
		}
	);

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

	const rowClasses = classnames( 'c-row', {
		'c-row--lg-top':
			'top' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-middle':
			'center' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-bottom':
			'bottom' === verticalAlignment && isAvailableVerticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! isNowrapWhenMobile,
		'c-row__col--1-2': isNowrapWhenMobile,
		'c-row__col--lg-1-2':
			isAvailableVerticalAlignment && ! isNowrapWhenMobile,
	} );
	const imageColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! isNowrapWhenMobile,
		'c-row__col--1-2': isNowrapWhenMobile,
		'c-row__col--lg-1-2':
			isAvailableVerticalAlignment && ! isNowrapWhenMobile,
	} );

	const figureClasses = classnames( 'smb-section-break-the-grid__figure', {
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]:
			!! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]:
			!! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]:
			!! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]:
			!! contentHorizontalPosition,
		[ `smb-section-break-the-grid__content--${ contentsAlignment }` ]:
			!! contentsAlignment,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-break-the-grid__body'
	);

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const maskClasses = classnames( 'smb-section-break-the-grid__mask' );

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section-break-the-grid--shadow-color': shadowColor || undefined,
		'--smb-section-break-the-grid--shadow-transform':
			!! shadowHorizontalPosition && !! shadowVerticalPosition
				? `translate(${ shadowHorizontalPosition || 0 }%, ${
						shadowVerticalPosition || 0
				  }%)`
				: undefined,
		'--smb-section-break-the-grid--content-background-color':
			contentBackgroundColor &&
			hexToRgba( contentBackgroundColor, contentBackgroundOpacity ),
		'--smb-section-break-the-grid--mask-color': maskColor || undefined,
		'--smb-section-break-the-grid--mask-image':
			maskGradientColor || undefined,
		'--smb-section-break-the-grid--mask-opacity':
			!! maskColor || !! maskGradientColor ? maskOpacity : undefined,
		...generateStylesForSectionBackground( {
			backgroundHorizontalPosition,
			backgroundVerticalPosition,
			isBackgroundNoOver,
			backgroundColor,
			backgroundGradientColor,
			backgroundTexture,
			backgroundTextureOpacity,
			backgroundTextureUrl,
			fixedBackgroundColor,
			fixedBackgroundGradientColor,
			fixedBackgroundTexture,
			fixedBackgroundTextureOpacity,
			fixedBackgroundTextureUrl,
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
			className: bodyClasses,
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

	let contentSizeOptions = [
		{
			value: '-50',
			label: __( '-50%', 'snow-monkey-blocks' ),
		},
		{
			value: '-40',
			label: __( '-40%', 'snow-monkey-blocks' ),
		},
		{
			value: '-30',
			label: __( '-30%', 'snow-monkey-blocks' ),
		},
		{
			value: '-20',
			label: __( '-20%', 'snow-monkey-blocks' ),
		},
		{
			value: '-10',
			label: __( '-10%', 'snow-monkey-blocks' ),
		},
		{
			value: '',
			label: __( '+-0%', 'snow-monkey-blocks' ),
		},
	];
	contentSizeOptions = isAvailableVerticalAlignment
		? contentSizeOptions.concat( [
				{
					value: '10',
					label: __( '+10%', 'snow-monkey-blocks' ),
				},
				{
					value: '20',
					label: __( '+20%', 'snow-monkey-blocks' ),
				},
				{
					value: '30',
					label: __( '+30%', 'snow-monkey-blocks' ),
				},
				{
					value: '40',
					label: __( '+40%', 'snow-monkey-blocks' ),
				},
				{
					value: '50',
					label: __( '+50%', 'snow-monkey-blocks' ),
				},
		  ] )
		: contentSizeOptions;

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
					disableIsSlim={ true }
					disableContentsMaxWidth={ true }
					disableContainerAlign={ 'full' !== align }
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
					] }
				/>

				<ToolsPanel
					label={ __( 'Media settings', 'snow-monkey-blocks' ) }
				>
					{ 0 < imageSizeOptions.length && (
						<ResolutionTool
							defaultValue={
								metadata.attributes.imageSizeSlug.default
							}
							value={ imageSizeSlug }
							options={ imageSizeOptions }
							onChange={ ( value ) => {
								const newImageURL =
									image?.media_details?.sizes?.[ value ]
										?.source_url;
								const newImageWidth =
									image?.media_details?.sizes?.[ value ]
										?.width;
								const newImageHeight =
									image?.media_details?.sizes?.[ value ]
										?.height;

								setAttributes( {
									imageURL: newImageURL,
									imageWidth: newImageWidth,
									imageHeight: newImageHeight,
									imageSizeSlug: value,
								} );
							} }
						/>
					) }

					{ isAvailableVerticalAlignment && (
						<ToolsPanelItem
							hasValue={ () =>
								mobileOrder !==
								metadata.attributes.mobileOrder.default
							}
							isShownByDefault
							label={ __(
								'Sort by mobile',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									mobileOrder:
										metadata.attributes.mobileOrder.default,
								} )
							}
						>
							<SelectControl
								label={ __(
									'Sort by mobile',
									'snow-monkey-blocks'
								) }
								value={ mobileOrder }
								options={ [
									{
										value: '',
										label: __(
											'Default',
											'snow-monkey-blocks'
										),
									},
									{
										value: 'text',
										label: __(
											'Text > Image',
											'snow-monkey-blocks'
										),
									},
									{
										value: 'image',
										label: __(
											'Image > Text',
											'snow-monkey-blocks'
										),
									},
									{
										value: 'nowrap',
										label: __(
											'No wrap',
											'snow-monkey-blocks'
										),
									},
								] }
								onChange={ ( value ) =>
									setAttributes( {
										mobileOrder:
											'' === value ? undefined : value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							imageSize !== metadata.attributes.imageSize.default
						}
						isShownByDefault
						label={ __(
							'Image Size Adjustment',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								imageSize:
									metadata.attributes.imageSize.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Image Size Adjustment',
								'snow-monkey-blocks'
							) }
							value={ imageSize }
							options={ [
								{
									value: '',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								{
									value: '10',
									label: __( '+10%', 'snow-monkey-blocks' ),
								},
								{
									value: '20',
									label: __( '+20%', 'snow-monkey-blocks' ),
								},
								{
									value: '30',
									label: __( '+30%', 'snow-monkey-blocks' ),
								},
								{
									value: '40',
									label: __( '+40%', 'snow-monkey-blocks' ),
								},
								{
									value: '50',
									label: __( '+50%', 'snow-monkey-blocks' ),
								},
								{
									value: '60',
									label: __( '+60%', 'snow-monkey-blocks' ),
								},
								{
									value: '70',
									label: __( '+70%', 'snow-monkey-blocks' ),
								},
								{
									value: '80',
									label: __( '+80%', 'snow-monkey-blocks' ),
								},
								{
									value: '90',
									label: __( '+90%', 'snow-monkey-blocks' ),
								},
								{
									value: '100',
									label: __( '+100%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									imageSize: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ isAvailableVerticalAlignment && (
						<ToolsPanelItem
							hasValue={ () =>
								imageMatchHeight !==
								metadata.attributes.imageMatchHeight.default
							}
							isShownByDefault
							label={ __(
								'Adjust the height of the media to the height of the block.',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									imageMatchHeight:
										metadata.attributes.imageMatchHeight
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Adjust the height of the media to the height of the block.',
									'snow-monkey-blocks'
								) }
								checked={ imageMatchHeight }
								onChange={ ( value ) =>
									setAttributes( {
										imageMatchHeight: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>

				<ToolsPanel
					label={ __( 'Contents settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							contentSize !==
							metadata.attributes.contentSize.default
						}
						isShownByDefault
						label={ __(
							'Content size adjustment',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								contentSize:
									metadata.attributes.contentSize.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Content size adjustment',
								'snow-monkey-blocks'
							) }
							value={ contentSize }
							options={ contentSizeOptions }
							onChange={ ( value ) =>
								setAttributes( {
									contentSize: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							contentHorizontalPosition !==
							metadata.attributes.contentHorizontalPosition
								.default
						}
						isShownByDefault
						label={ __(
							'Degree of overlap of content to image',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								contentHorizontalPosition:
									metadata.attributes
										.contentHorizontalPosition.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Degree of overlap of content to image',
								'snow-monkey-blocks'
							) }
							value={ contentHorizontalPosition }
							options={ [
								{
									value: '',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								// {
								// 	value: '5',
								// 	label: __( '5%', 'snow-monkey-blocks' ),
								// },
								{
									value: '10',
									label: __( '10%', 'snow-monkey-blocks' ),
								},
								// {
								// 	value: '15',
								// 	label: __( '15%', 'snow-monkey-blocks' ),
								// },
								{
									value: '20',
									label: __( '20%', 'snow-monkey-blocks' ),
								},
								// {
								// 	value: '25',
								// 	label: __( '25%', 'snow-monkey-blocks' ),
								// },
								{
									value: '30',
									label: __( '30%', 'snow-monkey-blocks' ),
								},
								{
									value: '40',
									label: __( '40%', 'snow-monkey-blocks' ),
								},
								{
									value: '50',
									label: __( '50%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									contentHorizontalPosition: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ !! verticalAlignment &&
						'center' !== verticalAlignment &&
						isAvailableVerticalAlignment && (
							<ToolsPanelItem
								hasValue={ () =>
									contentVerticalPosition !==
									metadata.attributes.contentVerticalPosition
										.default
								}
								isShownByDefault
								label={ __(
									'Vertical position of content',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										contentVerticalPosition:
											metadata.attributes
												.contentVerticalPosition
												.default,
									} )
								}
							>
								<SelectControl
									label={ __(
										'Vertical position of content',
										'snow-monkey-blocks'
									) }
									value={ contentVerticalPosition }
									options={ [
										{
											value: '',
											label: __(
												'+-0%',
												'snow-monkey-blocks'
											),
										},
										{
											value: 't100',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s up',
													'snow-monkey-blocks'
												),
												'100px'
											),
										},
										{
											value: 't80',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s up',
													'snow-monkey-blocks'
												),
												'80px'
											),
										},
										{
											value: 't60',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s up',
													'snow-monkey-blocks'
												),
												'60px'
											),
										},
										{
											value: 't40',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s up',
													'snow-monkey-blocks'
												),
												'40px'
											),
										},
										{
											value: 'b40',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s down',
													'snow-monkey-blocks'
												),
												'40px'
											),
										},
										{
											value: 'b60',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s down',
													'snow-monkey-blocks'
												),
												'60px'
											),
										},
										{
											value: 'b80',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s down',
													'snow-monkey-blocks'
												),
												'80px'
											),
										},
										{
											value: 'b100',
											label: sprintf(
												// translators: %1$s: px
												__(
													'Move %1$s down',
													'snow-monkey-blocks'
												),
												'100px'
											),
										},
									] }
									onChange={ ( value ) =>
										setAttributes( {
											contentVerticalPosition: value,
										} )
									}
								/>
							</ToolsPanelItem>
						) }

					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __(
										'Background color',
										'snow-monkey-blocks'
									),
									colorValue: contentBackgroundColor,
									onColorChange: ( value ) => {
										let newValue = value;
										if ( !! value ) {
											const match =
												value.match( /^var\((.+)\)$/ );
											if ( match ) {
												newValue = window
													.getComputedStyle(
														document.documentElement
													)
													.getPropertyValue(
														match[ 1 ]
													)
													.trim();
												if ( ! newValue ) {
													newValue = window
														.getComputedStyle(
															document.body
														)
														.getPropertyValue(
															match[ 1 ]
														)
														.trim();
												}
											}
										}

										setAttributes( {
											contentBackgroundColor: newValue,
										} );
									},
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>
					</div>

					{ !! contentBackgroundColor && (
						<ToolsPanelItem
							hasValue={ () =>
								contentBackgroundOpacity !==
								metadata.attributes.contentBackgroundOpacity
									.default
							}
							isShownByDefault
							label={ __(
								'Background opacity',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									contentBackgroundOpacity:
										metadata.attributes
											.contentBackgroundOpacity.default,
								} )
							}
						>
							<RangeControl
								label={ __(
									'Background opacity',
									'snow-monkey-blocks'
								) }
								value={ Number(
									contentBackgroundOpacity.toFixed( 1 )
								) }
								onChange={ ( value ) =>
									setAttributes( {
										contentBackgroundOpacity: value,
									} )
								}
								min={ 0 }
								max={ 1 }
								step={ 0.1 }
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							contentPadding !==
							metadata.attributes.contentPadding.default
						}
						isShownByDefault
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								contentPadding:
									metadata.attributes.contentPadding.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Padding', 'snow-monkey-blocks' ) }
							value={ contentPadding }
							options={ [
								{
									value: '',
									label: __( 'None', 'snow-monkey-blocks' ),
								},
								{
									value: 's',
									label: __( 'S', 'snow-monkey-blocks' ),
								},
								{
									value: 'm',
									label: __( 'M', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( 'L', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									contentPadding: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ contentPadding && (
						<ToolsPanelItem
							hasValue={ () =>
								removeContentOutsidePadding !==
								metadata.attributes.removeContentOutsidePadding
									.default
							}
							isShownByDefault
							label={ __(
								'Remove outside padding',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									removeContentOutsidePadding:
										metadata.attributes
											.removeContentOutsidePadding
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Remove outside padding',
									'snow-monkey-blocks'
								) }
								checked={ removeContentOutsidePadding }
								onChange={ ( value ) =>
									setAttributes( {
										removeContentOutsidePadding: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>

				<PanelBoxShadowSettings
					label={ __( 'Shadow settings', 'snow-monkey-blocks' ) }
					settings={ [
						{
							colorValue: shadowColor || '',
							onColorChange: ( value ) =>
								setAttributes( {
									shadowColor: value,
								} ),
							defaultValue:
								metadata.attributes.shadowColor.default,
						},
						{
							horizontalValue: shadowHorizontalPosition,
							onHorizontalChange: ( value ) =>
								setAttributes( {
									shadowHorizontalPosition: toNumber(
										value,
										-120,
										120
									),
								} ),
							defaultValue:
								metadata.attributes.shadowHorizontalPosition
									.default,
						},
						{
							verticalValue: shadowVerticalPosition,
							onVerticalChange: ( value ) =>
								setAttributes( {
									shadowVerticalPosition: toNumber(
										value,
										-120,
										120
									),
								} ),
							defaultValue:
								metadata.attributes.shadowVerticalPosition
									.default,
						},
					] }
				/>

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

				<PanelSectionMovableBackgroundSettings
					hasColor={ backgroundColor || backgroundGradientColor }
					disableNoOver={
						0 === backgroundHorizontalPosition &&
						0 === backgroundVerticalPosition
					}
					hasTexture={ !! backgroundTexture }
					settings={ [
						{
							colorValue: backgroundColor,
							gradientValue: backgroundGradientColor,
							onColorChange: ( value ) =>
								setAttributes( {
									backgroundColor: value,
								} ),
							onGradientChange: ( value ) =>
								setAttributes( {
									backgroundGradientColor: value,
								} ),
							defaultColorValue:
								metadata.attributes.backgroundColor.default,
							defaultGradientValue:
								metadata.attributes.backgroundGradientColor
									.default,
						},
						{
							horizontalPositionValue:
								backgroundHorizontalPosition,
							onHorizontalPositionChange: ( value ) =>
								setAttributes( {
									backgroundHorizontalPosition: toNumber(
										value,
										-90,
										90
									),
								} ),
							defaultValue:
								metadata.attributes.backgroundHorizontalPosition
									.default,
						},
						{
							verticalPositionValue: backgroundVerticalPosition,
							onVerticalPositionChange: ( value ) =>
								setAttributes( {
									backgroundVerticalPosition: toNumber(
										value,
										-90,
										90
									),
								} ),
							defaultValue:
								metadata.attributes.backgroundVerticalPosition
									.default,
						},
						{
							isNoOverValue: isBackgroundNoOver,
							onIsNoOverChange: ( value ) =>
								setAttributes( {
									isBackgroundNoOver: value,
								} ),
							defaultValue:
								metadata.attributes.isBackgroundNoOver.default,
						},
						{
							textureValue: backgroundTexture,
							onTextureChange: ( value ) =>
								setAttributes( {
									backgroundTexture: value,
									backgroundTextureUrl: !! value
										? `${ smb.pluginUrl }/dist/blocks/section/img/${ value }.png`
										: undefined,
								} ),
							defaultValue:
								metadata.attributes.backgroundTexture.default,
						},
						{
							textureOpacityValue: backgroundTextureOpacity,
							onTextureOpacityChange: ( value ) =>
								setAttributes( {
									backgroundTextureOpacity: toNumber(
										value,
										0.1,
										1
									),
								} ),
							defaultValue:
								metadata.attributes.backgroundTextureOpacity
									.default,
						},
					] }
				/>

				<PanelSectionFixedBackgroundSettings
					hasTexture={ !! fixedBackgroundTexture }
					settings={ [
						{
							colorValue: fixedBackgroundColor,
							gradientValue: fixedBackgroundGradientColor,
							onColorChange: ( value ) =>
								setAttributes( {
									fixedBackgroundColor: value,
								} ),
							onGradientChange: ( value ) =>
								setAttributes( {
									fixedBackgroundGradientColor: value,
								} ),
							defaultColorValue:
								metadata.attributes.fixedBackgroundColor
									.default,
							defaultGradientValue:
								metadata.attributes.fixedBackgroundGradientColor
									.default,
						},
						{
							textureValue: fixedBackgroundTexture,
							onTextureChange: ( value ) =>
								setAttributes( {
									fixedBackgroundTexture: value,
									fixedBackgroundTextureUrl: !! value
										? `${ smb.pluginUrl }/dist/blocks/section/img/${ value }.png`
										: undefined,
								} ),
							defaultValue:
								metadata.attributes.fixedBackgroundTexture
									.default,
						},
						{
							textureOpacityValue: fixedBackgroundTextureOpacity,
							onTextureOpacityChange: ( value ) =>
								setAttributes( {
									fixedBackgroundTextureOpacity: toNumber(
										value,
										0.1,
										1
									),
								} ),
							defaultValue:
								metadata.attributes
									.fixedBackgroundTextureOpacity.default,
						},
					] }
				/>

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
							verticalPosition: topDividerVerticalPosition,
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
							verticalPosition: bottomDividerVerticalPosition,
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
				{ isAvailableVerticalAlignment && (
					<BlockVerticalAlignmentToolbar
						onChange={ ( value ) =>
							setAttributes( {
								verticalAlignment: value,
							} )
						}
						value={ verticalAlignment }
					/>
				) }

				<AlignmentToolbar
					value={ contentsAlignment }
					onChange={ ( value ) =>
						setAttributes( {
							contentsAlignment: value,
						} )
					}
				/>

				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show media on left',
							'snow-monkey-blocks'
						) }
						isActive={ 'left' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'left' } )
						}
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show media on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'right' } )
						}
					/>

					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show media on top',
							'snow-monkey-blocks'
						) }
						isActive={ 'top' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'top' } )
						}
						className="smb-toolbar-button-rotate-90"
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show media on bottom',
							'snow-monkey-blocks'
						) }
						isActive={ 'bottom' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'bottom' } )
						}
						className="smb-toolbar-button-rotate-90"
					/>
				</ToolbarGroup>
			</BlockControls>

			<TagName { ...blockProps }>
				<SectionBackground
					{ ...{
						backgroundHorizontalPosition,
						backgroundVerticalPosition,
						isBackgroundNoOver,
						backgroundColor,
						backgroundGradientColor,
						backgroundTexture,
						backgroundTextureOpacity,
						backgroundTextureUrl,
						fixedBackgroundColor,
						fixedBackgroundGradientColor,
						fixedBackgroundTexture,
						fixedBackgroundTextureOpacity,
						fixedBackgroundTextureUrl,
						topDividerType,
						topDividerLevel,
						topDividerColor,
						topDividerVerticalPosition,
						bottomDividerType,
						bottomDividerLevel,
						bottomDividerColor,
						bottomDividerVerticalPosition,
						backgroundText,
						containerClasses,
					} }
				/>

				<div className="smb-section__inner">
					<div className={ containerClasses }>
						<div className="smb-section__contents-wrapper smb-section-break-the-grid__contents-wrapper">
							<div className={ rowClasses }>
								<div className={ textColumnClasses }>
									<div className={ contentClasses }>
										<Header
											isSelected={ isSelected }
											className="smb-section-break-the-grid"
											settings={ [
												{
													subtitleValue: subtitle,
													onSubtitleChange: (
														value
													) =>
														setAttributes( {
															subtitle: value,
														} ),
												},
												{
													titleTagNameValue:
														titleTagName,
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
								<div className={ imageColumnClasses }>
									<div className={ figureClasses }>
										{ shadowColor && (
											<div className={ shadowClasses } />
										) }

										{ 0 <
											Number(
												( 1 - maskOpacity ).toFixed( 1 )
											) && (
											<div className={ maskClasses } />
										) }

										<Figure
											src={ imageURL }
											id={ imageID }
											alt={ imageAlt }
											width={ imageWidth }
											height={ imageHeight }
											onSelect={ ( media ) => {
												const newImageSizeSlug =
													!! media?.sizes?.[
														imageSizeSlug
													]
														? imageSizeSlug
														: DEFAULT_MEDIA_SIZE_SLUG;
												const newImageURL =
													media?.sizes?.[
														newImageSizeSlug
													]?.url;
												const newImageWidth =
													media?.sizes?.[
														newImageSizeSlug
													]?.width;
												const newImageHeight =
													media?.sizes?.[
														newImageSizeSlug
													]?.height;

												setAttributes( {
													imageURL:
														newImageURL ||
														media.url,
													imageID: media.id,
													imageAlt: media.alt,
													imageWidth:
														newImageWidth ||
														media.width,
													imageHeight:
														newImageHeight ||
														media.height,
													imageMediaType:
														getMediaType( media ),
													mediaSizeSlug:
														newImageSizeSlug,
												} );
											} }
											onSelectURL={ ( newImageURL ) => {
												if (
													newImageURL !== imageURL
												) {
													setAttributes( {
														imageURL: newImageURL,
														imageID: 0,
														mediaSizeSlug:
															DEFAULT_MEDIA_SIZE_SLUG,
														mediaType: getMediaType(
															{
																media_type:
																	isVideoType(
																		newImageURL
																	)
																		? 'video'
																		: 'image',
															}
														),
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
											mediaType={ imageMediaType }
											allowedTypes={ ALLOWED_TYPES }
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</TagName>
		</>
	);
}
