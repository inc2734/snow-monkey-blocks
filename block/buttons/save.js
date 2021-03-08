import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const { contentJustification } = attributes;

	const classes = classnames( 'smb-buttons', className, {
		[ `is-content-justification-${ contentJustification }` ]: contentJustification,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<InnerBlocks.Content />
		</div>
	);
}
