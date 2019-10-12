'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/price-menu--item' ];
	const template = [ [ 'snow-monkey-blocks/price-menu--item' ] ];

	const classes = classnames( 'smb-price-menu', className );

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
