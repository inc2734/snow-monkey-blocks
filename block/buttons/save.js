import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const { textAlign } = attributes;

	const classes = classnames( 'smb-buttons', className, {
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<InnerBlocks.Content />
		</div>
	);
}
