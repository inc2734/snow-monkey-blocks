'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

export default function( { className } ) {
	const allowedBlocks = [
		'snow-monkey-blocks/directory-structure--item--directory',
		'snow-monkey-blocks/directory-structure--item--file',
	];

	const blockClasses = classnames( 'smb-directory-structure', className );

	return (
		<Fragment>
			<div className={ blockClasses }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					templateLock={ false }
				/>
			</div>
		</Fragment>
	);
}
