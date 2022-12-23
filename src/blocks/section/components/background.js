import classnames from 'classnames';

import {
	FontSizePicker,
	RichText,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	TextareaControl,
} from '@wordpress/components';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { divider } from '@smb/helper';
import SpacingControl from '@smb/component/spacing-control';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

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
		<PanelBody
			title={ __( 'Background (Movable) ', 'snow-monkey-blocks' ) }
			initialOpen={ false }
		>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'gradientValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'onGradientChange' )
				) {
					return (
						<ColorGradientControl
							key={ index }
							className="smb-inpanel-color-gradient-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }
							colorValue={ setting.colorValue }
							gradientValue={ setting.gradientValue }
							onColorChange={ setting.onColorChange }
							onGradientChange={ setting.onGradientChange }
							{ ...multipleOriginColorsAndGradients }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					);
				}

				if ( hasColor ) {
					if (
						setting.hasOwnProperty( 'horizontalPositionValue' ) &&
						setting.hasOwnProperty( 'onHorizontalPositionChange' )
					) {
						return (
							<RangeControl
								key={ index }
								label={ __(
									'Background position (Left / Right)',
									'snow-monkey-blocks'
								) }
								value={ setting.horizontalPositionValue }
								onChange={ setting.onHorizontalPositionChange }
								min="-90"
								max="90"
							/>
						);
					}

					if (
						setting.hasOwnProperty( 'verticalPositionValue' ) &&
						setting.hasOwnProperty( 'onVerticalPositionChange' )
					) {
						return (
							<RangeControl
								key={ index }
								label={ __(
									'Background Position (Top / Bottom)',
									'snow-monkey-blocks'
								) }
								value={ setting.verticalPositionValue }
								onChange={ setting.onVerticalPositionChange }
								min="-90"
								max="90"
							/>
						);
					}

					if (
						! disableNoOver &&
						setting.hasOwnProperty( 'isNoOverValue' ) &&
						setting.hasOwnProperty( 'onIsNoOverChange' )
					) {
						return (
							<ToggleControl
								key={ index }
								label={ __(
									"Make sure the background doesn't overflow to the outside",
									'snow-monkey-blocks'
								) }
								checked={ setting.isNoOverValue }
								onChange={ setting.onIsNoOverChange }
							/>
						);
					}

					if (
						setting.hasOwnProperty( 'textureValue' ) &&
						setting.hasOwnProperty( 'onTextureChange' )
					) {
						return (
							<SelectControl
								key={ index }
								label={ __( 'Texture', 'snow-monkey-blocks' ) }
								value={ setting.textureValue }
								onChange={ setting.onTextureChange }
								options={ textureOptions }
							/>
						);
					}

					if (
						hasTexture &&
						setting.hasOwnProperty( 'textureOpacityValue' ) &&
						setting.hasOwnProperty( 'onTextureOpacityChange' )
					) {
						return (
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
						);
					}
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</PanelBody>
	);
};

export const PanelSectionFixedBackgroundSettings = ( {
	hasTexture,
	settings,
} ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<PanelBody
			title={ __( 'Background (Fixed) ', 'snow-monkey-blocks' ) }
			initialOpen={ false }
		>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'gradientValue' ) &&
					setting.hasOwnProperty( 'onColorChange' ) &&
					setting.hasOwnProperty( 'onGradientChange' )
				) {
					return (
						<ColorGradientControl
							key={ index }
							className="smb-inpanel-color-gradient-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }
							colorValue={ setting.colorValue }
							gradientValue={ setting.gradientValue }
							onColorChange={ setting.onColorChange }
							onGradientChange={ setting.onGradientChange }
							{ ...multipleOriginColorsAndGradients }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'textureValue' ) &&
					setting.hasOwnProperty( 'onTextureChange' )
				) {
					return (
						<SelectControl
							key={ index }
							label={ __( 'Texture', 'snow-monkey-blocks' ) }
							value={ setting.textureValue }
							onChange={ setting.onTextureChange }
							options={ textureOptions }
						/>
					);
				}

				if (
					hasTexture &&
					setting.hasOwnProperty( 'textureOpacityValue' ) &&
					setting.hasOwnProperty( 'onTextureOpacityChange' )
				) {
					return (
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
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</PanelBody>
	);
};

