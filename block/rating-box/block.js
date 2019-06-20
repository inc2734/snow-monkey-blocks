'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box', {
	title: __( 'Rating box', 'snow-monkey-blocks' ),
	description: __( 'Evaluate with bars.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-alignleft',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: 'https://snow-monkey.2inc.org/wp-content/uploads/2018/10/screenshot-9.png',
	},

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/rating-box--item' ];
		const template = [ [ 'snow-monkey-blocks/rating-box--item' ] ];

		const classes = classnames( 'smb-rating-box', className );

		return (
			<div className={ classes }>
				<div className="smb-rating-box__body">
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
		const classes = classnames( 'smb-rating-box', className );

		return (
			<div className={ classes }>
				<div className="smb-rating-box__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
