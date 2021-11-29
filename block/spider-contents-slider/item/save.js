import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sliderId, contentPosition } = attributes;

	const classes = classnames( 'spider__slide', className );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-id={ sliderId }
			data-content-position={
				contentPosition?.replace( ' ', '-' ) || undefined
			}
		>
			<div className="smb-spider-contents-slider__item">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
