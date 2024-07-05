import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		url,
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
			<a
				className={ classnames(
					'smb-items__item',
					'smb-items__item--block-link',
					colorProps?.className
				) }
				style={ { ...colorProps?.style } }
				href={ url }
				target={ '_self' === target ? undefined : target }
				rel={ '_self' === target ? undefined : 'noopener noreferrer' }
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

					{ displayBtn && (
						<div className="smb-items__item__action">
							<span
								className={ btnClasses }
								href={ url }
								style={ btnStyles }
								target={
									'_self' === target ? undefined : target
								}
								rel={
									'_self' === target
										? undefined
										: 'noopener noreferrer'
								}
							>
								<span className="smb-btn__label">
									<RichText.Content value={ btnLabel } />
								</span>
							</span>
						</div>
					) }
				</div>
			</a>
		</div>
	);
}
