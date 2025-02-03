import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		url,
		rel,
		target,
		displayImage,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		displayBtn,
		btnLabel,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const isHrefSet = !! url;

	const colorProps = getColorClassesAndStyles( attributes );

	const classes = classnames( 'c-row__col', className );

	const btnClasses = classnames( 'smb-items__item__btn', 'smb-btn', {
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
			<div
				className={ classnames(
					'smb-items__item',
					'smb-items__item--block-link',
					colorProps?.className
				) }
				style={ { ...colorProps?.style } }
			>
				{ displayImage && (
					<div className="smb-items__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-items__item__body">
					{ 'none' !== titleTagName && (
						<RichText.Content
							tagName={ titleTagName }
							className="smb-items__item__title"
							value={ title }
						/>
					) }

					{ ! RichText.isEmpty( lede ) && (
						<div className="smb-items__item__lede">
							<RichText.Content value={ lede } />
						</div>
					) }

					{ ! RichText.isEmpty( summary ) && (
						<div className="smb-items__item__content">
							<RichText.Content value={ summary } />
						</div>
					) }

					{ ( isHrefSet || displayBtn ) && (
						<div className="smb-items__item__action">
							<a
								className={
									displayBtn ? btnClasses : undefined
								}
								style={ displayBtn ? btnStyles : undefined }
								href={ url }
								target={ target }
								rel={ rel }
							>
								{ displayBtn ? (
									<span className="smb-btn__label">
										<RichText.Content value={ btnLabel } />
									</span>
								) : (
									<span className="screen-reader-text">
										{ btnLabel ||
											__(
												'Learn more',
												'snow-monkey-blocks'
											) }
									</span>
								) }
							</a>
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
