'use strict';

import classnames from 'classnames';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/faq', {
	title: __( 'FAQ', 'snow-monkey-blocks' ),
	icon: 'businessman',
	category: 'smb',

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/faq--item' ];
		const template = [ [ 'snow-monkey-blocks/faq--item' ] ];

		return (
			<div className={ classnames( 'smb-faq', className ) }>
				<div className="smb-faq__body">
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
			<div className="smb-faq">
				<div className="smb-faq__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
