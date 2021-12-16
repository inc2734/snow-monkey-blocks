import classnames from 'classnames';

import {
	__experimentalColorGradientControl as ColorGradientControl,
	FontSizePicker,
	RichText,
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
import { useMultipleOriginColorsAndGradients } from '@smb/hooks';
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
];

export const PanelSectionMovableBackgroundSettings = ( {
	hasColor,
	disableNoOver,
	hasTexture,
	settings,
} ) => {
	const multipleOriginColorsAndGradients = useMultipleOriginColorsAndGradients();

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
	const multipleOriginColorsAndGradients = useMultipleOriginColorsAndGradients();

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
	const multipleOriginColorsAndGradients = useMultipleOriginColorsAndGradients();

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
	const multipleOriginColorsAndGradients = useMultipleOriginColorsAndGradients();

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
	const multipleOriginColorsAndGradients = useMultipleOriginColorsAndGradients();

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

export const SectionBackground = ( {
	backgroundHorizontalPosition,
	backgroundVerticalPosition,
	isBackgroundNoOver,
	backgroundColor,
	backgroundGradientColor,
	backgroundTexture,
	backgroundTextureOpacity,
	fixedBackgroundColor,
	fixedBackgroundGradientColor,
	fixedBackgroundTexture,
	fixedBackgroundTextureOpacity,
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

	const backgroundStyles = {};
	if ( hasBackgroundColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		backgroundStyles.backgroundImage = backgroundGradientColor;

		if ( ! isBackgroundNoOver ) {
			if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
				backgroundStyles.transform = `translate(${
					backgroundHorizontalPosition || 0
				}%, ${ backgroundVerticalPosition || 0 }%)`;
			}
		} else {
			if ( 0 < backgroundHorizontalPosition ) {
				backgroundStyles.left = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			} else if ( 0 > backgroundHorizontalPosition ) {
				backgroundStyles.right = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			}

			if ( 0 < backgroundVerticalPosition ) {
				backgroundStyles.top = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			} else if ( 0 > backgroundVerticalPosition ) {
				backgroundStyles.bottom = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			}
		}
	}

	const backgroundTextureStyles = {
		backgroundImage: hasBackgroundTexture
			? `url(${ smb.pluginUrl }/dist/block/section/img/${ backgroundTexture }.png)`
			: undefined,
		opacity: !! backgroundTextureOpacity
			? backgroundTextureOpacity
			: undefined,
	};

	const fixedBackgroundStyles = {
		paddingTop: !! topDividerLevel ? Math.abs( topDividerLevel ) : 0,
		paddingBottom: !! bottomDividerLevel
			? Math.abs( bottomDividerLevel )
			: 0,
		backgroundColor: !! fixedBackgroundColor
			? fixedBackgroundColor
			: undefined,
		backgroundImage: !! fixedBackgroundGradientColor
			? fixedBackgroundGradientColor
			: undefined,
	};

	const fixedBackgroundTextureStyles = {
		backgroundImage: hasFixedBackgroundTexture
			? `url(${ smb.pluginUrl }/dist/block/section/img/${ fixedBackgroundTexture }.png)`
			: undefined,
		opacity: !! fixedBackgroundTextureOpacity
			? fixedBackgroundTextureOpacity
			: undefined,
	};

	const dividersStyles = {};
	if ( topDividerVerticalPosition ) {
		dividersStyles.top = `${ topDividerVerticalPosition }%`;
	}
	if ( bottomDividerVerticalPosition ) {
		dividersStyles.bottom = `${ bottomDividerVerticalPosition }%`;
	}

	const backgroundTextStyles = {};
	backgroundTextStyles.color = !! backgroundText?.color
		? backgroundText.color
		: undefined;
	backgroundTextStyles.opacity =
		!! backgroundText?.opacity && 1 > backgroundText.opacity
			? backgroundText.opacity
			: undefined;
	backgroundTextStyles.fontSize =
		!! backgroundText?.fontSize && ! backgroundText?.fontSizeSlug
			? backgroundText.fontSize
			: undefined;
	backgroundTextStyles.lineHeight = !! backgroundText?.lineHeight
		? backgroundText.lineHeight
		: undefined;
	backgroundTextStyles.top = !! backgroundText?.position?.top
		? backgroundText.position.top
		: undefined;
	backgroundTextStyles.right = !! backgroundText?.position?.right
		? backgroundText.position.right
		: undefined;
	backgroundTextStyles.bottom = !! backgroundText?.position?.bottom
		? backgroundText.position.bottom
		: undefined;
	backgroundTextStyles.left = !! backgroundText?.position?.left
		? backgroundText.position.left
		: undefined;

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
						<div
							className="smb-section__fixed-background__texture"
							style={ fixedBackgroundTextureStyles }
						/>
					) }
					{ ( hasBackgroundColor || hasBackgroundTexture ) && (
						<div
							className="smb-section__background"
							style={ backgroundStyles }
						>
							{ hasBackgroundTexture && (
								<div
									className="smb-section__background__texture"
									style={ backgroundTextureStyles }
								/>
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
												[ `has-${ backgroundText?.fontSizeSlug }-font-size` ]: !! backgroundText?.fontSizeSlug,
											}
										) }
										style={ backgroundTextStyles }
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
						<div
							className="smb-section__dividers"
							style={ dividersStyles }
						>
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
