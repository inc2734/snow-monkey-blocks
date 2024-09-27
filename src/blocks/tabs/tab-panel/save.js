import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { ariaHidden } = attributes;

	const classes = classnames( 'smb-tab-panel', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			aria-hidden={ ariaHidden }
			role="tabpanel"
		>
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-tab-panel__body',
				} ) }
			/>
		</div>
	);
}
