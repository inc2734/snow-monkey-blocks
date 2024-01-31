import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, className } ) {
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
	} = attributes;
	const sliderClientIds = JSON.parse( _sliderClientIds );

	const isAlignwide = 'wide' === attributes.align;
	const isAlignfull = 'full' === attributes.align;
	const isShiftable = ! fade;
	const isShifted = shifted && isShiftable && ( isAlignwide || isAlignfull );

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

	return (
		<div
			{ ...useBlockProps.save( { className: classes, style: styles } ) }
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
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'spider__canvas',
					} ) }
				/>

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
						sliderClientIds.map( ( sliderClientId, index ) => {
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
		</div>
	);
}
