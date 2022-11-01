import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { contentsMaxWidth, isSlim } = attributes;

	const classes = classnames( 'smb-container', 'c-container', className );

	const bodyClasses = classnames( 'smb-container__body', {
		'u-slim-width': isSlim && ! contentsMaxWidth,
	} );

	const bodyStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				{ ...useInnerBlocksProps.save( {
					className: bodyClasses,
					style: bodyStyles,
				} ) }
			/>
		</div>
	);
}
