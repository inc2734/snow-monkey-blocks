'use strict';

import classnames from 'classnames';
import Figure from '../../../src/js/component/figure';

import {
	RichText,
} from '@wordpress/editor';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, isSelected, className } ) {
	const { imageID, imageURL, imageAlt, caption } = attributes;

	const classes = classnames( 'smb-thumbnail-gallery__item', className );

	return (
		<div className={ classes }>
			<div className="smb-thumbnail-gallery__item__figure">
				<Figure
					url={ imageURL }
					id={ imageID }
					alt={ imageAlt }
					selectHandler={ ( media ) => {
						const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
						setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
					} }
					removeHandler={ () => setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } ) }
					isSelected={ isSelected }
				/>
			</div>

			{ ( ! RichText.isEmpty( caption ) || isSelected ) &&
				<RichText
					className="smb-thumbnail-gallery__item__caption"
					placeholder={ __( 'Write caption...', 'snow-monkey-blocks' ) }
					value={ caption }
					onChange={ ( value ) => setAttributes( { caption: value } ) }
				/>
			}
		</div>
	);
}
