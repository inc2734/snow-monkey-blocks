'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { className } ) {
	const blockClasses = classnames( 'smb-directory-structure', className );

	return (
		<div className={ blockClasses }>
			<InnerBlocks.Content />
		</div>
	);
}
