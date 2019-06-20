'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/testimonial', {
	title: __( 'Testimonial', 'snow-monkey-blocks' ),
	description: __( 'Let\'s arrange the voice of the customer.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: null,
	},

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/testimonial--item' ];
		const template = [ [ 'snow-monkey-blocks/testimonial--item' ] ];

		const classes = classnames( 'smb-testimonial', className );

		return (
			<div className={ classes }>
				<div className="smb-testimonial__body">
					<div className="c-row c-row--margin" data-columns="1" data-md-columns="2">
						<InnerBlocks
							allowedBlocks={ allowedBlocks }
							template={ template }
							templateLock={ false }
						/>
					</div>
				</div>
			</div>
		);
	},

	save( { className } ) {
		const classes = classnames( 'smb-testimonial', className );

		return (
			<div className={ classes }>
				<div className="smb-testimonial__body">
					<div className="c-row c-row--margin" data-columns="1" data-md-columns="2">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
