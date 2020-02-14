'use strict';

import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { title, price } = attributes;

	const classes = classnames( 'smb-price-menu__item', className );

	return (
		<div className={ classes }>
			<RichText
				className="smb-price-menu__item__title"
				placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
				value={ title }
				allowedFormats={ [] }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				keepPlaceholderOnFocus={ true }
			/>

			<RichText
				className="smb-price-menu__item__price"
				placeholder={ __( 'Write price...', 'snow-monkey-blocks' ) }
				value={ price }
				allowedFormats={ [] }
				onChange={ ( value ) => setAttributes( { price: value } ) }
				keepPlaceholderOnFocus={ true }
			/>
		</div>
	);
}
