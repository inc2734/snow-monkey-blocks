import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sm, md, lg, imagePadding } = attributes;

	const classes = classnames( 'smb-panels', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-image-padding={ imagePadding }
		>
			<div
				className="c-row c-row--margin c-row--fill"
				data-columns={ sm }
				data-md-columns={ md }
				data-lg-columns={ lg }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
