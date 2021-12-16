import {
	BaseControl,
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

import { __experimentalColorGradientControl as ColorGradientControl } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useMultipleOriginColorsAndGradients } from '@smb/hooks';

export default function ( { settings } ) {
	return (
		<PanelBody
			title={ __( 'Box Shadow', 'snow-monkey-blocks' ) }
			initialOpen={ false }
		>
			<BaseControl>
				{ settings.map( ( setting, index ) => {
					if (
						setting.hasOwnProperty( 'colorValue' ) &&
						setting.hasOwnProperty( 'onColorChange' )
					) {
						return (
							<ColorGradientControl
								key={ index }
								label={ __( 'Color', 'snow-monkey-blocks' ) }
								disableAlpha={ false }
								colorValue={ setting.colorValue }
								onColorChange={ setting.onColorChange }
								{ ...useMultipleOriginColorsAndGradients() }
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
						return (
							<RangeControl
								key={ index }
								label={ __(
									'Horizontal',
									'snow-monkey-blocks'
								) }
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
						return (
							<SelectControl
								key={ index }
								label={ __( 'Position', 'snow-monkey-blocks' ) }
								value={ setting.positionValue }
								onChange={ setting.onPositionChange }
								options={ [
									{
										value: '',
										label: __(
											'Outline',
											'snow-monkey-blocks'
										),
									},
									{
										value: 'inset',
										label: __(
											'Inset',
											'snow-monkey-blocks'
										),
									},
								] }
							/>
						);
					}

					return <Fragment key={ index }></Fragment>;
				} ) }
			</BaseControl>
		</PanelBody>
	);
}
