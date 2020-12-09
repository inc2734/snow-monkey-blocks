import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { labelAlign, labelVerticalAlign, smIsSplitColumn } = attributes;

	const classes = classnames( 'smb-information', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-sm-split-column={ smIsSplitColumn ? 'true' : undefined }
			data-label-align={ labelAlign || 'left' }
			data-label-vertical-align={ labelVerticalAlign || 'top' }
		>
			<div className="smb-information__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
