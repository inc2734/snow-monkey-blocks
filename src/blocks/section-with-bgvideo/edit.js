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
	RangeControl,
	TextControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionBackgroundTextSettings,
	SectionBackground,
} from '../section/components/background';

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

		videoURL,
		videoWidth,
		videoHeight,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		titleTagName,
		height,
		disableCustomHeight,
		containerAlign,
		disableContainerPadding,
		contentsMaxWidth,
		isSlim,

		backgroundText,

		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const TagName = 'div';

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		'smb-section-with-bgvideo',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const bgvideoClasses = classnames( 'smb-section-with-bgimage__bgimage' );

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

	const sectionStyles = {
		color: textColor || undefined,
		'--smb-section--min-height':
			!! height && ! disableCustomHeight ? height : undefined,
	};

	const maskStyles = {};
	if ( maskColor || maskGradientColor ) {
		maskStyles.backgroundColor = maskColor;
		maskStyles.backgroundImage = maskGradientColor;
	}

	const bgvideoStyles = {
		opacity: maskOpacity,
	};

	const innerStyles = {};

	const contentsWrapperStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
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
					label={ __( 'Video settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							videoURL !== metadata.attributes.videoURL.default
						}
						isShownByDefault
						label={ __( 'YouTube URL', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								videoURL: metadata.attributes.videoURL.default,
							} )
						}
					>
						<TextControl
							label={ __( 'YouTube URL', 'snow-monkey-blocks' ) }
							value={ videoURL }
							onChange={ ( value ) =>
								setAttributes( {
									videoURL: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							videoWidth !==
							metadata.attributes.videoWidth.default
						}
						isShownByDefault
						label={ __( 'Video width', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								videoWidth:
									metadata.attributes.videoWidth.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Video width', 'snow-monkey-blocks' ) }
							value={ videoWidth }
							onChange={ ( value ) =>
								setAttributes( {
									videoWidth: toNumber( value, 1, 960 ),
								} )
							}
							min="1"
							max="960"
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							videoHeight !==
							metadata.attributes.videoHeight.default
						}
						isShownByDefault
						label={ __( 'Video height', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								videoHeight:
									metadata.attributes.videoHeight.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Video height', 'snow-monkey-blocks' ) }
							value={ videoHeight }
							onChange={ ( value ) =>
								setAttributes( {
									videoHeight: toNumber( value, 1, 960 ),
								} )
							}
							min="1"
							max="960"
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
							value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
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
				<div
					className="smb-section-with-bgimage__mask"
					style={ maskStyles }
				/>
				<div className={ bgvideoClasses } style={ bgvideoStyles }></div>

				<SectionBackground
					{ ...{
						backgroundText,
						containerClasses,
					} }
				/>

				<div className={ innerClasses } style={ innerStyles }>
					<div className={ containerClasses }>
						<div
							className={ contentsWrapperClasses }
							style={ contentsWrapperStyles }
						>
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
