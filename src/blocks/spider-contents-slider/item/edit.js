import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	useInnerBlocksProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from '@wordpress/block-editor';

import {
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderControl as BorderControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const { sliderId, contentPosition, contentPadding, border, boxShadow } =
		attributes;

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
		[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
			!! contentPadding,
	} );

	const borderWidth = String( border.width ).match( /^\d+$/ )
		? `${ border.width }px`
		: border.width;

	const borderRadius = String( border.radius ).match( /^\d+$/ )
		? `${ border.radius }px`
		: border.radius;

	const styles = {
		'--smb-spider-contents-slider--slide-border-width':
			( !! border.color && borderWidth ) || undefined,
		'--smb-spider-contents-slider--slide-border-color':
			border.color || undefined,
		'--smb-spider-contents-slider--slide-border-radius':
			borderRadius || undefined,
		'--smb-spider-contents-slider--slide-box-shadow': !! boxShadow.color
			? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
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

	return (
		<>
			<InspectorControls>
				<ToolsPanel label={ __( 'Border', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							border.color !==
								metadata.attributes.border.default.color ||
							border.width !==
								metadata.attributes.border.default.width
						}
						isShownByDefault
						label={ __( 'Border', 'snow-monkey-blocks' ) }
						onDeselect={ () => {
							border.color =
								metadata.attributes.border.default.color;
							border.width =
								metadata.attributes.border.default.width;
							setAttributes( { border: { ...border } } );
						} }
					>
						<BorderControl
							withSlider
							onChange={ ( value ) => {
								border.color = value.color;
								border.width = value.width;
								setAttributes( { border: { ...border } } );
							} }
							value={ {
								color: border.color,
								width: border.width,
							} }
							enableStyle={ false }
							{ ...useMultipleOriginColorsAndGradients() }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							border.radius !==
							metadata.attributes.border.default.radius
						}
						isShownByDefault
						label={ __( 'Border radius', 'snow-monkey-blocks' ) }
						onDeselect={ () => {
							border.radius =
								metadata.attributes.border.default.radius;
							setAttributes( { border: { ...border } } );
						} }
					>
						<div className="smb-border-radius-control">
							<BorderRadiusControl
								values={ border.radius }
								onChange={ ( value ) => {
									border.radius = value;
									setAttributes( { border: { ...border } } );
								} }
							/>
						</div>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel label={ __( 'Dimensions', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							contentPadding !==
							metadata.attributes.contentPadding.default
						}
						isShownByDefault
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								contentPadding:
									metadata.attributes.contentPadding.default,
							} )
						}
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
							onChange={ ( value ) =>
								setAttributes( {
									contentPadding: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color || '',
							onColorChange: ( value ) => {
								boxShadow.color = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								boxShadow.opacity = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								boxShadow.blur = value;
								setAttributes( {
									boxShadow: { ...boxShadow },
								} );
							},
							max: 10,
						},
					] }
					defaultValues={ {
						...metadata.attributes.boxShadow.default,
					} }
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
			>
				<div { ...innerBlocksProps } ref={ ref } />
			</div>
		</>
	);
}
