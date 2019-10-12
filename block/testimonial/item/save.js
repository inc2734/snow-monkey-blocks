'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/editor';

export default function( { attributes, className } ) {
	const { avatarID, avatarURL, avatarAlt, name, lede, content } = attributes;

	const colClasses = classnames( 'c-row__col', className );

	return (
		<div className={ colClasses }>
			<div className="smb-testimonial__item">
				<div className="smb-testimonial__item__figure">
					<img src={ avatarURL } alt={ avatarAlt } className={ `wp-image-${ avatarID }` } />
				</div>
				<div className="smb-testimonial__item__body">
					<div className="smb-testimonial__item__content">
						<RichText.Content value={ content } />
					</div>

					<div className="smb-testimonial__item__name">
						<RichText.Content value={ name } />
					</div>

					{ ! RichText.isEmpty( lede ) &&
						<div className="smb-testimonial__item__lede">
							<RichText.Content value={ lede } />
						</div>
					}
				</div>
			</div>
		</div>
	);
}
