'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/accordion', {
	title: __( 'Accordion', 'snow-monkey-blocks' ),
	description: __( 'You can set up a content area that expands and contracts like the accordion.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-justify',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: 'https://snow-monkey.2inc.org/wp-content/uploads/2019/04/screenshot-19.png',
	},

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/accordion--item' ];
		const template = [ [ 'snow-monkey-blocks/accordion--item' ] ];

		const classes = classnames( 'smb-accordion', className );

		return (
			<div className={ classes }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		);
	},

	save( { className } ) {
		const classes = classnames( 'smb-accordion', className );

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		);
	},

	deprecated: deprecated,
} );
