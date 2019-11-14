'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { columnSize } = attributes;

	const classes = classnames(
		'smb-pricing-table',
		{
			[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
			[ className ]: !! className,
		}
	);

	return (
		<div className={ classes }>
			<div className="c-row c-row--md-nowrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
