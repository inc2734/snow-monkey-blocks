import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-price-menu', className );

	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( { className: classes } )
			) }
		/>
	);
}