export const PanelSectionTopDividerSettings = ( { settings } ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<PanelBody
			title={ __( 'Top divider', 'snow-monkey-blocks' ) }
			initialOpen={ false }
		>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'typeValue' ) &&
					setting.hasOwnProperty( 'onTypeChange' )
				) {
					return (
						<SelectControl
							key={ index }
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ setting.typeValue }
							onChange={ setting.onTypeChange }
							options={ dividerTypeOptions }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'levelValue' ) &&
					setting.hasOwnProperty( 'onLevelChange' )
				) {
					return (
						<RangeControl
							key={ index }
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ setting.levelValue }
							onChange={ setting.onLevelChange }
							min="-100"
							max="100"
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'onColorChange' )
				) {
					return (
						<ColorGradientControl
							key={ index }
							className="smb-inpanel-color-gradient-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }
							colorValue={ setting.colorValue }
							onColorChange={ setting.onColorChange }
							{ ...multipleOriginColorsAndGradients }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'verticalPosition' ) &&
					setting.hasOwnProperty( 'onVerticalPositionChange' )
				) {
					return (
						<RangeControl
							key={ index }
							label={ __(
								'Position (Top / Bottom)',
								'snow-monkey-blocks'
							) }
							value={ setting.verticalPosition }
							onChange={ setting.onVerticalPositionChange }
							min="-90"
							max="90"
						/>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</PanelBody>
	);
};

export const PanelSectionBottomDividerSettings = ( { settings } ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<PanelBody
			title={ __( 'Bottom divider', 'snow-monkey-blocks' ) }
			initialOpen={ false }
		>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'typeValue' ) &&
					setting.hasOwnProperty( 'onTypeChange' )
				) {
					return (
						<SelectControl
							key={ index }
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ setting.typeValue }
							onChange={ setting.onTypeChange }
							options={ dividerTypeOptions }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'levelValue' ) &&
					setting.hasOwnProperty( 'onLevelChange' )
				) {
					return (
						<RangeControl
							key={ index }
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ setting.levelValue }
							onChange={ setting.onLevelChange }
							min="-100"
							max="100"
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'onColorChange' )
				) {
					return (
						<ColorGradientControl
							key={ index }
							className="smb-inpanel-color-gradient-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }
							colorValue={ setting.colorValue }
							onColorChange={ setting.onColorChange }
							{ ...multipleOriginColorsAndGradients }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'verticalPositionValue' ) &&
					setting.hasOwnProperty( 'onVerticalPositionChange' )
				) {
					return (
						<RangeControl
							key={ index }
							label={ __(
								'Position (Top / Bottom)',
								'snow-monkey-blocks'
							) }
							value={ setting.verticalPositionValue }
							onChange={ setting.onVerticalPositionChange }
							min="-90"
							max="90"
						/>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</PanelBody>
	);
};

