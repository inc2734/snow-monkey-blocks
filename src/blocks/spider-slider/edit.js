import classnames from 'classnames';

import {
	InspectorControls,
	MediaPlaceholder,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { Icon, warning } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import { toNumber } from '@smb/helper';

import useImageSizes from './use-image-sizes';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
} ) {
	const {
		images,
		sizeSlug,
		aspectRatio,
		arrows,
		dots,
		dotsToThumbnail,
		fade,
		shuffle,
		shifted,
		gutter,
		displayCaption,
		interval,
		autoplayButton,
		duration,
		lgSlidesToShow,
		mdSlidesToShow,
		smSlidesToShow,
	} = attributes;

	const hasImages = !! images.length;

	const { getSettings } = useSelect( ( select ) => {
		return {
			getSettings: select( 'core/block-editor' ).getSettings,
		};
	}, [] );

	const { resizedImages } = useSelect(
		( select ) => {
			return {
				resizedImages: images
					.map( ( image ) => {
						return image.id && isSelected
							? select( 'core' ).getMedia( image.id, {
									context: 'view',
							  } )
							: null;
					} )
					.filter( Boolean ),
			};
		},

		[ isSelected, images, clientId ]
	);

	const isAlignwide = 'wide' === attributes.align;
	const isAlignfull = 'full' === attributes.align;
	const isShiftable = ! fade;
	const isShifted = shifted && isShiftable && ( isAlignwide || isAlignfull );

	const ref = useRef();
	const referenceRef = useRef();
	const canvasRef = useRef();

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

	const classes = classnames( 'smb-spider-slider', className, {
		[ `smb-spider-slider--${ aspectRatio }` ]: !! aspectRatio,
		'smb-spider-slider--shifted': isShifted,
		[ `smb-spider-slider--gutter-${ gutter }` ]: !! gutter,
	} );

	const sizeSlugOptions = useImageSizes(
		resizedImages,
		isSelected,
		getSettings
	);

	const aspectRatioOptions = [
		{
			value: '',
			label: __( 'Default', 'snow-monkey-blocks' ),
		},
		{
			value: '16x9',
			label: __( '16:9', 'snow-monkey-blocks' ),
		},
		{
			value: '4x3',
			label: __( '4:3', 'snow-monkey-blocks' ),
		},
	];

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

	const mediaPlaceholder = (
		<MediaPlaceholder
			addToGallery={ hasImages }
			isAppender={ hasImages }
			className={ className }
			disableMediaButtons={ hasImages && ! isSelected }
			icon={ ! hasImages && 'format-gallery' }
			labels={ {
				title: ! hasImages && __( 'Slider', 'snow-monkey-blocks' ),
				instructions:
					! hasImages &&
					__(
						'Drag images, upload new ones or select files from your library.',
						'snow-monkey-blocks'
					),
			} }
			onSelect={ ( selectedImages ) => {
				const newImages = selectedImages.map( ( image ) => {
					if ( ! image.id ) {
						return image;
					}

					const newSizeSlug = !! image?.sizes[ sizeSlug ]
						? sizeSlug
						: DEFAULT_MEDIA_SIZE_SLUG;
					const newUrl = image?.sizes[ newSizeSlug ]?.url;
					const newWidth = image?.sizes[ newSizeSlug ]?.width;
					const newHeight = image?.sizes[ newSizeSlug ]?.height;

					return {
						url: newUrl,
						alt: image.alt,
						id: image.id,
						width: newWidth,
						height: newHeight,
						caption: image.caption,
					};
				} );

				setAttributes( {
					images: newImages,
				} );
			} }
			accept="image/*"
			allowedTypes={ ALLOWED_TYPES }
			multiple
			value={ images }
		/>
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

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							sizeSlug !== metadata.attributes.sizeSlug.default
						}
						isShownByDefault
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								sizeSlug: metadata.attributes.sizeSlug.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Images size', 'snow-monkey-blocks' ) }
							value={ sizeSlug }
							options={ sizeSlugOptions }
							onChange={ ( value ) => {
								const newImages = resizedImages.map(
									( image ) => {
										if ( ! image.id ) {
											return image;
										}

										const newSizeSlug = !! image
											?.media_details?.sizes?.[ value ]
											? value
											: DEFAULT_MEDIA_SIZE_SLUG;
										const newUrl =
											image?.media_details?.sizes?.[
												newSizeSlug
											]?.source_url;
										const newWidth =
											image?.media_details?.sizes?.[
												newSizeSlug
											]?.width;
										const newHeight =
											image?.media_details?.sizes?.[
												newSizeSlug
											]?.height;

										return {
											url: newUrl,
											alt: image.alt,
											id: image.id,
											width: newWidth,
											height: newHeight,
											caption: image.caption.rendered,
										};
									}
								);

								setAttributes( {
									images: newImages,
									sizeSlug: value,
								} );
							} }
							help={ __(
								'Select the size of the source image.'
							) }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							aspectRatio !==
							metadata.attributes.aspectRatio.default
						}
						isShownByDefault
						label={ __( 'Aspect ratio', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								aspectRatio:
									metadata.attributes.aspectRatio.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Aspect ratio', 'snow-monkey-blocks' ) }
							value={ aspectRatio }
							onChange={ ( value ) =>
								setAttributes( {
									aspectRatio: value,
								} )
							}
							options={ aspectRatioOptions }
						/>
					</ToolsPanelItem>

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

					{ dots && (
						<ToolsPanelItem
							hasValue={ () =>
								dotsToThumbnail !==
								metadata.attributes.dotsToThumbnail.default
							}
							isShownByDefault
							label={ __(
								'Change dots to thumbnails',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									dotsToThumbnail:
										metadata.attributes.dotsToThumbnail
											.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Change dots to thumbnails',
									'snow-monkey-blocks'
								) }
								checked={ dotsToThumbnail }
								onChange={ ( value ) =>
									setAttributes( {
										dotsToThumbnail: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

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
							displayCaption !==
							metadata.attributes.displayCaption.default
						}
						isShownByDefault
						label={ __( 'Display caption', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								displayCaption:
									metadata.attributes.displayCaption.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display caption',
								'snow-monkey-blocks'
							) }
							checked={ displayCaption }
							onChange={ ( value ) =>
								setAttributes( {
									displayCaption: value,
								} )
							}
						/>
					</ToolsPanelItem>

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
											6 < images.length
												? 6
												: images.length
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
											6 < images.length
												? 6
												: images.length
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
											6 < images.length
												? 6
												: images.length
										}
									/>
								) }
							/>
						</ToolsPanelItem>
					) }
				</ToolsPanel>
			</InspectorControls>

			{ ! hasImages ? (
				<div { ...useBlockProps( { ref } ) }>{ mediaPlaceholder }</div>
			) : (
				<div
					{ ...useBlockProps( { className: classes, ref } ) }
					data-fade={ fade ? 'true' : 'false' }
					data-shuffle={ shuffle ? 'true' : 'false' }
					data-lg-slide-to-show={
						! fade && 1 < lgSlidesToShow
							? lgSlidesToShow
							: undefined
					}
					data-md-slide-to-show={
						! fade && 1 < mdSlidesToShow
							? mdSlidesToShow
							: undefined
					}
					data-sm-slide-to-show={
						! fade && 1 < smSlidesToShow
							? smSlidesToShow
							: undefined
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
						<div className="spider__canvas" ref={ canvasRef }>
							{ images.map( ( img, index ) => {
								return (
									<div
										className="spider__slide"
										data-id={ index }
										key={ index }
									>
										<div className="smb-spider-slider__figure-wrapper">
											<img
												className={ `spider__figure wp-image-${ img.id }` }
												src={ img.url }
												alt={ img.alt }
												width={
													img.width ||
													img.sizes?.full?.width
												}
												height={
													img.height ||
													img.sizes?.full?.height
												}
												data-image-id={ img.id }
											/>
										</div>

										{ displayCaption && !! img.caption && (
											<div className="smb-spider-slider__item">
												<div className="smb-spider-slider__item__caption">
													{ img.caption }
												</div>
											</div>
										) }
									</div>
								);
							} ) }
						</div>

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
						<div
							className="spider__dots"
							data-thumbnails={
								dotsToThumbnail ? 'true' : 'false'
							}
						>
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
								images.map( ( img, index ) => {
									return (
										<button
											className="spider__dot"
											data-id={ index }
											key={ index }
										>
											{ dotsToThumbnail ? (
												<img
													className={ `spider__figure wp-image-${ img.id }` }
													src={ img.url }
													alt={ img.alt }
													width={
														img.width ||
														img.sizes?.full?.width
													}
													height={
														img.height ||
														img.sizes?.full?.height
													}
												/>
											) : (
												<>{ index }</>
											) }
										</button>
									);
								} ) }
						</div>
					) }

					{ mediaPlaceholder }
				</div>
			) }
		</>
	);
}
