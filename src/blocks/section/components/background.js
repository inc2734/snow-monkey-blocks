import classnames from 'classnames';

import {
	FontSizePicker,
	RichText,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	ToggleControl,
	TextareaControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { divider } from '@smb/helper';
import SpacingControl from '@smb/component/spacing-control';

const textureOptions = [
	{
		value: '',
		label: __( 'None', 'snow-monkey-blocks' ),
	},
	{
		value: 'stripe',
		label: __( 'Stripe', 'snow-monkey-blocks' ),
	},
	{
		value: 'noise',
		label: __( 'Noise', 'snow-monkey-blocks' ),
	},
	{
		value: 'dots',
		label: __( 'Dots', 'snow-monkey-blocks' ),
	},
	{
		value: 'dots2',
		label: __( 'Dots 2', 'snow-monkey-blocks' ),
	},
];

const dividerTypeOptions = [
	{
		value: 'tilt',
		label: __( 'Tilt', 'snow-monkey-blocks' ),
	},
	{
		value: 'curve',
		label: __( 'Curve', 'snow-monkey-blocks' ),
	},
	{
		value: 'wave',
		label: __( 'Wave', 'snow-monkey-blocks' ),
	},
	{
		value: 'triangle',
		label: __( 'Triangle', 'snow-monkey-blocks' ),
	},
	{
		value: 'triangle-large',
		label: __( 'Triangle (Large)', 'snow-monkey-blocks' ),
	},
];

export const PanelSectionMovableBackgroundSettings = ( {
	hasColor,
	disableNoOver,
	hasTexture,
	settings,
} ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<ToolsPanel
			label={ __( 'Background (Movable)', 'snow-monkey-blocks' ) }
		>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'gradientValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'onGradientChange' ) &&
					setting.hasOwnProperty( 'defaultColorValue' ) &&
					setting.hasOwnProperty( 'defaultGradientValue' )
				) {
					return (
						<div
							className="smb-color-gradient-settings-dropdown"
							key={ index }
						>
							<ColorGradientSettingsDropdown
								settings={ [
									{
										label: __(
											'Color',
											'snow-monkey-blocks'
										),
										colorValue: setting.colorValue,
										gradientValue: setting.gradientValue,
										onColorChange: setting.onColorChange,
										onGradientChange:
											setting.onGradientChange,
									},
								] }
								__experimentalIsRenderedInSidebar
								{ ...multipleOriginColorsAndGradients }
							/>
						</div>
					);
				}

				if ( hasColor ) {
					if (
						setting.hasOwnProperty( 'horizontalPositionValue' ) &&
						setting.hasOwnProperty(
							'onHorizontalPositionChange'
						) &&
						setting.hasOwnProperty( 'defaultValue' )
					) {
						return (
							<ToolsPanelItem
								key={ index }
								hasValue={ () =>
									setting.horizontalPositionValue !==
									setting.defaultValue
								}
								isShownByDefault
								label={ __(
									'Background position (Left / Right)',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setting.onHorizontalPositionChange(
										setting.defaultValue
									)
								}
							>
								<RangeControl
									label={ __(
										'Background position (Left / Right)',
										'snow-monkey-blocks'
									) }
									value={ setting.horizontalPositionValue }
									onChange={
										setting.onHorizontalPositionChange
									}
									min="-90"
									max="90"
								/>
							</ToolsPanelItem>
						);
					}

					if (
						setting.hasOwnProperty( 'verticalPositionValue' ) &&
						setting.hasOwnProperty( 'onVerticalPositionChange' ) &&
						setting.hasOwnProperty( 'defaultValue' )
					) {
						return (
							<ToolsPanelItem
								key={ index }
								hasValue={ () =>
									setting.verticalPositionValue !==
									setting.defaultValue
								}
								isShownByDefault
								label={ __(
									'Background Position (Top / Bottom)',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setting.onVerticalPositionChange(
										setting.defaultValue
									)
								}
							>
								<RangeControl
									label={ __(
										'Background Position (Top / Bottom)',
										'snow-monkey-blocks'
									) }
									value={ setting.verticalPositionValue }
									onChange={
										setting.onVerticalPositionChange
									}
									min="-90"
									max="90"
								/>
							</ToolsPanelItem>
						);
					}

					if (
						! disableNoOver &&
						setting.hasOwnProperty( 'isNoOverValue' ) &&
						setting.hasOwnProperty( 'onIsNoOverChange' ) &&
						setting.hasOwnProperty( 'defaultValue' )
					) {
						return (
							<ToolsPanelItem
								key={ index }
								hasValue={ () =>
									setting.isNoOverValue !==
									setting.defaultValue
								}
								isShownByDefault
								label={ __(
									"Make sure the background doesn't overflow to the outside",
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setting.onIsNoOverChange(
										setting.defaultValue
									)
								}
							>
								<ToggleControl
									label={ __(
										"Make sure the background doesn't overflow to the outside",
										'snow-monkey-blocks'
									) }
									checked={ setting.isNoOverValue }
									onChange={ setting.onIsNoOverChange }
								/>
							</ToolsPanelItem>
						);
					}

					if (
						setting.hasOwnProperty( 'textureValue' ) &&
						setting.hasOwnProperty( 'onTextureChange' ) &&
						setting.hasOwnProperty( 'defaultValue' )
					) {
						return (
							<ToolsPanelItem
								key={ index }
								hasValue={ () =>
									setting.textureValue !==
									setting.defaultValue
								}
								isShownByDefault
								label={ __( 'Texture', 'snow-monkey-blocks' ) }
								onDeselect={ () =>
									setting.onTextureChange(
										setting.defaultValue
									)
								}
							>
								<SelectControl
									label={ __(
										'Texture',
										'snow-monkey-blocks'
									) }
									value={ setting.textureValue }
									onChange={ setting.onTextureChange }
									options={ textureOptions }
								/>
							</ToolsPanelItem>
						);
					}

					if (
						hasTexture &&
						setting.hasOwnProperty( 'textureOpacityValue' ) &&
						setting.hasOwnProperty( 'onTextureOpacityChange' ) &&
						setting.hasOwnProperty( 'defaultValue' )
					) {
						return (
							<ToolsPanelItem
								key={ index }
								hasValue={ () =>
									setting.textureOpacityValue !==
									setting.defaultValue
								}
								isShownByDefault
								label={ __(
									'Texture opacity',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setting.onTextureOpacityChange(
										setting.defaultValue
									)
								}
							>
								<RangeControl
									label={ __(
										'Texture opacity',
										'snow-monkey-blocks'
									) }
									value={ Number(
										setting.textureOpacityValue.toFixed( 1 )
									) }
									onChange={ setting.onTextureOpacityChange }
									min={ 0.1 }
									max={ 1 }
									step={ 0.1 }
								/>
							</ToolsPanelItem>
						);
					}
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</ToolsPanel>
	);
};

export const PanelSectionFixedBackgroundSettings = ( {
	hasTexture,
	settings,
} ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<ToolsPanel label={ __( 'Background (Fixed)', 'snow-monkey-blocks' ) }>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'gradientValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'onGradientChange' ) &&
					setting.hasOwnProperty( 'defaultColorValue' ) &&
					setting.hasOwnProperty( 'defaultGradientValue' )
				) {
					return (
						<div
							className="smb-color-gradient-settings-dropdown"
							key={ index }
						>
							<ColorGradientSettingsDropdown
								settings={ [
									{
										label: __(
											'Color',
											'snow-monkey-blocks'
										),
										colorValue: setting.colorValue,
										gradientValue: setting.gradientValue,
										onColorChange: setting.onColorChange,
										onGradientChange:
											setting.onGradientChange,
									},
								] }
								__experimentalIsRenderedInSidebar
								{ ...multipleOriginColorsAndGradients }
							/>
						</div>
					);
				}

				if (
					setting.hasOwnProperty( 'textureValue' ) &&
					setting.hasOwnProperty( 'onTextureChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.textureValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Texture', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onTextureChange( setting.defaultValue )
							}
						>
							<SelectControl
								key={ index }
								label={ __( 'Texture', 'snow-monkey-blocks' ) }
								value={ setting.textureValue }
								onChange={ setting.onTextureChange }
								options={ textureOptions }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					hasTexture &&
					setting.hasOwnProperty( 'textureOpacityValue' ) &&
					setting.hasOwnProperty( 'onTextureOpacityChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.textureOpacityValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Texture opacity',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onTextureOpacityChange(
									setting.defaultValue
								)
							}
						>
							<RangeControl
								key={ index }
								label={ __(
									'Texture opacity',
									'snow-monkey-blocks'
								) }
								value={ Number(
									setting.textureOpacityValue.toFixed( 1 )
								) }
								onChange={ setting.onTextureOpacityChange }
								min={ 0.1 }
								max={ 1 }
								step={ 0.1 }
							/>
						</ToolsPanelItem>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</ToolsPanel>
	);
};

export const PanelSectionTopDividerSettings = ( { settings } ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<ToolsPanel label={ __( 'Top divider', 'snow-monkey-blocks' ) }>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'typeValue' ) &&
					setting.hasOwnProperty( 'onTypeChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.typeValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onTypeChange( setting.defaultValue )
							}
						>
							<SelectControl
								label={ __( 'Type', 'snow-monkey-blocks' ) }
								value={ setting.typeValue }
								onChange={ setting.onTypeChange }
								options={ dividerTypeOptions }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'levelValue' ) &&
					setting.hasOwnProperty( 'onLevelChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.levelValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onLevelChange( setting.defaultValue )
							}
						>
							<RangeControl
								label={ __( 'Level', 'snow-monkey-blocks' ) }
								value={ setting.levelValue }
								onChange={ setting.onLevelChange }
								min="-100"
								max="100"
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'defaultColorValue' )
				) {
					return (
						<div
							className="smb-color-gradient-settings-dropdown"
							key={ index }
						>
							<ColorGradientSettingsDropdown
								settings={ [
									{
										label: __(
											'Color',
											'snow-monkey-blocks'
										),
										colorValue: setting.colorValue,
										onColorChange: setting.onColorChange,
									},
								] }
								__experimentalIsRenderedInSidebar
								{ ...multipleOriginColorsAndGradients }
							/>
						</div>
					);
				}

				if (
					setting.hasOwnProperty( 'verticalPositionValue' ) &&
					setting.hasOwnProperty( 'onVerticalPositionChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.verticalPositionValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Position (Top / Bottom)',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onVerticalPositionChange(
									setting.defaultValue
								)
							}
						>
							<RangeControl
								label={ __(
									'Position (Top / Bottom)',
									'snow-monkey-blocks'
								) }
								value={ setting.verticalPositionValue }
								onChange={ setting.onVerticalPositionChange }
								min="-90"
								max="90"
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'overlayValue' ) &&
					setting.hasOwnProperty( 'onOverlayChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.overlayValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Overlap divider on content',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onOverlayChange( setting.defaultValue )
							}
						>
							<ToggleControl
								label={ __(
									'Overlap divider on content',
									'snow-monkey-blocks'
								) }
								checked={ setting.overlayValue }
								onChange={ setting.onOverlayChange }
							/>
						</ToolsPanelItem>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</ToolsPanel>
	);
};

