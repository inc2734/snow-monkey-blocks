'use strict';

import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/pricing-table', {
	title: __( 'Pricing table', 'snow-monkey-blocks' ),
	icon: 'warning',
	category: 'smb',

	edit() {
		const allowedBlocks = [ 'snow-monkey-blocks/pricing-table--item' ];
		const template = [ [ 'snow-monkey-blocks/pricing-table--item' ] ];

		return (
			<div className="smb-pricing-table">
				<div className="smb-pricing-table__row">
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
			<div className="smb-pricing-table">
				<div className="smb-pricing-table__row">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
