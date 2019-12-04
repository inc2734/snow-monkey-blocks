'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { className } ) {
	const classes = classnames( 'smb-step', className );

	return (
		<div className={ classes }>
			<div className="smb-step__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
