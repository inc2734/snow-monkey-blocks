import classnames from 'classnames';

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { icon, iconColor } = attributes;

	const classes = classnames( 'smb-list', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-icon={ icon }
			data-icon-color={ iconColor }
		>
			<ul { ...useInnerBlocksProps.save() } />
		</div>
	);
}
