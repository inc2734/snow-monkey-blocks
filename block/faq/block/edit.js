'use strict';

import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/faq--item' ];
	const template = [ [ 'snow-monkey-blocks/faq--item' ] ];

	const classes = classnames( 'smb-faq', className );

	return (
		<div className={ classes }>
			<div className="smb-faq__body">
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		</div>
	);
}
