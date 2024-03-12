import {
	RangeControl,
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

export default function ( { settings, label } ) {
	const values = {};
	const onChanges = {};

	const components = settings.map( ( setting, index ) => {
		if (
			setting.hasOwnProperty( 'colorValue' ) &&
			setting.hasOwnProperty( 'onColorChange' )
		) {
			values.color = setting.colorValue;
			onChanges.color = setting.onColorChange;

			const multipleOriginColorsAndGradients =
				useMultipleOriginColorsAndGradients();
			multipleOriginColorsAndGradients.colors =
				multipleOriginColorsAndGradients.colors
					.map( ( originColorsAndGradient ) => {
						const colors = originColorsAndGradient.colors.filter(
							( color ) => {
								return ! color.color.match( /^var\(/ );
							}
						);
						if ( 1 > colors.length ) {
							return false;
						}
						originColorsAndGradient.colors = colors;
						return originColorsAndGradient;
					} )
					.filter( Boolean );

			return (
				<div
					className="smb-color-gradient-settings-dropdown"
					key={ index }
				>
					<ColorGradientSettingsDropdown
						settings={ [
							{
								label: __( 'Color', 'snow-monkey-blocks' ),
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
			setting.hasOwnProperty( 'opacityValue' ) &&
			setting.hasOwnProperty( 'onOpacityChange' )
		) {
			values.opacity = setting.opacityValue;
			onChanges.opacity = setting.onOpacityChange;

			return (
				<RangeControl
					key={ index }
					label={ __( 'Opacity', 'snow-monkey-blocks' ) }
					value={ Number( setting.opacityValue.toFixed( 1 ) ) }
					onChange={ setting.onOpacityChange }
					min={ 0 }
					max={ 1 }
					step={ 0.1 }
				/>
			);
		}

		if (
			setting.hasOwnProperty( 'horizontalValue' ) &&
			setting.hasOwnProperty( 'onHorizontalChange' )
		) {
			values.horizontal = setting.horizontalValue;
			onChanges.horizontal = setting.onHorizontalChange;

			return (
				<RangeControl
					key={ index }
					label={ __( 'Horizontal', 'snow-monkey-blocks' ) }
					value={ setting.horizontalValue }
					onChange={ setting.onHorizontalChange }
					min={ setting?.min ?? -100 }
					max={ setting?.max ?? 100 }
				/>
			);
		}

		if (
			setting.hasOwnProperty( 'verticalValue' ) &&
			setting.hasOwnProperty( 'onVerticalChange' )
		) {
			values.vertical = setting.verticalValue;
			onChanges.vertical = setting.onVerticalChange;

			return (
				<RangeControl
					key={ index }
					label={ __( 'Vertical', 'snow-monkey-blocks' ) }
					value={ setting.verticalValue }
					onChange={ setting.onVerticalChange }
					min={ setting?.min ?? -100 }
					max={ setting?.max ?? 100 }
				/>
			);
		}

		if (
			setting.hasOwnProperty( 'blurValue' ) &&
			setting.hasOwnProperty( 'onBlurChange' )
		) {
			values.blur = setting.blurValue;
			onChanges.blur = setting.onBlurChange;

			return (
				<RangeControl
					key={ index }
					label={ __( 'Blur', 'snow-monkey-blocks' ) }
					value={ setting.blurValue }
					onChange={ setting.onBlurChange }
					min={ setting?.min ?? 0 }
					max={ setting?.max ?? 100 }
				/>
			);
		}

		if (
			setting.hasOwnProperty( 'spreadValue' ) &&
			setting.hasOwnProperty( 'onSpreadChange' )
		) {
			values.spread = setting.spreadValue;
			onChanges.spread = setting.onSpreadChange;

			return (
				<RangeControl
					key={ index }
					label={ __( 'Spread', 'snow-monkey-blocks' ) }
					value={ setting.spreadValue }
					onChange={ setting.onSpreadChange }
					min={ setting?.min ?? -100 }
					max={ setting?.max ?? 100 }
				/>
			);
		}

		if (
			setting.hasOwnProperty( 'positionValue' ) &&
			setting.hasOwnProperty( 'onPositionChange' )
		) {
			values.position = setting.positionValue;
			onChanges.position = setting.onPositionChange;

			return (
				<SelectControl
					key={ index }
					label={ __( 'Position', 'snow-monkey-blocks' ) }
					value={ setting.positionValue }
					onChange={ setting.onPositionChange }
					options={ [
						{
							value: '',
							label: __( 'Outline', 'snow-monkey-blocks' ),
						},
						{
							value: 'inset',
							label: __( 'Inset', 'snow-monkey-blocks' ),
						},
					] }
				/>
			);
		}

		return <Fragment key={ index }></Fragment>;
	} );

	return (
		<ToolsPanel
			label={ label || __( 'Box Shadow', 'snow-monkey-blocks' ) }
			className="smb-box-shadow-tools-panel"
		>
			<ToolsPanelItem
				label={ label || __( 'Box Shadow', 'snow-monkey-blocks' ) }
				hasValue={ () => {
					return settings.some( ( setting ) => {
						if ( setting.hasOwnProperty( 'defaultValue' ) ) {
							let value;
							if ( setting.hasOwnProperty( 'opacityValue' ) ) {
								value = setting.opacityValue;
							} else if (
								setting.hasOwnProperty( 'horizontalValue' )
							) {
								value = setting.horizontalValue;
							} else if (
								setting.hasOwnProperty( 'verticalValue' )
							) {
								value = setting.verticalValue;
							} else if (
								setting.hasOwnProperty( 'blurValue' )
							) {
								value = setting.blurValue;
							} else if (
								setting.hasOwnProperty( 'spreadValue' )
							) {
								value = setting.spreadValue;
							} else if (
								setting.hasOwnProperty( 'positionValue' )
							) {
								value = setting.positionValue;
							}

							if ( 'undefined' !== typeof value ) {
								return setting.defaultValue !== value;
							}
							return false;
						}
						return false;
					} );
				} }
				isShownByDefault
				onDeselect={ () => {
					settings.forEach( ( setting ) => {
						if ( setting.hasOwnProperty( 'defaultValue' ) ) {
							let onChange;
							if ( setting.hasOwnProperty( 'onOpacityChange' ) ) {
								onChange = setting.onOpacityChange;
							} else if (
								setting.hasOwnProperty( 'onHorizontalChange' )
							) {
								onChange = setting.onHorizontalChange;
							} else if (
								setting.hasOwnProperty( 'onVerticalChange' )
							) {
								onChange = setting.onVerticalChange;
							} else if (
								setting.hasOwnProperty( 'onBlurChange' )
							) {
								onChange = setting.onBlurChange;
							} else if (
								setting.hasOwnProperty( 'onSpreadChange' )
							) {
								onChange = setting.onSpreadChange;
							} else if (
								setting.hasOwnProperty( 'onPositionChange' )
							) {
								onChange = setting.onPositionChange;
							}

							if ( 'undefined' !== typeof onChange ) {
								onChange( setting.defaultValue );
							}
						}
					} );
				} }
			>
				{ components }
			</ToolsPanelItem>
		</ToolsPanel>
	);
}
