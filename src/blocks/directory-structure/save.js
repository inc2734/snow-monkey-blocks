import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-directory-structure', className );

	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( { className: classes } )
			) }
		/>
	);
}
