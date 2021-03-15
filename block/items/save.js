import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sm, md, lg, isGlue, isFill, verticalAlignment } = attributes;

	const classes = classnames( 'smb-items', className, {
		'smb-items--glue': isGlue,
		'smb-items--fill': isFill,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--margin': ! isGlue,
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				className={ rowClasses }
				data-columns={ sm }
				data-md-columns={ md }
				data-lg-columns={ lg }
			>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
