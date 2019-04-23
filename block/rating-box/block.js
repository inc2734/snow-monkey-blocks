'use strict';

import classnames from 'classnames';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box', {
	title: __( 'Rating box', 'snow-monkey-blocks' ),
	description: __( 'Evaluate with bars.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#cd162c',
		src: 'editor-alignleft',
	},
	category: 'smb',

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
