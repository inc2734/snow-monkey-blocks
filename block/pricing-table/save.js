import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { columnSize, childrenCount } = attributes;

	const classes = classnames( 'smb-pricing-table', {
		[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
		[ className ]: !! className,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-has-items={ 0 < childrenCount ? childrenCount : undefined }
		>
			<div className="c-row c-row--md-nowrap">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
