import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalBorderRadiusControl as BorderRadiusControl,
} from '@wordpress/block-editor';

import {
	Button,
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderBoxControl as BorderBoxControl,
} from '@wordpress/components';

import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Icon, warning } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import PanelBoxShadowSettings from '@smb/component/panel-box-shadow-settings';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import { toNumber } from '@smb/helper';

import metadata from './block.json';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/spider-contents-slider-item' ];

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
		shuffle,
		shifted,
		gutter,
		interval,
		autoplayButton,
		duration,
		lgSlidesToShow,
		mdSlidesToShow,
		smSlidesToShow,
		canvasPadding,
		border,
		boxShadow,
		sliderClientIds: _sliderClientIds,
		templateLock,
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

	const { getBlockAttributes, nowSliderClientIds, slides, hasChildSelected } =
		useSelect(
			( select ) => {
				const isAncestorOfSelectedBlock = select(
					'core/block-editor'
				).hasSelectedInnerBlock( clientId, true );

				return {
					getBlockAttributes:
						select( 'core/block-editor' ).getBlockAttributes,
					nowSliderClientIds:
						select( 'core/block-editor' ).getBlockOrder( clientId ),
					slides: select( 'core/block-editor' ).getBlock( clientId )
						.innerBlocks,
					hasChildSelected: isAncestorOfSelectedBlock,
				};
			},
			[ clientId ]
		);

	useEffect( () => {
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

		const defaultBlur =
			!! boxShadow?.color && 0 < boxShadow?.blur ? boxShadow?.blur : 0;

		const childBlur =
			!! maxBlurSlide?.attributes?.boxShadow?.color &&
			0 < maxBlurSlide?.attributes?.boxShadow?.blur
				? maxBlurSlide?.attributes?.boxShadow?.blur
				: 0;

		const maxBlur = defaultBlur > childBlur ? defaultBlur : childBlur;

		if (
			maxBlur !== canvasPadding?.top ||
			maxBlur !== canvasPadding?.bottom ||
			maxBlur !== canvasPadding?.right ||
			maxBlur !== canvasPadding?.left
		) {
			setAttributes( {
				canvasPadding: {
					...canvasPadding,
					top: maxBlur,
					bottom: maxBlur,
					right: maxBlur,
					left: maxBlur,
				},
			} );
		}
	}, [ slides.join(), boxShadow.blur ] );

	const selectedSlide = useSelect(
		( select ) => {
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
		[ slides.join() ]
	);

	useEffect( () => {
		if ( 0 < nowSliderClientIds.length && ! currentSliderClientId ) {
			setCurrentSliderClientId( nowSliderClientIds[ 0 ] );
		}

		// Since what is actually needed is the number of InnerBlocks, exact clientIds are not necessary.
		if ( sliderClientIds.length !== nowSliderClientIds.length ) {
			setAttributes( {
				sliderClientIds: JSON.stringify( nowSliderClientIds ),
			} );
		}

		nowSliderClientIds.forEach( ( sliderClientId, index ) => {
			const sliderClientAttributes = getBlockAttributes( sliderClientId );
			if ( index !== parseInt( sliderClientAttributes?.sliderId ) ) {
				updateBlockAttributes( sliderClientId, { sliderId: index } );
			}
		} );
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ nowSliderClientIds.join(), currentSliderClientId ] );

	const useEffectDeps = !! ref.current && ref.current.offsetWidth;
	useEffect( () => {
		const width =
			!! ref.current &&
			!! canvasRef.current &&
			isShifted &&
			Math.floor( ref.current.offsetWidth );
		if ( !! width ) {
			ref.current.style.setProperty(
				'--spider--canvas-width',
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
				'--spider--reference-width',
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

	const borderWidth = String( border.width ).match( /^\d+$/ )
		? `${ border.width }px`
		: border.width;

	const borderRadius = String( border.radius ).match( /^\d+$/ )
		? `${ border.radius }px`
		: border.radius;

	const styles = {
		'--smb-spider-contents-slider--canvas-offset-top':
			( !! canvasPadding?.top && `${ canvasPadding?.top }px` ) ||
			undefined,
		'--smb-spider-contents-slider--canvas-offset-right':
			( !! canvasPadding?.right &&
				fade &&
				`${ canvasPadding?.right }px` ) ||
			undefined,
		'--smb-spider-contents-slider--canvas-offset-bottom':
			( !! canvasPadding?.bottom && `${ canvasPadding?.bottom }px` ) ||
			undefined,
		'--smb-spider-contents-slider--canvas-offset-left':
			( !! canvasPadding?.left &&
				fade &&
				`${ canvasPadding?.left }px` ) ||
			undefined,
		'--smb-spider-slider--gap':
			( ! gutter &&
				! fade &&
				( !! canvasPadding?.right || !! canvasPadding?.left ) &&
				`${ ( canvasPadding?.right + canvasPadding?.left ) / 2 }px` ) ||
			undefined,
		'--smb-spider-contents-slider--slide-border-width':
			( !! border.color && 0 < parseInt( borderWidth ) && borderWidth ) ||
			undefined,
		'--smb-spider-contents-slider--slide-border-color':
			border.color || undefined,
		'--smb-spider-contents-slider--slide-border-type':
			border.style || undefined,
		'--smb-spider-contents-slider--slide-border-radius':
			( 0 < parseInt( borderRadius ) && borderRadius ) || undefined,
		'--smb-spider-contents-slider--slide-box-shadow': !! boxShadow.color
			? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
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
		},
		{
			templateLock,
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'horizontal',
			renderAppender: false,
		}
	);

	return (
		<>
			<InspectorControls group="dimensions">
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
					panelId={ clientId }
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
			</InspectorControls>

			<InspectorControls group="border">
				<ToolsPanelItem
					hasValue={ () =>
						border.color !==
							metadata.attributes.border.default.color ||
						border.style !==
							metadata.attributes.border.default.style ||
						border.width !==
							metadata.attributes.border.default.width
					}
					isShownByDefault
					label={ __( 'Border', 'snow-monkey-blocks' ) }
					onDeselect={ () => {
						setAttributes( {
							border: {
								...border,
								color: metadata.attributes.border.default.color,
								style: metadata.attributes.border.default.style,
								width: metadata.attributes.border.default.width,
							},
						} );
					} }
					panelId={ clientId }
				>
					<BorderBoxControl
						{ ...useMultipleOriginColorsAndGradients() }
						className="smb-border-box-control"
						enableAlpha={ true }
						enableStyle={ true }
						onChange={ ( value ) => {
							setAttributes( {
								border: {
									...border,
									color: value?.color,
									style: value?.style,
									width: value?.width,
								},
							} );
						} }
						popoverOffset={ 40 }
						popoverPlacement="left-start"
						value={ {
							color: border.color,
							style: border.style,
							width: border.width,
						} }
						__experimentalIsRenderedInSidebar
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
						setAttributes( {
							border: {
								...border,
								radius: metadata.attributes.border.default
									.radius,
							},
						} );
					} }
					panelId={ clientId }
				>
					<div className="smb-border-radius-control">
						<BorderRadiusControl
							values={ border.radius }
							onChange={ ( value ) => {
								setAttributes( {
									border: {
										...border,
										radius: value,
									},
								} );
							} }
						/>
					</div>
				</ToolsPanelItem>
			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBoxShadowSettings
					settings={ [
						{
							colorValue: boxShadow.color || '',
							onColorChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										color: value,
									},
								} );
							},
						},
						{
							opacityValue: boxShadow.opacity,
							onOpacityChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										opacity: value,
									},
								} );
							},
						},
						{
							blurValue: boxShadow.blur,
							onBlurChange: ( value ) => {
								setAttributes( {
									boxShadow: {
										...boxShadow,
										blur: value,
									},
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

					<ToolsPanelItem
						hasValue={ () =>
							shuffle !== metadata.attributes.shuffle.default
						}
						isShownByDefault
						label={ __( 'Shuffle slides', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								shuffle: metadata.attributes.shuffle.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Shuffle slides',
								'snow-monkey-blocks'
							) }
							checked={ shuffle }
							onChange={ ( value ) =>
								setAttributes( {
									shuffle: value,
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

					{ 0 < interval && (
						<ToolsPanelItem
							hasValue={ () =>
								autoplayButton !==
								metadata.attributes.autoplayButton.default
							}
							isShownByDefault
							label={ __(
								'Autoplay Speed in seconds',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									autoplayButton:
										metadata.attributes.autoplayButton
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Display pause button for autoplay',
									'snow-monkey-blocks'
								) }
								checked={ autoplayButton }
								onChange={ ( value ) =>
									setAttributes( {
										autoplayButton: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

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
											6 < nowSliderClientIds.length
												? 6
												: nowSliderClientIds.length
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
											6 < nowSliderClientIds.length
												? 6
												: nowSliderClientIds.length
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
											6 < nowSliderClientIds.length
												? 6
												: nowSliderClientIds.length
										}
									/>
								) }
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>
			</InspectorControls>

			<div
				{ ...useBlockProps( {
					className: classes,
					style: styles,
					ref,
				} ) }
				data-fade={ fade ? 'true' : 'false' }
				data-shuffle={ shuffle ? 'true' : 'false' }
				data-interval={ 0 < interval ? interval * 1000 : undefined }
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

				{ ( ( 0 < interval && autoplayButton ) || dots ) && (
					<div className="spider__dots">
						{ autoplayButton && (
							<>
								<button className="spider__stop">
									<svg
										width="12"
										height="16"
										viewBox="0 0 12 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										title={ __(
											'Pause autoplay',
											'snow-monkey-blocks'
										) }
									>
										<rect
											width="5"
											height="16"
											fill="currentColor"
										></rect>
										<rect
											x="7"
											width="5"
											height="16"
											fill="currentColor"
										></rect>
									</svg>
								</button>
								<button className="spider__start">
									<svg
										width="12"
										height="16"
										viewBox="0 0 12 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										title={ __(
											'Start autoplay',
											'snow-monkey-blocks'
										) }
									>
										<path
											d="M12 8L-2.29967e-06 16L-2.29967e-06 0L12 8Z"
											fill="currentColor"
										></path>
									</svg>
								</button>
							</>
						) }

						{ dots &&
							nowSliderClientIds.map(
								( sliderClientId, index ) => {
									return (
										<button
											className="spider__dot"
											data-id={ index }
											key={ index }
										>
											{ index }
										</button>
									);
								}
							) }
					</div>
				) }

				{ ( isSelected || hasChildSelected ) && (
					<div className="smb-slider-pagination">
						{ nowSliderClientIds.map( ( sliderClientId, index ) => {
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
