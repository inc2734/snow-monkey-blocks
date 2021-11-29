import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sliderId, contentPosition, contentPadding } = attributes;

	const classes = classnames( 'spider__slide', className );

	const itemClasses = classnames( 'smb-spider-contents-slider__item', {
		[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]: !! contentPadding,
	} );

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-id={ sliderId }
			data-content-position={
				contentPosition?.replace( ' ', '-' ) || undefined
			}
		>
			<div className={ itemClasses }>
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
