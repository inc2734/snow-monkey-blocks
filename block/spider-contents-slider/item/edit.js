import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import PanelBorderSettings from '@smb/component/panel-border-settings';
import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const {
		sliderId,
		contentPosition,
		contentPadding,
		border,
		boxShadow,
		style,
		backgroundColor,
	} = attributes;

	const ref = useRef();

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	useEffect( () => {
		if ( isSelected ) {
			const thisSlider = ref.current.parentNode;
			const canvas = thisSlider.parentNode;
			const wrapper = canvas.parentNode.parentNode;
			const referenceWidth = wrapper.style
				.getPropertyValue( '--spider-reference-width' )
				?.replace( 'px', '' );
			const canvasWidth = wrapper.style
				.getPropertyValue( '--spider-canvas-width' )
				?.replace( 'px', '' );
			const diff = canvasWidth / 2 - referenceWidth / 2;
			const thisSliderLeft = thisSlider.getBoundingClientRect().left;
			const thisSliderRight = thisSliderLeft + thisSlider.offsetWidth;
			const canvasLeft = canvas.getBoundingClientRect().left;
			const canvasRight = canvasLeft + canvas.offsetWidth;
			if (
				canvasRight < thisSliderRight ||
				canvasLeft > thisSliderLeft
			) {
				canvas.scrollLeft = thisSlider.offsetLeft - diff;
			}
		}
	}, [ clientId, isSelected, sliderId ] );

	const classes = classnames( 'spider__slide', className );

	const itemClasses = classnames( 'smb-spider-contents-slider__item', {
		[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]: !! contentPadding,
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: itemClasses,
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const styles = {
		backgroundColor:
			( ! backgroundColor && style?.color?.background ) || undefined,
		background:
			( ! backgroundColor && style?.color?.gradient ) || undefined,
		borderColor: border.color || undefined,
		borderWidth: ( border.color && border.width ) || undefined,
		borderRadius: border.radius || undefined,
		boxShadow: !! boxShadow.color
			? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	const onChangeContentPadding = ( value ) =>
		setAttributes( {
			contentPadding: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBorderSettings
					settings={ [
						{
							colorValue: border.color,
							onColorChange: ( value ) => {
								const newBorder = { ...border };
								newBorder.color = value;
								setAttributes( { border: newBorder } );
							},
						},
						{
							widthValue: border.width,
							onWidthChange: ( value ) => {
								const newBorder = { ...border };
								newBorder.width = value;
								setAttributes( { border: newBorder } );
							},
						},
						{
							radiusValue: border.radius,
							onRadiusChange: ( value ) => {
								const newBorder = { ...border };
								newBorder.radius = value;
								setAttributes( { border: newBorder } );
							},
						},
					] }
				/>

				<PanelBody
					title={ __( 'Dimensions', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						value={ contentPadding }
						options={ [
							{
								value: '',
								label: __( 'None', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( 'S', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
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
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								const newBoxShadow = { ...boxShadow };
								newBoxShadow.blur = value;
								setAttributes( { boxShadow: newBoxShadow } );
							},
							max: 10,
						},
					] }
				/>
			</InspectorControls>

			{ !! contentPosition && (
				<BlockControls group="block">
					<BlockAlignmentMatrixControl
						label={ __(
							'Change content position',
							'snow-monkey-blocks'
						) }
						value={ contentPosition }
						onChange={ ( nextPosition ) => {
							setAttributes( {
								contentPosition: nextPosition,
							} );
						} }
						isDisabled={ ! hasInnerBlocks }
					/>
				</BlockControls>
			) }

			<div
				{ ...blockProps }
				data-id={ sliderId }
				data-content-position={
					contentPosition?.replace( ' ', '-' ) || undefined
				}
				style={ styles }
			>
				<div { ...innerBlocksProps } ref={ ref } />
			</div>
		</>
	);
}
