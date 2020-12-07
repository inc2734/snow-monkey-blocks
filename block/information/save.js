import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { smIsSplitColumn } = attributes;

	const classes = classnames( 'smb-information', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-sm-split-column={ smIsSplitColumn ? 'true' : undefined }
		>
			<div className="smb-information__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
