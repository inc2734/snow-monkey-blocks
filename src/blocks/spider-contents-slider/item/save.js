import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { sliderId, contentPosition, contentPadding, border, boxShadow } =
		attributes;

	const classes = classnames( 'spider__slide', className );

	const itemClasses = classnames( 'smb-spider-contents-slider__item', {
		[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
			!! contentPadding,
	} );

	const styles = {
		'--smb-spider-contents-slider--slide-border-width':
			( border.color && border.width ) || undefined,
		'--smb-spider-contents-slider--slide-border-color':
			border.color || undefined,
		'--smb-spider-contents-slider--slide-border-radius':
			border.radius || undefined,
		'--smb-spider-contents-slider--slide-box-shadow': !! boxShadow.color
			? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	return (
		<div
			{ ...useBlockProps.save( { className: classes, style: styles } ) }
			data-id={ sliderId }
			data-content-position={
				contentPosition?.replace( ' ', '-' ) || undefined
			}
		>
			<div
				{ ...useInnerBlocksProps.save( {
					className: itemClasses,
				} ) }
			/>
		</div>
	);
}
