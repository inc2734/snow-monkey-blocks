import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	ContrastChecker,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderBoxControl as BorderBoxControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';
import { toNumber } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes, clientId } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		borderStyle,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
		boxShadow,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const styles = {
		'--smb-box--color': textColor || undefined,
		'--smb-box--border-radius': String( borderRadius ).match( /^\d+$/ )
			? `${ borderRadius }px`
			: borderRadius,
		'--smb-box--box-shadow': !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
		'--smb-box--background-color': backgroundColor || undefined,
		'--smb-box--background-image': backgroundGradientColor || undefined,
		'--smb-box--background-opacity': String( opacity ),
		'--smb-box--border-color': borderColor || undefined,
		'--smb-box--border-style': borderStyle || undefined,
		'--smb-box--border-width': String( borderWidth ).match( /^\d+$/ )
			? `${ borderWidth }px`
			: borderWidth,
	};

	const classes = classnames( 'smb-box' );

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-box__body',
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
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls group="border">
				<ToolsPanelItem
					hasValue={ () =>
						borderColor !==
							metadata.attributes.borderColor.default ||
						borderStyle !==
							metadata.attributes.borderStyle.default ||
						borderWidth !== metadata.attributes.borderWidth.default
					}
					isShownByDefault
					label={ __( 'Border', 'snow-monkey-blocks' ) }
					onDeselect={ () =>
						setAttributes( {
							borderColor:
								metadata.attributes.borderColor.default,
							borderStyle:
								metadata.attributes.borderStyle.default,
							borderWidth:
								metadata.attributes.borderWidth.default,
						} )
					}
					panelId={ clientId }
				>
					<BorderBoxControl
						{ ...useMultipleOriginColorsAndGradients() }
						className="smb-border-box-control"
						enableAlpha={ true }
						enableStyle={ true }
						onChange={ ( value ) => {
							setAttributes( {
								borderColor: value?.color,
								borderWidth: value?.width,
								borderStyle: value?.style,
							} );
						} }
						popoverOffset={ 40 }
						popoverPlacement="left-start"
						value={ {
							color: borderColor,
							style: borderStyle,
							width: borderWidth,
						} }
						__experimentalIsRenderedInSidebar
					/>
				</ToolsPanelItem>

				<ToolsPanelItem
					hasValue={ () =>
						borderRadius !==
						metadata.attributes.borderRadius.default
					}
					isShownByDefault
					label={ __( 'Border radius', 'snow-monkey-blocks' ) }
					onDeselect={ () =>
						setAttributes( {
							borderRadius:
								metadata.attributes.borderRadius.default,
						} )
					}
					panelId={ clientId }
				>
					<div className="smb-border-radius-control">
						<BorderRadiusControl
							values={ borderRadius }
							onChange={ ( value ) => {
								setAttributes( { borderRadius: value } );
							} }
						/>
					</div>
				</ToolsPanelItem>
			</InspectorControls>

			<InspectorControls group="styles">
				<ToolsPanel label={ __( 'Background', 'snow-monkey-blocks' ) }>
					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __( 'Color', 'snow-monkey-blocks' ),
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
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>
					</div>

					<ToolsPanelItem
						hasValue={ () =>
							opacity !== metadata.attributes.opacity.default
						}
						isShownByDefault
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								opacity: metadata.attributes.opacity.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							value={ opacity }
							onChange={ ( value ) =>
								setAttributes( {
									opacity: toNumber( value, 0, 1 ),
								} )
							}
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color,
							onColorChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										color: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.color,
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										opacity: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.opacity,
						},
						{
							horizontalValue: boxShadow.horizontal,
							onHorizontalChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										horizontal: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default
									.horizontal,
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										blur: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.blur,
						},
						{
							spreadValue: boxShadow.spread,
							onSpreadChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										spread: value,
									},
								} );
							},
							defaultValue:
								metadata.attributes.boxShadow.default.spread,
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-box__background" />

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
