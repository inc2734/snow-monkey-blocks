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

import { __ } from '@wordpress/i18n';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

export default function ( { settings, label } ) {
	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	const component = ( setting, index ) => {
		if (
			setting.hasOwnProperty( 'colorValue' ) &&
			setting.hasOwnProperty( 'onColorChange' ) &&
			setting.hasOwnProperty( 'defaultValue' )
		) {
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
								resetAllFilter: () => {
									console.log( 'Color reset All' );
									setting.onColorChange(
										setting.defaultValue
									);
								},
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
					label={ __( 'Opacity', 'snow-monkey-blocks' ) }
					hasValue={ () =>
						setting.opacityValue !== setting.defaultValue
					}
					isShownByDefault
					onDeselect={ () =>
						setting.onOpacityChange( setting.defaultValue )
					}
					resetAllFilter={ () =>
						setting.onOpacityChange( setting.defaultValue )
					}
					key={ index }
				>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						value={ Number( setting.opacityValue.toFixed( 1 ) ) }
						onChange={ setting.onOpacityChange }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
				</ToolsPanelItem>
			);
		}

		if (
			setting.hasOwnProperty( 'horizontalValue' ) &&
			setting.hasOwnProperty( 'onHorizontalChange' ) &&
			setting.hasOwnProperty( 'defaultValue' )
		) {
			return (
				<ToolsPanelItem
					label={ __( 'Horizontal', 'snow-monkey-blocks' ) }
					hasValue={ () =>
						setting.horizontalValue !== setting.defaultValue
					}
					isShownByDefault
					onDeselect={ () =>
						setting.onHorizontalChange( setting.defaultValue )
					}
					resetAllFilter={ () =>
						setting.onHorizontalChange( setting.defaultValue )
					}
					key={ index }
				>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Horizontal', 'snow-monkey-blocks' ) }
						value={ setting.horizontalValue }
						onChange={ setting.onHorizontalChange }
						min={ setting?.min ?? -100 }
						max={ setting?.max ?? 100 }
					/>
				</ToolsPanelItem>
			);
		}

		if (
			setting.hasOwnProperty( 'verticalValue' ) &&
			setting.hasOwnProperty( 'onVerticalChange' ) &&
			setting.hasOwnProperty( 'defaultValue' )
		) {
			return (
				<ToolsPanelItem
					label={ __( 'Vertical', 'snow-monkey-blocks' ) }
					hasValue={ () =>
						setting.verticalValue !== setting.defaultValue
					}
					isShownByDefault
					onDeselect={ () =>
						setting.onVerticalChange( setting.defaultValue )
					}
					resetAllFilter={ () =>
						setting.onVerticalChange( setting.defaultValue )
					}
					key={ index }
				>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Vertical', 'snow-monkey-blocks' ) }
						value={ setting.verticalValue }
						onChange={ setting.onVerticalChange }
						min={ setting?.min ?? -100 }
						max={ setting?.max ?? 100 }
					/>
				</ToolsPanelItem>
			);
		}

		if (
			setting.hasOwnProperty( 'blurValue' ) &&
			setting.hasOwnProperty( 'onBlurChange' ) &&
			setting.hasOwnProperty( 'defaultValue' )
		) {
			return (
				<ToolsPanelItem
					label={ __( 'Blur', 'snow-monkey-blocks' ) }
					hasValue={ () =>
						setting.blurValue !== setting.defaultValue
					}
					isShownByDefault
					onDeselect={ () =>
						setting.onBlurChange( setting.defaultValue )
					}
					resetAllFilter={ () =>
						setting.onBlurChange( setting.defaultValue )
					}
					key={ index }
				>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Blur', 'snow-monkey-blocks' ) }
						value={ setting.blurValue }
						onChange={ setting.onBlurChange }
						min={ setting?.min ?? 0 }
						max={ setting?.max ?? 100 }
					/>
				</ToolsPanelItem>
			);
		}

		if (
			setting.hasOwnProperty( 'spreadValue' ) &&
			setting.hasOwnProperty( 'onSpreadChange' ) &&
			setting.hasOwnProperty( 'defaultValue' )
		) {
			return (
				<ToolsPanelItem
					label={ __( 'Spread', 'snow-monkey-blocks' ) }
					hasValue={ () =>
						setting.spreadValue !== setting.defaultValue
					}
					isShownByDefault
					onDeselect={ () =>
						setting.onSpreadChange( setting.defaultValue )
					}
					resetAllFilter={ () =>
						setting.onSpreadChange( setting.defaultValue )
					}
					key={ index }
				>
					<RangeControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Spread', 'snow-monkey-blocks' ) }
						value={ setting.spreadValue }
						onChange={ setting.onSpreadChange }
						min={ setting?.min ?? -100 }
						max={ setting?.max ?? 100 }
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
					label={ __( 'Position', 'snow-monkey-blocks' ) }
					hasValue={ () =>
						setting.positionValue !== setting.defaultValue
					}
					isShownByDefault
					onDeselect={ () =>
						setting.onPositionChange( setting.defaultValue )
					}
					resetAllFilter={ () =>
						setting.onPositionChange( setting.defaultValue )
					}
					key={ index }
				>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
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
				</ToolsPanelItem>
			);
		}

		return null;
	};

	return (
		<ToolsPanel
			label={ label || __( 'Box Shadow', 'snow-monkey-blocks' ) }
			className="smb-box-shadow-tools-panel"
			dropdownMenuProps={ dropdownMenuProps }
			resetAll={ ( filters ) => {
				console.log( filters );
				filters.forEach( ( filter ) => filter() );
			} }
		>
			{ settings.map( ( setting, index ) => {
				return component( setting, index );
			} ) }
		</ToolsPanel>
	);
}
