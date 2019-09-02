'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../src/js/config/block';
import { schema } from './_schema';

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/price-menu--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the price menu block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/price-menu' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { title, price } = attributes;

		const classes = classnames( 'smb-price-menu__item', className );

		return (
			<div className={ classes }>
				<RichText
					className="smb-price-menu__item__title"
					placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
					value={ title }
					formattingControls={ [] }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					keepPlaceholderOnFocus={ true }
				/>

				<RichText
					className="smb-price-menu__item__price"
					placeholder={ __( 'Write price...', 'snow-monkey-blocks' ) }
					value={ price }
					formattingControls={ [] }
					onChange={ ( value ) => setAttributes( { price: value } ) }
					keepPlaceholderOnFocus={ true }
				/>
			</div>
		);
	},

	save( { attributes, className } ) {
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
	},
} );
