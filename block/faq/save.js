import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { className } ) {
	const classes = classnames( 'smb-faq', className );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-faq__body',
				} ) }
			/>
		</div>
	);
}
