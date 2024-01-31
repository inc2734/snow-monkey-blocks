import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, className } ) {
	const {
		images,
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

	if ( ! images.length ) {
		return null;
	}

	const isAlignwide = 'wide' === attributes.align;
	const isAlignfull = 'full' === attributes.align;
	const isShiftable = ! fade;
	const isShifted = shifted && isShiftable && ( isAlignwide || isAlignfull );

	const classes = classnames( 'smb-spider-slider', className, {
		[ `smb-spider-slider--${ aspectRatio }` ]: !! aspectRatio,
		'smb-spider-slider--shifted': isShifted,
		[ `smb-spider-slider--gutter-${ gutter }` ]: !! gutter,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-fade={ fade ? 'true' : 'false' }
			data-shuffle={ shuffle ? 'true' : 'false' }
			data-interval={ 0 < interval ? interval * 1000 : undefined }
			data-duration={ 0 < duration ? duration * 1000 : undefined }
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
						<div className="spider__reference" />
					</div>
				) }
				<div className="spider__canvas">
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
											img.width || img.sizes?.full?.width
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
						<button className="spider__arrow" data-direction="prev">
							Prev
						</button>
						<button className="spider__arrow" data-direction="next">
							Next
						</button>
					</div>
				) }
			</div>

			{ ( ( 0 < interval && autoplayButton ) || dots ) && (
				<div
					className="spider__dots"
					data-thumbnails={ dotsToThumbnail ? 'true' : 'false' }
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
		</div>
	);
}
