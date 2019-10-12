'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/accordion--item' ];
	const template = [ [ 'snow-monkey-blocks/accordion--item' ] ];

	const classes = classnames( 'smb-accordion', className );

	return (
		<div className={ classes }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ template }
				templateLock={ false }
			/>
		</div>
	);
}
