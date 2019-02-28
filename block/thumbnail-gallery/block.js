'use strict';

import classnames from 'classnames';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/thumbnail-gallery', {
	title: __( 'Thumbnail gallery', 'snow-monkey-blocks' ),
	icon: 'format-gallery',
	category: 'smb',
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/thumbnail-gallery--item' ];
		const template = [ [ 'snow-monkey-blocks/thumbnail-gallery--item' ] ];

		const classes = classnames( 'smb-thumbnail-gallery', className );

		return (
			<div className={ classes }>
				<div className="smb-thumbnail-gallery__canvas">
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						template={ template }
						templateLock={ false }
					/>
				</div>
			</div>
		);
	},

	save( { className } ) {
		const classes = classnames( 'smb-thumbnail-gallery', className );

		return (
			<div className={ classes }>
				<div className="smb-thumbnail-gallery__canvas">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
