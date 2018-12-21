'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/accordion--item', {
	title: __( 'Accordion item', 'snow-monkey-blocks' ),
	icon: 'editor-justify',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/accordion' ],
	attributes: {
		title: {
			source: 'html',
			selector: '.smb-accordion__item__title',
		},
	},

	edit( { attributes, setAttributes } ) {
		const { title } = attributes;

		return (
			<div className="smb-accordion__item">
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

	save( { attributes } ) {
		const { title } = attributes;

		return (
			<div className="smb-accordion__item">
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
} );
