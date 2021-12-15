import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const { contentJustification } = attributes;

	const classes = classnames( 'smb-buttons', className, {
		[ `is-content-justification-${ contentJustification }` ]: contentJustification,
	} );

	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( { className: classes } )
			) }
		/>
	);
}
