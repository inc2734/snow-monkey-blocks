import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	Button,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Icon, warning } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import { toNumber } from '@smb/helper';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/spider-contents-slider-item' ];

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const {
		arrows,
		dots,
		fade,
		shifted,
		gutter,
		interval,
		duration,
		lgSlidesToShow,
		mdSlidesToShow,
		smSlidesToShow,
		canvasPadding,
		sliderClientIds: _sliderClientIds,
	} = attributes;

	const sliderClientIds = JSON.parse( _sliderClientIds );

	const isAlignwide = 'wide' === attributes.align;
	const isAlignfull = 'full' === attributes.align;
	const isShiftable = ! fade;
	const isShifted = shifted && isShiftable && ( isAlignwide || isAlignfull );

	const ref = useRef();
	const referenceRef = useRef();
	const canvasRef = useRef();

	const [ currentSliderClientId, setCurrentSliderClientId ] =
		useState( undefined );

	const { updateBlockAttributes, selectBlock } =
		useDispatch( 'core/block-editor' );

	const nowSliderClientIds = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlockOrder( clientId );
		},
		[ clientId ]
	);

	const maxBlur = useSelect( ( select ) => {
		const slides =
			select( 'core/block-editor' ).getBlock( clientId ).innerBlocks;

		let maxBlurSlide;
		if ( 0 < slides.length ) {
			maxBlurSlide = slides.reduce( ( prevSlide, currentSlide ) => {
				const prevBlur =
					( !! prevSlide?.attributes?.boxShadow?.color &&
						0 < prevSlide?.attributes?.boxShadow?.blur ) ||
					0;
				const currentBlur =
					( !! currentSlide?.attributes?.boxShadow?.color &&
						0 < currentSlide?.attributes?.boxShadow?.blur ) ||
					0;
				return prevBlur < currentBlur ? currentSlide : prevSlide;
			} );
		}

		return !! maxBlurSlide?.attributes?.boxShadow?.color &&
			0 < maxBlurSlide?.attributes?.boxShadow?.blur
			? maxBlurSlide?.attributes?.boxShadow?.blur
			: undefined;
	} );

	useEffect( () => {
		setAttributes( {
			canvasPadding: {
				...canvasPadding,
				top: maxBlur,
				bottom: maxBlur,
				right: maxBlur,
				left: maxBlur,
			},
		} );
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ maxBlur ] );

	const selectedSlide = useSelect(
		( select ) => {
			const slides =
				select( 'core/block-editor' ).getBlock( clientId ).innerBlocks;

			const selectedSlideClientIds = slides.filter(
				( slide ) =>
					slide.clientId ===
					select( 'core/block-editor' ).getSelectedBlockClientId()
			);

			if ( 0 < selectedSlideClientIds.length ) {
				setCurrentSliderClientId( selectedSlideClientIds[ 0 ] );
				return selectedSlideClientIds[ 0 ];
			}

			return undefined;
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( 0 < nowSliderClientIds.length && ! currentSliderClientId ) {
			setCurrentSliderClientId( nowSliderClientIds[ 0 ] );
		}

		setAttributes( {
			sliderClientIds: JSON.stringify( nowSliderClientIds ),
		} );

		nowSliderClientIds.forEach( ( sliderClientId, index ) => {
			updateBlockAttributes( sliderClientId, { sliderId: index } );
		} );
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ nowSliderClientIds, currentSliderClientId ] );

	const useEffectDeps = !! ref.current && ref.current.offsetWidth;
	useEffect( () => {
		const width =
			!! ref.current &&
			!! canvasRef.current &&
			isShifted &&
			Math.floor( ref.current.offsetWidth );
		if ( !! width ) {
			ref.current.style.setProperty(
				'--spider-canvas-width',
				`${ width }px`
			);
			canvasRef.current.style.width = `${ width }px`;
		}

		const referenceWidth =
			!! referenceRef.current &&
			isShifted &&
			Math.floor( referenceRef.current.offsetWidth );
		if ( !! referenceWidth ) {
			ref.current.style.setProperty(
				'--spider-reference-width',
				`${ referenceWidth }px`
			);
		}
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ useEffectDeps, isShifted ] );

	const classes = classnames(
		'smb-spider-slider',
		'smb-spider-contents-slider',
		className,
		{
			'smb-spider-slider--shifted': isShifted,
			[ `smb-spider-slider--gutter-${ gutter }` ]: !! gutter,
		}
	);

	const canvasStyles = {
		paddingTop: canvasPadding?.top || undefined,
		paddingBottom: canvasPadding?.bottom || undefined,
		paddingRight: canvasPadding?.right || undefined,
		paddingLeft: canvasPadding?.left || undefined,
	};

	const referenceStyles = {
		marginRight: canvasPadding?.right || undefined,
		marginLeft: canvasPadding?.left || undefined,
	};

	const gutterOptions = [
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
	];

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'spider__canvas',
			style: canvasStyles,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'horizontal',
			renderAppender: false,
		}
	);

	return (
		<>
			<InspectorControls group="styles">
				<ToolsPanel label={ __( 'Dimensions', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							gutter !== metadata.attributes.gutter.default
						}
						isShownByDefault
						label={ __( 'Gap', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								gutter: metadata.attributes.gutter.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Gap', 'snow-monkey-blocks' ) }
							value={ gutter }
							onChange={ ( value ) =>
								setAttributes( {
									gutter: value,
								} )
							}
							options={ gutterOptions }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							arrows !== metadata.attributes.arrows.default
						}
						isShownByDefault
						label={ __( 'Display arrows', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								arrows: metadata.attributes.arrows.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display arrows',
								'snow-monkey-blocks'
							) }
							checked={ arrows }
							onChange={ ( value ) =>
								setAttributes( {
									arrows: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							dots !== metadata.attributes.dots.default
						}
						isShownByDefault
						label={ __( 'Display dots', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								dots: metadata.attributes.dots.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Display dots', 'snow-monkey-blocks' ) }
							checked={ dots }
							onChange={ ( value ) =>
								setAttributes( {
									dots: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							fade !== metadata.attributes.fade.default
						}
						isShownByDefault
						label={ __( 'Fade', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								fade: metadata.attributes.fade.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Fade', 'snow-monkey-blocks' ) }
							checked={ fade }
							onChange={ ( value ) =>
								setAttributes( {
									fade: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ isShiftable && (
						<ToolsPanelItem
							hasValue={ () =>
								shifted !== metadata.attributes.shifted.default
							}
							isShownByDefault
							label={ __(
								'Shifting the slider',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									shifted:
										metadata.attributes.shifted.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Shifting the slider',
									'snow-monkey-blocks'
								) }
								help={
									shifted &&
									( ! isAlignfull || ! isAlignwide ) && (
										<>
											<Icon
												icon={ warning }
												style={ { fill: '#d94f4f' } }
											/>
											{ __(
												'It must be full width (.alignfull) or wide width (.alignwide).',
												'snow-monkey-blocks'
											) }
										</>
									)
								}
								checked={ shifted }
								onChange={ ( value ) =>
									setAttributes( {
										shifted: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							interval !== metadata.attributes.interval.default
						}
						isShownByDefault
						label={ __(
							'Autoplay Speed in seconds',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								interval: metadata.attributes.interval.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Autoplay Speed in seconds',
								'snow-monkey-blocks'
							) }
							help={ __(
								'If "0", no scroll.',
								'snow-monkey-blocks'
							) }
							value={ interval }
							onChange={ ( value ) =>
								setAttributes( {
									interval: toNumber( value, 0, 10 ),
								} )
							}
							min="0"
							max="10"
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							duration !== metadata.attributes.duration.default
						}
						isShownByDefault
						label={ __(
							'Animation speed in seconds',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								duration: metadata.attributes.duration.default,
							} )
						}
					>
						<RangeControl
							label={ __(
								'Animation speed in seconds',
								'snow-monkey-blocks'
							) }
							help={ __(
								'If "0", default animation speed.',
								'snow-monkey-blocks'
							) }
							value={ duration }
							onChange={ ( value ) =>
								setAttributes( {
									duration: toNumber( value, 0, 10 ),
								} )
							}
							min="0"
							max="5"
							step="0.1"
						/>
					</ToolsPanelItem>

					{ ! fade && (
						<ToolsPanelItem
							hasValue={ () =>
								lgSlidesToShow !==
									metadata.attributes.lgSlidesToShow
										.default ||
								mdSlidesToShow !==
									metadata.attributes.mdSlidesToShow
										.default ||
								smSlidesToShow !==
									metadata.attributes.smSlidesToShow.default
							}
							isShownByDefault
							label={ __(
								'Slides settings',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									lgSlidesToShow:
										metadata.attributes.lgSlidesToShow
											.default,
									mdSlidesToShow:
										metadata.attributes.mdSlidesToShow
											.default,
									smSlidesToShow:
										metadata.attributes.smSlidesToShow
											.default,
								} )
							}
						>
							<ResponsiveTabPanel
								desktop={ () => (
									<RangeControl
										label={ __(
											'# of slides to show (Large window)',
											'snow-monkey-blocks'
										) }
										value={ lgSlidesToShow }
										onChange={ ( value ) =>
											setAttributes( {
												lgSlidesToShow: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max={
											6 < sliderClientIds.length
												? 6
												: sliderClientIds.length
										}
									/>
								) }
								tablet={ () => (
									<RangeControl
										label={ __(
											'# of slides to show (Medium window)',
											'snow-monkey-blocks'
										) }
										value={ mdSlidesToShow }
										onChange={ ( value ) =>
											setAttributes( {
												mdSlidesToShow: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max={
											6 < sliderClientIds.length
												? 6
												: sliderClientIds.length
										}
									/>
								) }
								mobile={ () => (
									<RangeControl
										label={ __(
											'# of slides to show (Small window)',
											'snow-monkey-blocks'
										) }
										value={ smSlidesToShow }
										onChange={ ( value ) =>
											setAttributes( {
												smSlidesToShow: toNumber(
													value,
													1,
													6
												),
											} )
										}
										min="1"
										max={
											6 < sliderClientIds.length
												? 6
												: sliderClientIds.length
										}
									/>
								) }
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>
			</InspectorControls>

			<div
				{ ...useBlockProps( { className: classes, ref } ) }
				data-fade={ fade ? 'true' : 'false' }
				data-lg-slide-to-show={
					! fade && 1 < lgSlidesToShow ? lgSlidesToShow : undefined
				}
				data-md-slide-to-show={
					! fade && 1 < mdSlidesToShow ? mdSlidesToShow : undefined
				}
				data-sm-slide-to-show={
					! fade && 1 < smSlidesToShow ? smSlidesToShow : undefined
				}
			>
				<div className="spider">
					{ isShifted && (
						<div className="c-container">
							<div
								className="spider__reference"
								style={ referenceStyles }
								ref={ referenceRef }
							/>
						</div>
					) }
					<div { ...innerBlocksProps } ref={ canvasRef } />

					{ arrows && (
						<div className="spider__arrows">
							<button
								className="spider__arrow"
								data-direction="prev"
							>
								Prev
							</button>
							<button
								className="spider__arrow"
								data-direction="next"
							>
								Next
							</button>
						</div>
					) }
				</div>

				{ dots && (
					<div className="spider__dots">
						{ sliderClientIds.map( ( sliderClientId, index ) => {
							return (
								<button
									className="spider__dot"
									data-id={ index }
									key={ index }
								>
									{ index }
								</button>
							);
						} ) }
					</div>
				) }

				{ ( isSelected || !! selectedSlide ) && (
					<div className="smb-slider-pagination">
						{ sliderClientIds.map( ( sliderClientId, index ) => {
							return (
								<Button
									variant={
										currentSliderClientId ===
											sliderClientId ||
										selectedSlide?.clientId ===
											sliderClientId
											? 'primary'
											: 'secondary'
									}
									onClick={ () => {
										setCurrentSliderClientId(
											sliderClientId
										);
										selectBlock( sliderClientId );
									} }
									key={ index }
								>
									<span>{ index + 1 }</span>
								</Button>
							);
						} ) }

						<InnerBlocks.ButtonBlockAppender />
					</div>
				) }
			</div>
		</>
	);
}
