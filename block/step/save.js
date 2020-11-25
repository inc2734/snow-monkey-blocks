import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-step', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-step__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
