import classnames from 'classnames';

import { InnerBlocks } from '@wordpress/block-editor';

export default function save( { attributes, className } ) {
	const { align } = attributes;

	const classes = classnames( 'smb-buttons', className, {
		[ `has-text-align-${ align }` ]: align,
	} );

	return (
		<div className={ classes }>
			<InnerBlocks.Content />
		</div>
	);
}
