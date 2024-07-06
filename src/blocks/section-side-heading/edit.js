import classnames from 'classnames';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	SelectControl,
	ToolbarButton,
	ToolbarGroup,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { pullLeft, pullRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { toNumber, getColumnSize } from '@smb/helper';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionMovableBackgroundSettings,
	PanelSectionFixedBackgroundSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
	generateStylesForSectionBackground,
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

		textColor,
		headingPosition,
		headingColumnSize,
		contentColumnSize,
		contentJustification,
		itemsAlignment,
		gap,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
		disableCustomHeight,
		containerAlign,
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

		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize,
		contentColumnSize
	);

	const isItemsAlignmentable = 'fit' !== height;

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-side-heading',
		className,
		{
			[ `smb-section--${ height }` ]: !! height && disableCustomHeight,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
			[ `smb-section--top-divider-no-overlay` ]: ! topDividerOverlay,
			[ `smb-section--bottom-divider-no-overlay` ]:
				! bottomDividerOverlay,
		}
	);

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]:
			!! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign && 'full' === align,
		alignwide: 'wide' === containerAlign && 'full' === align,
	} );

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const rowClasses = classnames( 'c-row', {
		'c-row--md-margin': 'm' === gap || ! gap,
		[ `c-row--md-margin-${ gap }` ]: 's' === gap || 'l' === gap,
		'c-row--reverse': 'right' === headingPosition,
	} );

	const headingColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ imageColumnWidth }`
	);

	const contentColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ textColumnWidth }`
	);

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-side-heading__body'
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

	return (
		<>
			<InspectorControls group="dimensions">
				<ToolsPanelItem
					hasValue={ () => gap !== metadata.attributes.gap.default }
					isShownByDefault
					label={ __( 'Gap', 'snow-monkey-blocks' ) }
					onDeselect={ () =>
						setAttributes( {
							gap: metadata.attributes.gap.default,
						} )
					}
					panelId={ clientId }
				>
					<SelectControl
						label={ __( 'Gap', 'snow-monkey-blocks' ) }
						value={ gap }
						onChange={ ( value ) =>
							setAttributes( {
								gap: value,
							} )
						}
						options={ [
							{
								value: '',
								label: __( 'Default', 'snow-monkey-blocks' ),
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
					/>
				</ToolsPanelItem>
			</InspectorControls>

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
							containerAlignValue: containerAlign,
							onContainerAlignChange: ( value ) =>
								setAttributes( {
									containerAlign: value,
								} ),
							defaultValue:
								metadata.attributes.containerAlign.default,
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
					label={ __( 'Columns settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							headingColumnSize !==
							metadata.attributes.headingColumnSize.default
						}
						isShownByDefault
						label={ __(
							'Heading column size',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								headingColumnSize:
									metadata.attributes.headingColumnSize
										.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Heading column size',
								'snow-monkey-blocks'
							) }
							value={ headingColumnSize }
							onChange={ ( value ) =>
								setAttributes( {
									headingColumnSize: value,
								} )
							}
							options={ [
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							contentColumnSize !==
							metadata.attributes.contentColumnSize.default
						}
						isShownByDefault
						label={ __(
							'Content column size',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								contentColumnSize:
									metadata.attributes.contentColumnSize
										.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Content column size',
								'snow-monkey-blocks'
							) }
							value={ contentColumnSize }
							onChange={ ( value ) =>
								setAttributes( {
									contentColumnSize: value,
								} )
							}
							options={ [
								{
									value: '',
									label: __( 'Auto', 'snow-monkey-blocks' ),
								},
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</ToolsPanelItem>
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

				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show heading on left',
							'snow-monkey-blocks'
						) }
						isActive={ 'left' === headingPosition }
						onClick={ () =>
							setAttributes( { headingPosition: 'left' } )
						}
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show heading on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === headingPosition }
						onClick={ () =>
							setAttributes( { headingPosition: 'right' } )
						}
					/>
				</ToolbarGroup>
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
						// backgroundText,
						containerClasses,
					} }
				/>

				<div className={ innerClasses }>
					<div className={ containerClasses }>
						<div className={ contentsWrapperClasses }>
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									<Header
										isSelected={ isSelected }
										className="smb-section-side-heading"
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
								</div>
								<div className={ contentColClasses }>
									<div { ...innerBlocksProps } />
								</div>
							</div>
						</div>
					</div>
				</div>
			</TagName>
		</>
	);
}
