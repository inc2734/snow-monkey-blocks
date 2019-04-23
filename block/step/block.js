'use strict';

import classnames from 'classnames';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/step', {
	title: __( 'Step', 'snow-monkey-blocks' ),
	description: __( 'Express the steps in an easy-to-understand manner.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#bd3c4f',
		src: 'editor-ol',
	},
	category: 'smb',

	edit( { className } ) {
		const allowedBlocks = [ 'snow-monkey-blocks/step--item' ];
		const template = [ [ 'snow-monkey-blocks/step--item' ] ];

		const classes = classnames( 'smb-step', className );

		return (
			<div className={ classes }>
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

	save( { className } ) {
		const classes = classnames( 'smb-step', className );

		return (
			<div className={ classes }>
				<div className="smb-step__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
