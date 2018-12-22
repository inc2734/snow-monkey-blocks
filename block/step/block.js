'use strict';

import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/step', {
	title: __( 'Step', 'snow-monkey-blocks' ),
	icon: 'editor-ol',
	category: 'smb',

	edit() {
		const allowedBlocks = [ 'snow-monkey-blocks/step--item' ];
		const template = [ [ 'snow-monkey-blocks/step--item' ] ];

		return (
			<div className="smb-step">
				<div className="smb-step__body">
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
			<div className="smb-step">
				<div className="smb-step__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
