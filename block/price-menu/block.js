'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/price-menu', {
	title: __( 'Price menu', 'snow-monkey-blocks' ),
	description: __( 'Display the menu name and the price.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/price-menu.png`,
	},

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/price-menu--item' ];
		const template = [ [ 'snow-monkey-blocks/price-menu--item' ] ];

		const classes = classnames( 'smb-price-menu', className );

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
		const classes = classnames( 'smb-price-menu', className );

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
