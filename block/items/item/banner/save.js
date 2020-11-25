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
		maskOpacity,
		imageSize,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		align,
	} = attributes;

	const classes = classnames( 'c-row__col', className );
	const bannerClasses = classnames(
		'smb-items__banner',
		`smb-items__banner--${ imageSize }`,
		{
			'smb-items__banner--blur': blur,
			[ `has-text-align-${ align }` ]: align,
		}
	);

	const styles = {
		color: textColor || undefined,
	};

	const imgStyles = {
		opacity: maskOpacity,
	};

	const maskStyles = {
		backgroundColor: maskColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ bannerClasses } style={ styles }>
				<div className="smb-items__banner__figure">
					{ 1 > maskOpacity && (
						<div
							className="smb-items__banner__figure__mask"
							style={ maskStyles }
						/>
					) }
					{ !! imageURL ? (
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
							style={ imgStyles }
						/>
					) : (
						<div
							className="smb-items__banner__figure__dummy"
							style={ imgStyles }
						/>
					) }
				</div>

				{ ( ! RichText.isEmpty( title ) ||
					! RichText.isEmpty( lede ) ) && (
					<div className="smb-items__banner__body">
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
