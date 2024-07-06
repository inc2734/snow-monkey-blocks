import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useInnerBlocksProps,
	useBlockProps,
	useSettings,
	useSetting, // @deprecated
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import { PanelBasicSettings } from './components/basic';
import { Edit as Header } from './components/header';

import {
	PanelSectionMovableBackgroundSettings,
	PanelSectionFixedBackgroundSettings,
	PanelSectionBackgroundTextSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
	generateStylesForSectionBackground,
	SectionBackground,
} from './components/background';

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

		textColor,
		contentsAlignment,
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

	const isItemsAlignmentable = 'fit' !== height;

	const TagName = wrapperTagName;
	const classes = classnames( 'smb-section', className, {
		[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
		[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
		[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
		[ `smb-section--bottom-divider-no-overlay` ]: ! bottomDividerOverlay,
		[ `is-items-alignment-${ itemsAlignment }` ]:
			!! itemsAlignment && isItemsAlignmentable,
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

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section--contents-wrapper-width':
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
		'--smb-section--min-height':
			!! height && ! disableCustomHeight ? height : undefined,
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
			className: 'smb-section__body',
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
				<SectionBackground
					{ ...{
						backgroundColor,
						backgroundGradientColor,
						backgroundTexture,
						fixedBackgroundColor,
						fixedBackgroundGradientColor,
						fixedBackgroundTexture,
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