export const PanelSectionBottomDividerSettings = ( { settings } ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<ToolsPanel label={ __( 'Bottom divider', 'snow-monkey-blocks' ) }>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'typeValue' ) &&
					setting.hasOwnProperty( 'onTypeChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.typeValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onTypeChange( setting.defaultValue )
							}
						>
							<SelectControl
								label={ __( 'Type', 'snow-monkey-blocks' ) }
								value={ setting.typeValue }
								onChange={ setting.onTypeChange }
								options={ dividerTypeOptions }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'levelValue' ) &&
					setting.hasOwnProperty( 'onLevelChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.levelValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onLevelChange( setting.defaultValue )
							}
						>
							<RangeControl
								label={ __( 'Level', 'snow-monkey-blocks' ) }
								value={ setting.levelValue }
								onChange={ setting.onLevelChange }
								min="-100"
								max="100"
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'defaultColorValue' )
				) {
					return (
						<div
							className="smb-color-gradient-settings-dropdown"
							key={ index }
						>
							<ColorGradientSettingsDropdown
								settings={ [
									{
										label: __(
											'Color',
											'snow-monkey-blocks'
										),
										colorValue: setting.colorValue,
										onColorChange: setting.onColorChange,
									},
								] }
								__experimentalIsRenderedInSidebar
								{ ...multipleOriginColorsAndGradients }
							/>
						</div>
					);
				}

				if (
					setting.hasOwnProperty( 'verticalPositionValue' ) &&
					setting.hasOwnProperty( 'onVerticalPositionChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.verticalPositionValue !==
								setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Position (Top / Bottom)',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onVerticalPositionChange(
									setting.defaultValue
								)
							}
						>
							<RangeControl
								label={ __(
									'Position (Top / Bottom)',
									'snow-monkey-blocks'
								) }
								value={ setting.verticalPositionValue }
								onChange={ setting.onVerticalPositionChange }
								min="-90"
								max="90"
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'overlayValue' ) &&
					setting.hasOwnProperty( 'onOverlayChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.overlayValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __(
								'Overlap divider on content',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setting.onOverlayChange( setting.defaultValue )
							}
						>
							<ToggleControl
								label={ __(
									'Overlap divider on content',
									'snow-monkey-blocks'
								) }
								checked={ setting.overlayValue }
								onChange={ setting.onOverlayChange }
							/>
						</ToolsPanelItem>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</ToolsPanel>
	);
};

