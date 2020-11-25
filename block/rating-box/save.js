import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-rating-box', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-rating-box__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
