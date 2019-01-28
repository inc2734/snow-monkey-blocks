'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/accordion', {
	title: __( 'Accordion', 'snow-monkey-blocks' ),
	icon: 'editor-justify',
	category: 'smb',

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/accordion--item' ];
		const template = [ [ 'snow-monkey-blocks/accordion--item' ] ];

		return (
			<div className={ classnames( 'smb-accordion', className ) }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		);
	},

	save() {
		return (
			<div className="smb-accordion">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
