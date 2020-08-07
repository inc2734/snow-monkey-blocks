import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function( { className } ) {
	const classes = classnames( 'smb-faq', className );

	return (
		<div className={ classes }>
			<div className="smb-faq__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
