'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { imageID, imageURL, imageAlt, caption } = attributes;

	const classes = classnames( 'smb-thumbnail-gallery__item', className );

	return (
		<div className={ classes }>
			<div className="smb-thumbnail-gallery__item__figure">
				<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
			</div>

			{ ! RichText.isEmpty( caption ) &&
				<div className="smb-thumbnail-gallery__item__caption">
					<RichText.Content value={ caption } />
				</div>
			}
		</div>
	);
}
