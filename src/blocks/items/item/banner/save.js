import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import { stringToInnerText } from '@smb/helper';

export default function ( { attributes, className } ) {
	const {
		title,
		lede,
		url,
		target,
		blur,
		textColor,
		maskColor,
		maskGradientColor,
		maskOpacity,
		imageSize,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		contentsAlignment,
		contentPosition,
	} = attributes;

	const classes = classnames( 'c-row__col', className );
	const bannerClasses = classnames(
		'smb-items__banner',
		`smb-items__banner--${ imageSize }`,
		{
			'smb-items__banner--blur': blur,
			[ `smb-items__banner--${ contentsAlignment }` ]:
				!! contentsAlignment,
		}
	);

	const styles = {
		'--smb-items--banner--color': textColor || undefined,
		'--smb-items--banner--mask-color': maskColor || undefined,
		'--smb-items--banner--mask-image': maskGradientColor || undefined,
		'--smb-items--banner--mask-opacity': String( maskOpacity ),
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ bannerClasses } style={ styles }>
				<div className="smb-items__banner__figure">
					{ 1 > maskOpacity && (
						<div className="smb-items__banner__figure__mask" />
					) }
					{ !! imageURL ? (
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					) : (
						<div className="smb-items__banner__figure__dummy" />
					) }
				</div>

				{ ( ! RichText.isEmpty( title ) ||
					! RichText.isEmpty( lede ) ) && (
					<div
						className="smb-items__banner__body"
						data-content-position={
							( 'contents' !== imageSize &&
								contentPosition?.replace( ' ', '-' ) ) ||
							undefined
						}
					>
						<div className="smb-items__banner__body-inner">
							{ ! RichText.isEmpty( title ) && (
								<div className="smb-items__banner__title">
									<RichText.Content value={ title } />
								</div>
							) }

							{ ! RichText.isEmpty( lede ) && (
								<div className="smb-items__banner__lede">
									<RichText.Content value={ lede } />
								</div>
							) }
						</div>
					</div>
				) }

				{ !! url && (
					<div className="smb-items__banner__action">
						<a
							href={ url }
							target={ '_self' === target ? undefined : target }
							rel={
								'_self' === target
									? undefined
									: 'noopener noreferrer'
							}
						>
							{ stringToInnerText( title ) }
						</a>
					</div>
				) }
			</div>
		</div>
	);
}
