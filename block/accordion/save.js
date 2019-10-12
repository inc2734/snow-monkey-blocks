'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { className } ) {
	const classes = classnames( 'smb-accordion', className );

	return (
		<div className={ classes }>
			<InnerBlocks.Content />
		</div>
	);
}
