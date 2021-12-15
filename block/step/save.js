import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-step', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-step__body',
				} ) }
			/>
		</div>
	);
}
