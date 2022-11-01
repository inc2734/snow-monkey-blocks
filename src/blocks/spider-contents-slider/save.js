import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
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
	};

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-fade={ fade ? 'true' : 'false' }
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
						style: canvasStyles,
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
		</div>
	);
}
