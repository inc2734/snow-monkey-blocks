import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const { textAlign } = attributes;

	const classes = classnames( 'smb-buttons', className, {
		[ `has-text-align-${ textAlign }` ]: textAlign,
	} );

	return (
		<div className={ classes }>
			<InnerBlocks.Content />
		</div>
	);
}
