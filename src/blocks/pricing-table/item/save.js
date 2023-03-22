import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		title,
		price,
		lede,
		displayImage,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		displayBtn,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const classes = classnames( 'c-row__col', className );

	const btnClasses = classnames( 'smb-btn', 'smb-pricing-table__item__btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( btnBorderRadius ).match( /^\d+$/ )
			? `${ btnBorderRadius }px`
			: btnBorderRadius,
		'--smb-btn--color': btnTextColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-pricing-table__item">
				{ displayImage && (
					<div className="smb-pricing-table__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-pricing-table__item__title">
					<RichText.Content value={ title } />
				</div>

				{ ! RichText.isEmpty( price ) && (
					<div className="smb-pricing-table__item__price">
						<RichText.Content value={ price } />
					</div>
				) }

				{ ! RichText.isEmpty( lede ) && (
					<div className="smb-pricing-table__item__lede">
						<RichText.Content value={ lede } />
					</div>
				) }

				<ul { ...useInnerBlocksProps.save() } />

				{ displayBtn && (
					<div className="smb-pricing-table__item__action">
						<a
							className={ btnClasses }
							href={ btnURL }
							style={ btnStyles }
							target={
								'_self' === btnTarget ? undefined : btnTarget
							}
							rel={
								'_self' === btnTarget
									? undefined
									: 'noopener noreferrer'
							}
						>
							<span className="smb-btn__label">
								<RichText.Content value={ btnLabel } />
							</span>
						</a>
					</div>
				) }
			</div>
		</div>
	);
}
