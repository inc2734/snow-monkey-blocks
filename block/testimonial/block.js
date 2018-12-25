'use strict';

import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/testimonial', {
	title: __( 'Testimonial', 'snow-monkey-blocks' ),
	icon: 'admin-comments',
	category: 'smb',

	edit() {
		const allowedBlocks = [ 'snow-monkey-blocks/testimonial--item' ];
		const template = [ [ 'snow-monkey-blocks/testimonial--item' ] ];

		return (
			<div className="smb-testimonial">
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

	save() {
		return (
			<div className="smb-testimonial">
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
