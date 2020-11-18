import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-accordion', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<InnerBlocks.Content />
		</div>
	);
}
