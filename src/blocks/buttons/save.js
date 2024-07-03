import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save() {
	const classes = classnames( 'smb-buttons' );

	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( { className: classes } )
			) }
		/>
	);
}
