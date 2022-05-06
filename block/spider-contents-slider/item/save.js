import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		sliderId,
		contentPosition,
		contentPadding,
		border,
		boxShadow,
		style,
		backgroundColor,
	} = attributes;

	const classes = classnames( 'spider__slide', className );

	const itemClasses = classnames( 'smb-spider-contents-slider__item', {
		[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]: !! contentPadding,
	} );

	const newStyles = {
		backgroundColor:
			( ! backgroundColor && style?.color?.background ) || undefined,
		background:
			( ! backgroundColor && style?.color?.gradient ) || undefined,
		borderColor: border.color || undefined,
		borderWidth: ( border.color && border.width ) || undefined,
		borderRadius: border.radius || undefined,
		boxShadow: !! boxShadow.color
			? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	return (
		<div
			{ ...useBlockProps.save( { className: classes } ) }
			data-id={ sliderId }
			data-content-position={
				contentPosition?.replace( ' ', '-' ) || undefined
			}
			style={ newStyles }
		>
			<div
				{ ...useInnerBlocksProps.save( {
					className: itemClasses,
				} ) }
			/>
		</div>
	);
}
