'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/accordion--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'editor-justify',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/accordion' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { title } = attributes;

		const classes = classnames( 'smb-accordion__item', className );

		return (
			<div className={ classes }>
				<div className="smb-accordion__item__title">
					<RichText
						value={ title }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>
				</div>
				<div className="smb-accordion__item__body">
					<InnerBlocks />
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { title } = attributes;

		const classes = classnames( 'smb-accordion__item', className );

		return (
			<div className={ classes }>
				<div className="smb-accordion__item__title">
					<RichText.Content value={ title } />
				</div>
				<input type="checkbox" className="smb-accordion__item__control" />
				<div className="smb-accordion__item__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
