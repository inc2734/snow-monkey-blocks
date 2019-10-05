'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block';
import { schema } from './_schema';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/exclusive-accordion', {
	title: __( 'Exclusive Accordion', 'snow-monkey-blocks' ),
	description: __( 'You can set up a content area that expands and contracts like the accordion.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-justify',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/exclusive-accordion.png`,
	},
	attributes: schema,

	edit( { attributes, setAttributes, className, clientId } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/exclusive-accordion--item' ];
		const template = [ [ 'snow-monkey-blocks/exclusive-accordion--item' ] ];

		const classes = classnames( 'smb-exclusive-accordion', className );

		const { blockId } = attributes;
		if ( '' === blockId ) {
			setAttributes( { blockId: clientId } );
		}

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
		const classes = classnames( 'smb-exclusive-accordion', className );

		return (
			<div className={ classes }>
				<InnerBlocks.Content />
			</div>
		);
	},

} );
