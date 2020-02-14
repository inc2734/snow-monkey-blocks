'use strict';

import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/rating-box--item' ];
	const template = [ [ 'snow-monkey-blocks/rating-box--item' ] ];

	const classes = classnames( 'smb-rating-box', className );

	return (
		<div className={ classes }>
			<div className="smb-rating-box__body">
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		</div>
	);
}
