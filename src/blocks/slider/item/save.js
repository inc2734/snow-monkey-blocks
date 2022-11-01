import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		caption,
		url,
		target,
	} = attributes;

	const classes = classnames( 'smb-slider__item', className );

	const item = (
		<>
			<div className="smb-slider__item__figure">
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
					decoding="auto"
					loading="auto"
				/>
			</div>

			{ ! RichText.isEmpty( caption ) && (
				<div className="smb-slider__item__caption">
					<RichText.Content value={ caption } />
				</div>
			) }
		</>
	);

	return !! url ? (
		<a
			{ ...useBlockProps.save( { className: classes } ) }
			href={ url }
			target={ '_self' === target ? undefined : target }
			rel={ '_self' === target ? undefined : 'noopener noreferrer' }
		>
			{ item }
		</a>
	) : (
		<div { ...useBlockProps.save( { className: classes } ) }>{ item }</div>
	);
}
