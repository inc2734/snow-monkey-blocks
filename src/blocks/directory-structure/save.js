import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { iconColor } = attributes;

	const classes = classnames( 'smb-directory-structure', className );

	const styles = {
		'--smb-directory-structure--icon-color': iconColor || undefined,
	};

	return (
		<div
			{ ...useInnerBlocksProps.save(
				useBlockProps.save( { className: classes, style: styles } )
			) }
		/>
	);
}
