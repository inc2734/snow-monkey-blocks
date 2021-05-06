import classnames from 'classnames';

import {
	ContrastChecker,
	InspectorControls,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

export default function ( { attributes, setAttributes, className } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		textColor,
		borderWidth,
		opacity,
	} = attributes;

	const boxStyles = {
		color: textColor || undefined,
	};

	const backgroundStyles = {
		backgroundColor: backgroundColor || undefined,
		backgroundImage: backgroundGradientColor || undefined,
		borderColor: borderColor || undefined,
		borderWidth: borderWidth || undefined,
		opacity,
	};

	const classes = classnames( 'smb-box', className );

	const blockProps = useBlockProps( {
		className: classes,
		style: boxStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-box__body',
	} );

	const onChangeBorderWidth = ( value ) =>
		setAttributes( {
			borderWidth: toNumber( value, 1, 5 ),
		} );

	const onChangeOpacity = ( value ) =>
		setAttributes( {
			opacity: toNumber( value, 0, 1 ),
		} );

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeBackgroundGradientColor = ( value ) =>
		setAttributes( {
			backgroundGradientColor: value,
		} );

	const onChangeBorderColor = ( value ) =>
		setAttributes( {
			borderColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ backgroundColor }
						gradientValue={ backgroundGradientColor }
						onColorChange={ onChangeBackgroundColor }
						onGradientChange={ onChangeBackgroundGradientColor }
					/>

					<RangeControl
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						value={ opacity }
						onChange={ onChangeOpacity }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Border Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ borderColor }
						onColorChange={ onChangeBorderColor }
					/>

					<RangeControl
						label={ __( 'Width', 'snow-monkey-blocks' ) }
						value={ borderWidth }
						onChange={ onChangeBorderWidth }
						min="1"
						max="5"
					/>
				</PanelBody>

				<PanelColorGradientSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="smb-box__background"
					style={ backgroundStyles }
				/>

				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
