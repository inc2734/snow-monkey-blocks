'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/step--item', 'snow-monkey-blocks/step--item--free' ];
	const template = [ [ 'snow-monkey-blocks/step--item--free' ] ];

	const classes = classnames( 'smb-step', className );

	return (
		<div className={ classes }>
			<div className="smb-step__body">
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		</div>
	);
}