export const PanelSectionBackgroundTextSettings = ( { settings } ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<ToolsPanel label={ __( 'Background text', 'snow-monkey-blocks' ) }>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'textValue' ) &&
					setting.hasOwnProperty( 'onTextChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.textValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Text', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onTextChange( setting.defaultValue )
							}
						>
							<TextareaControl
								label={ __( 'Text', 'snow-monkey-blocks' ) }
								value={ setting.textValue }
								onChange={ setting.onTextChange }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'fontSizeValue' ) &&
					setting.hasOwnProperty( 'onFontSizeChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.fontSizeValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Size', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onFontSizeChange( setting.defaultValue )
							}
						>
							<FontSizePicker
								__nextHasNoMarginBottom={ true }
								value={ setting.fontSizeValue }
								onChange={ setting.onFontSizeChange }
								withReset={ false }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'lineHeightValue' ) &&
					setting.hasOwnProperty( 'onLineHeightChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.lineHeightValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Line height', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onLineHeightChange(
									setting.defaultValue
								)
							}
						>
							<RangeControl
								label={ __(
									'Line height',
									'snow-monkey-blocks'
								) }
								value={ setting.lineHeightValue }
								onChange={ setting.onLineHeightChange }
								min="0"
								max="5"
								step="0.1"
								initialPosition={ undefined }
								allowReset
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<div
							className="smb-color-gradient-settings-dropdown"
							key={ index }
						>
							<ColorGradientSettingsDropdown
								settings={ [
									{
										label: __(
											'Color',
											'snow-monkey-blocks'
										),
										colorValue: setting.colorValue,
										gradientValue: setting.gradientValue,
										onColorChange: setting.onColorChange,
										onGradientChange:
											setting.onGradientChange,
									},
								] }
								__experimentalIsRenderedInSidebar
								{ ...multipleOriginColorsAndGradients }
							/>
						</div>
					);
				}

				if (
					setting.hasOwnProperty( 'opacityValue' ) &&
					setting.hasOwnProperty( 'onOpacityChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.opacityValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onOpacityChange( setting.defaultValue )
							}
						>
							<RangeControl
								label={ __( 'Opacity', 'snow-monkey-blocks' ) }
								value={ Number(
									setting.opacityValue.toFixed( 1 )
								) }
								onChange={ setting.onOpacityChange }
								min={ 0.1 }
								max={ 1 }
								step={ 0.1 }
							/>
						</ToolsPanelItem>
					);
				}

				if (
					setting.hasOwnProperty( 'positionValue' ) &&
					setting.hasOwnProperty( 'onPositionChange' ) &&
					setting.hasOwnProperty( 'defaultValue' )
				) {
					return (
						<ToolsPanelItem
							key={ index }
							hasValue={ () =>
								setting.positionValue !== setting.defaultValue
							}
							isShownByDefault
							label={ __( 'Position', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setting.onPositionChange( setting.defaultValue )
							}
						>
							<SpacingControl
								label={ __( 'Position', 'snow-monkey-blocks' ) }
								values={ setting.positionValue }
								onChange={ setting.onPositionChange }
							/>
						</ToolsPanelItem>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</ToolsPanel>
	);
};

export const generateStylesForSectionBackground = ( {
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
} ) => {
	const hasBackgroundColor = !! backgroundColor || !! backgroundGradientColor;
	const hasBackgroundTexture = !! backgroundTexture;
	const hasFixedBackgroundTexture = !! fixedBackgroundTexture;

	const styles = {};
	if ( hasBackgroundColor ) {
		styles[ '--smb-section--background-color' ] = backgroundColor;
		styles[ '--smb-section--background-image' ] = backgroundGradientColor;

		if ( ! isBackgroundNoOver ) {
			if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
				styles[ '--smb-section--background-transform' ] = `translate(${
					backgroundHorizontalPosition || 0
				}%, ${ backgroundVerticalPosition || 0 }%)`;
			}
		} else {
			if ( 0 < backgroundHorizontalPosition ) {
				styles[ '--smb-section--background-left' ] = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			} else if ( 0 > backgroundHorizontalPosition ) {
				styles[ '--smb-section--background-right' ] = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			}

			if ( 0 < backgroundVerticalPosition ) {
				styles[ '--smb-section--background-top' ] = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			} else if ( 0 > backgroundVerticalPosition ) {
				styles[ '--smb-section--background-bottom' ] = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			}
		}
	}

	if ( !! backgroundTextureUrl ) {
		/* eslint-disable no-nested-ternary */
		styles[ '--smb-section--background-texture-image' ] =
			hasBackgroundTexture
				? !! backgroundTextureUrl
					? `url(${ backgroundTextureUrl })`
					: `url(${ smb.pluginUrl }/dist/blocks/section/img/${ backgroundTexture }.png)`
				: undefined;
		/* eslint-enable */
		styles[ '--smb-section--background-texture-opacity' ] =
			!! backgroundTextureOpacity
				? String( backgroundTextureOpacity )
				: undefined;
	}

	styles[ '--smb-section--fixed-background-color' ] = !! fixedBackgroundColor
		? fixedBackgroundColor
		: undefined;
	styles[ '--smb-section--fixed-background-image' ] =
		!! fixedBackgroundGradientColor
			? fixedBackgroundGradientColor
			: undefined;

	if ( !! fixedBackgroundTextureUrl ) {
		/* eslint-disable no-nested-ternary */
		styles[ '--smb-section--fixed-background-texture-image' ] =
			hasFixedBackgroundTexture
				? !! fixedBackgroundTextureUrl
					? `url(${ fixedBackgroundTextureUrl })`
					: `url(${ smb.pluginUrl }/dist/blocks/section/img/${ fixedBackgroundTexture }.png)`
				: undefined;
		/* eslint-enable */
		styles[ '--smb-section--fixed-background-texture-opacity' ] =
			!! fixedBackgroundTextureOpacity
				? String( fixedBackgroundTextureOpacity )
				: undefined;
	}

	styles[ '--smb-section--dividers-top' ] = !! topDividerVerticalPosition
		? `${ topDividerVerticalPosition }%`
		: undefined;
	styles[ '--smb-section--top-divider-level' ] = !! topDividerLevel
		? `${ topDividerLevel }px`
		: undefined;
	styles[ '--smb-section--dividers-bottom' ] =
		!! bottomDividerVerticalPosition
			? `${ bottomDividerVerticalPosition }%`
			: undefined;
	styles[ '--smb-section--bottom-divider-level' ] = !! bottomDividerLevel
		? `${ bottomDividerLevel }px`
		: undefined;

	if ( !! backgroundText?.text ) {
		styles[ '--smb-section--background-text-color' ] =
			!! backgroundText?.color ? backgroundText.color : undefined;
		styles[ '--smb-section--background-text-opacity' ] =
			!! backgroundText?.opacity
				? String( backgroundText.opacity )
				: undefined;
		styles[ '--smb-section--background-text-font-size' ] =
			!! backgroundText?.fontSize && ! backgroundText?.fontSizeSlug
				? backgroundText.fontSize
				: undefined;
		styles[ '--smb-section--background-line-height' ] =
			!! backgroundText?.lineHeight
				? backgroundText.lineHeight
				: undefined;
		styles[ '--smb-section--background-text-top' ] = !! backgroundText
			?.position?.top
			? backgroundText.position.top
			: undefined;
		styles[ '--smb-section--background-text-right' ] = !! backgroundText
			?.position?.right
			? backgroundText.position.right
			: undefined;
		styles[ '--smb-section--background-text-bottom' ] = !! backgroundText
			?.position?.bottom
			? backgroundText.position.bottom
			: undefined;
		styles[ '--smb-section--background-text-left' ] = !! backgroundText
			?.position?.left
			? backgroundText.position.left
			: undefined;
	}

	return styles;
};

