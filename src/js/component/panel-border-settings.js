import { BaseControl, PanelBody, RangeControl } from '@wordpress/components';

import { __experimentalColorGradientControl as ColorGradientControl } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { useMultipleOriginColorsAndGradients } from '@smb/hooks';

export default function ( { settings } ) {
	return (
		<PanelBody
			title={ __( 'Border', 'snow-monkey-blocks' ) }
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
						setting.hasOwnProperty( 'widthValue' ) &&
						setting.hasOwnProperty( 'onWidthChange' )
					) {
						return (
							<RangeControl
								key={ index }
								label={ __( 'Width', 'snow-monkey-blocks' ) }
								value={ Number(
									setting.widthValue.toFixed( 1 )
								) }
								onChange={ setting.onWidthChange }
								min={ 0 }
								max={ 5 }
							/>
						);
					}

					if (
						setting.hasOwnProperty( 'radiusValue' ) &&
						setting.hasOwnProperty( 'onRadiusChange' )
					) {
						return (
							<RangeControl
								key={ index }
								label={ __( 'Radius', 'snow-monkey-blocks' ) }
								value={ Number(
									setting.radiusValue.toFixed( 1 )
								) }
								onChange={ setting.onRadiusChange }
								min={ 0 }
								max={ 50 }
							/>
						);
					}

					return <Fragment key={ index }></Fragment>;
				} ) }
			</BaseControl>
		</PanelBody>
	);
}
