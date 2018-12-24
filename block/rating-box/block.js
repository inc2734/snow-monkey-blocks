'use strict';

import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box', {
	title: __( 'Rating box', 'snow-monkey-blocks' ),
	icon: 'editor-alignleft',
	category: 'smb',

	edit() {
		const allowedBlocks = [ 'snow-monkey-blocks/rating-box--item' ];
		const template = [ [ 'snow-monkey-blocks/rating-box--item' ] ];

		return (
			<div className="smb-rating-box">
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

	save() {
		return (
			<div className="smb-rating-box">
				<div className="smb-rating-box__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
