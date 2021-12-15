import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { columnSize, childrenCount } = attributes;

	const classes = classnames( 'smb-pricing-table', {
		[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
		[ className ]: !! className,
	} );

	const rowClasses = classnames( 'c-row', 'c-row--md-nowrap' );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-has-items={ 0 < childrenCount ? childrenCount : undefined }
		>
			<div
				{ ...useInnerBlocksProps.save( {
					className: rowClasses,
				} ) }
			/>
		</div>
	);
}
