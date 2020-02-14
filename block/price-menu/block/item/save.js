'use strict';

import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { title, price } = attributes;

	const classes = classnames( 'smb-price-menu__item', className );

	return (
		<div className={ classes }>
			<div className="smb-price-menu__item__title">
				<RichText.Content value={ title } />
			</div>

			<div className="smb-price-menu__item__price">
				<RichText.Content value={ price } />
			</div>
		</div>
	);
}
