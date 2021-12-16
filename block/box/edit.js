import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	ContrastChecker,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import { PanelBody, RangeControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';
import { toNumber } from '@smb/helper';
import { useMultipleOriginColorsAndGradients } from '@smb/hooks';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
		contentPadding,
		boxShadow,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const boxStyles = {
		color: textColor || undefined,
		borderRadius: 0 <= borderRadius ? `${ borderRadius }px` : undefined,
		boxShadow: !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	const backgroundStyles = {
		backgroundColor: backgroundColor || undefined,
		backgroundImage: backgroundGradientColor || undefined,
		borderColor: borderColor || undefined,
		borderWidth: borderWidth || undefined,
		borderRadius: 0 <= borderRadius ? `${ borderRadius }px` : undefined,
		opacity,
	};

	const classes = classnames( 'smb-box', className, {
		[ `smb-box--p-${ contentPadding }` ]: !! contentPadding,
	} );

	const blockProps = useBlockProps( {
		className: classes,
		style: boxStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-box__body',
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeBorderWidth = ( value ) =>
		setAttributes( {
			borderWidth: toNumber( value, 0, 5 ),
		} );

	const onChangeBorderRadius = ( value ) =>
		setAttributes( {
			borderRadius: !! value || 0 <= value ? value : undefined,
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

	const onChangeContentPadding = ( value ) =>
		setAttributes( {
			contentPadding: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				>
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ textColor }
					/>
				</PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Border', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ borderColor }
						onColorChange={ onChangeBorderColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
					/>

					<RangeControl
						label={ __( 'Width', 'snow-monkey-blocks' ) }
						value={ borderWidth }
						onChange={ onChangeBorderWidth }
						min="0"
						max="5"
					/>

					<RangeControl
						label={ __( 'Border radius', 'snow-monkey-blocks' ) }
						help={ __(
							'-If set to -1, the default border radius will be applied.',
							'snow-monkey-blocks'
						) }
						value={ borderRadius }
						onChange={ onChangeBorderRadius }
						min="-1"
						max="50"
						initialPosition="-1"
						allowReset
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Dimensions', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						value={ contentPadding }
						options={ [
							{
								value: 's',
								label: __( 'S', 'snow-monkey-blocks' ),
							},
							{
								value: '',
								label: __( 'M', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( 'L', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentPadding }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Background', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ backgroundColor }
						gradientValue={ backgroundGradientColor }
						onColorChange={ onChangeBackgroundColor }
						onGradientChange={ onChangeBackgroundGradientColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
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

				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color,
							onColorChange: ( value ) => {
								const newBoxShadow = { ...boxShadow };
								newBoxShadow.color = value;
								setAttributes( { boxShadow: newBoxShadow } );
							},
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								const newBoxShadow = { ...boxShadow };
								newBoxShadow.opacity = value;
								setAttributes( { boxShadow: newBoxShadow } );
							},
						},
						{
							horizontalValue: boxShadow.horizontal,
							onHorizontalChange: ( value ) => {
								const newBoxShadow = { ...boxShadow };
								newBoxShadow.horizontal = value;
								setAttributes( { boxShadow: newBoxShadow } );
							},
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								const newBoxShadow = { ...boxShadow };
								newBoxShadow.blur = value;
								setAttributes( { boxShadow: newBoxShadow } );
							},
						},
						{
							spreadValue: boxShadow.spread,
							onSpreadChange: ( value ) => {
								const newBoxShadow = { ...boxShadow };
								newBoxShadow.spread = value;
								setAttributes( { boxShadow: newBoxShadow } );
							},
						},
					] }
				/>
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
