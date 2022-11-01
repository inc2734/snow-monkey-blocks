import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

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
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-information__body',
				} ) }
			/>
		</div>
	);
}
