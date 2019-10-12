'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/editor';

export default function( { attributes, className } ) {
	const { isSlim } = attributes;

	const classes = classnames( 'smb-container', 'c-container', className );

	const bodyClasses = classnames(
		'smb-container__body',
		{
			'u-slim-width': !! isSlim,
		}
	);

	return (
		<div className={ classes }>
			<div className={ bodyClasses }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