export const SectionBackground = ( {
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
} ) => {
	const hasBackgroundColor = !! backgroundColor || !! backgroundGradientColor;
	const hasBackgroundTexture = !! backgroundTexture;
	const hasFixedBackgroundColor =
		!! fixedBackgroundColor || !! fixedBackgroundGradientColor;
	const hasFixedBackgroundTexture = !! fixedBackgroundTexture;
	const hasTopDivider = !! topDividerLevel;
	const hasBottomDivider = !! bottomDividerLevel;
	const hasBackgroundText = !! backgroundText?.text;

	const topDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--top',
		`smb-section__divider--${ topDividerType }`
	);

	const bottomDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--bottom',
		`smb-section__divider--${ bottomDividerType }`
	);

	return (
		<>
			{ ( hasFixedBackgroundColor ||
				hasFixedBackgroundTexture ||
				hasBackgroundColor ||
				hasBackgroundTexture ||
				hasTopDivider ||
				hasBottomDivider ||
				hasBackgroundText ) && (
				<div
					className="smb-section__fixed-background"
					// style={ fixedBackgroundStyles }
				>
					{ hasFixedBackgroundTexture && (
						<div className="smb-section__fixed-background__texture" />
					) }
					{ ( hasBackgroundColor || hasBackgroundTexture ) && (
						<div className="smb-section__background">
							{ hasBackgroundTexture && (
								<div className="smb-section__background__texture" />
							) }
						</div>
					) }
					{ hasBackgroundText && (
						<div
							className="smb-section__background-text"
							aria-hidden="true"
						>
							<div className={ containerClasses }>
								<div className="smb-section__background-text__inner">
									<div
										className={ classnames(
											'smb-section__background-text__text',
											{
												[ `has-${ backgroundText?.fontSizeSlug.replace(
													/(\d+?)([^-])/,
													'$1-$2'
												) }-font-size` ]:
													!! backgroundText?.fontSizeSlug,
											}
										) }
									>
										<RichText.Content
											value={ backgroundText.text?.replace(
												/\n/g,
												'<br>'
											) }
										/>
									</div>
								</div>
							</div>
						</div>
					) }
					{ ( hasTopDivider || hasBottomDivider ) && (
						<div className="smb-section__dividers">
							{ hasTopDivider && (
								<div className={ topDividerClasses }>
									{ divider(
										topDividerType,
										topDividerLevel,
										topDividerColor
									) }
								</div>
							) }

							{ hasBottomDivider && (
								<div className={ bottomDividerClasses }>
									{ divider(
										bottomDividerType,
										bottomDividerLevel,
										bottomDividerColor
									) }
								</div>
							) }
						</div>
					) }
				</div>
			) }
		</>
	);
};
