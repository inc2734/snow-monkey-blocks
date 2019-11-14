'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { className } ) {
	const blockClasses = classnames( 'smb-directory-structure', className );

	return (
		<div className={ blockClasses }>
			<InnerBlocks.Content />
		</div>
	);
}
