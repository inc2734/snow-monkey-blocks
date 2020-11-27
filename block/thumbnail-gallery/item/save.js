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
	} = attributes;

	const classes = classnames( 'smb-thumbnail-gallery__item', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-thumbnail-gallery__item__figure">
				<img
					src={ imageURL }
					alt={ imageAlt }
					width={ !! imageWidth && imageWidth }
					height={ !! imageHeight && imageHeight }
					className={ `wp-image-${ imageID }` }
				/>
			</div>

			{ ! RichText.isEmpty( caption ) && (
				<div className="smb-thumbnail-gallery__item__caption">
					<RichText.Content value={ caption } />
				</div>
			) }
		</div>
	);
}
