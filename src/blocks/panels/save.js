import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sm, md, lg, imagePadding, contentJustification } = attributes;

	const classes = classnames( 'smb-panels', className );

	const contentJustificationModifier =
		!! contentJustification && 'left' !== contentJustification
			? contentJustification.replace( 'space-', '' )
			: undefined;

	const rowClasses = classnames( 'c-row', 'c-row--margin', 'c-row--fill', {
		[ `c-row--${ contentJustificationModifier }` ]: contentJustification,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-image-padding={ imagePadding }
		>
			<div
				{ ...useInnerBlocksProps.save( {
					className: rowClasses,
				} ) }
				data-columns={ sm }
				data-md-columns={ md }
				data-lg-columns={ lg }
			/>
		</div>
	);
}
