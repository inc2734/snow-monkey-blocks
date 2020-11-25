import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sm, md, lg } = attributes;

	const classes = classnames( 'smb-items', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				className="c-row c-row--margin"
				data-columns={ sm }
				data-md-columns={ md }
				data-lg-columns={ lg }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
