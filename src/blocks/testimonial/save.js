import classnames from 'classnames';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { md, lg } = attributes;

	const classes = classnames( 'smb-testimonial', className );
	const rowClasses = classnames( 'c-row', 'c-row--margin' );

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-testimonial__body">
				<div
					{ ...useInnerBlocksProps.save( {
						className: rowClasses,
					} ) }
					data-columns="1"
					data-md-columns={ md }
					data-lg-columns={ lg }
				/>
			</div>
		</div>
	);
}
