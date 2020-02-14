'use strict';

import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function( { className } ) {
	const allowedBlocks = [
		'snow-monkey-blocks/directory-structure--item--directory',
		'snow-monkey-blocks/directory-structure--item--file',
	];

	const blockClasses = classnames( 'smb-directory-structure', className );

	return (
		<>
			<div className={ blockClasses }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					templateLock={ false }
				/>
			</div>
		</>
	);
}
