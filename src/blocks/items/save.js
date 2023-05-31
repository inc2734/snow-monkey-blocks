import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		sm,
		md,
		lg,
		isGlue,
		isFill,
		verticalAlignment,
		contentJustification,
		gap,
	} = attributes;

	const classes = classnames( 'smb-items', className, {
		'smb-items--glue': isGlue && ! gap,
		'smb-items--fill': isFill,
	} );

	const contentJustificationModifier =
		!! contentJustification && 'left' !== contentJustification
			? contentJustification.replace( 'space-', '' )
			: undefined;

	const rowClasses = classnames( 'c-row', {
		'c-row--margin': ! isGlue && ( 'm' === gap || ! gap ),
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
		[ `c-row--${ contentJustificationModifier }` ]: contentJustification,
		[ `c-row--margin-${ gap }` ]:
			! isGlue && ( 's' === gap || 'l' === gap ),
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
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