export const PanelSectionBackgroundTextSettings = ( { settings } ) => {
	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	return (
		<PanelBody
			title={ __( 'Background text', 'snow-monkey-blocks' ) }
			initialOpen={ false }
		>
			{ settings.map( ( setting, index ) => {
				if (
					setting.hasOwnProperty( 'textValue' ) &&
					setting.hasOwnProperty( 'onTextChange' )
				) {
					return (
						<TextareaControl
							key={ index }
							label={ __( 'Text', 'snow-monkey-blocks' ) }
							value={ setting.textValue }
							onChange={ setting.onTextChange }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'fontSizeValue' ) &&
					setting.hasOwnProperty( 'onFontSizeChange' )
				) {
					return (
						<FontSizePicker
							key={ index }
							value={ setting.fontSizeValue }
							onChange={ setting.onFontSizeChange }
							withReset={ false }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'lineHeightValue' ) &&
					setting.hasOwnProperty( 'onLineHeightChange' )
				) {
					return (
						<RangeControl
							key={ index }
							label={ __( 'Line height', 'snow-monkey-blocks' ) }
							value={ setting.lineHeightValue }
							onChange={ setting.onLineHeightChange }
							min="0"
							max="5"
							step="0.1"
							initialPosition={ undefined }
							allowReset
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'colorValue' ) &&
					setting.hasOwnProperty( 'onColorChange' )
				) {
					return (
						<ColorGradientControl
							key={ index }
							className="smb-inpanel-color-gradient-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }
							colorValue={ setting.colorValue }
							onColorChange={ setting.onColorChange }
							{ ...multipleOriginColorsAndGradients }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'opacityValue' ) &&
					setting.hasOwnProperty( 'onOpacityChange' )
				) {
					return (
						<RangeControl
							key={ index }
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							value={ Number(
								setting.opacityValue.toFixed( 1 )
							) }
							onChange={ setting.onOpacityChange }
							min={ 0.1 }
							max={ 1 }
							step={ 0.1 }
						/>
					);
				}

				if (
					setting.hasOwnProperty( 'positionValue' ) &&
					setting.hasOwnProperty( 'onPositionChange' )
				) {
					return (
						<SpacingControl
							key={ index }
							label={ __( 'Position', 'snow-monkey-blocks' ) }
							values={ setting.positionValue }
							onChange={ setting.onPositionChange }
						/>
					);
				}

				return <Fragment key={ index }></Fragment>;
			} ) }
		</PanelBody>
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
	bottomDividerVerticalPosition,
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

	/* eslint-disable no-nested-ternary */
	styles[ '--smb-section--background-texture-image' ] = hasBackgroundTexture
		? !! backgroundTextureUrl
			? `url(${ backgroundTextureUrl })`
			: `url(${ smb.pluginUrl }/dist/blocks/section/img/${ backgroundTexture }.png)`
		: undefined;
	/* eslint-enable */
	styles[ '--smb-section--background-texture-opacity' ] =
		!! backgroundTextureOpacity
			? String( backgroundTextureOpacity )
			: undefined;

	styles[ '--smb-section--fixed-background-color' ] = !! fixedBackgroundColor
		? fixedBackgroundColor
		: undefined;
	styles[ '--smb-section--fixed-background-image' ] =
		!! fixedBackgroundGradientColor
			? fixedBackgroundGradientColor
			: undefined;

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

	styles[ '--smb-section--dividers-top' ] = !! topDividerVerticalPosition
		? `${ topDividerVerticalPosition }%`
		: undefined;
	styles[ '--smb-section--dividers-bottom' ] =
		!! bottomDividerVerticalPosition
			? `${ bottomDividerVerticalPosition }%`
			: undefined;

	styles[ '--smb-section--background-text-color' ] = !! backgroundText?.color
		? backgroundText.color
		: undefined;
	styles[ '--smb-section--background-text-opacity' ] =
		!! backgroundText?.opacity && 1 > backgroundText.opacity
			? String( backgroundText.opacity )
			: undefined;
	styles[ '--smb-section--background-text-font-size' ] =
		!! backgroundText?.fontSize && ! backgroundText?.fontSizeSlug
			? backgroundText.fontSize
			: undefined;
	styles[ '--smb-section--background-line-height' ] =
		!! backgroundText?.lineHeight ? backgroundText.lineHeight : undefined;
	styles[ '--smb-section--background-text-top' ] = !! backgroundText?.position
		?.top
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

	const fixedBackgroundStyles = {
		paddingTop: !! topDividerLevel ? Math.abs( topDividerLevel ) : 0,
		paddingBottom: !! bottomDividerLevel
			? Math.abs( bottomDividerLevel )
			: 0,
	};

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
					style={ fixedBackgroundStyles }
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
												[ `has-${ backgroundText?.fontSizeSlug }-font-size` ]:
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
