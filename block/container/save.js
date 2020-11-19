import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { isSlim } = attributes;

	const classes = classnames( 'smb-container', 'c-container', className );

	const bodyClasses = classnames( 'smb-container__body', {
		'u-slim-width': !! isSlim,
	} );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className={ bodyClasses }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
