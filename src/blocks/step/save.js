import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { tagName } = attributes;

	const TagName = tagName;
	const classes = classnames( 'smb-step', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<TagName
				{ ...useInnerBlocksProps.save( {
					className: 'smb-step__body',
				} ) }
			/>
		</div>
	);
}
