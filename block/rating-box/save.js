'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { className } ) {
	const classes = classnames( 'smb-rating-box', className );

	return (
		<div className={ classes }>
			<div className="smb-rating-box__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
