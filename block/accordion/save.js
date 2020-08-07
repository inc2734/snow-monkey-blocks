import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function( { className } ) {
	const classes = classnames( 'smb-accordion', className );

	return (
		<div className={ classes }>
			<InnerBlocks.Content />
		</div>
	);
}
