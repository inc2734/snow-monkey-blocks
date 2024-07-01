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
		backgroundColor,
		style,
	} = attributes;

	const classes = classnames( 'spider__slide', className );

	const itemClasses = classnames( 'smb-spider-contents-slider__item', {
		[ `smb-spider-contents-slider__item--p-${ contentPadding }` ]:
			!! contentPadding,
	} );

	const borderWidth = String( border.width ).match( /^\d+$/ )
		? `${ border.width }px`
		: border.width;

	const borderRadius = String( border.radius ).match( /^\d+$/ )
		? `${ border.radius }px`
		: border.radius;

	const styles = {
		'--smb-spider-contents-slider--slide-border-width':
			( !! border.color && 0 < parseInt( borderWidth ) && borderWidth ) ||
			undefined,
		'--smb-spider-contents-slider--slide-border-color':
			border.color || undefined,
		'--smb-spider-contents-slider--slide-border-type':
			border.style || undefined,
		'--smb-spider-contents-slider--slide-border-radius':
			( 0 < parseInt( borderRadius ) && borderRadius ) || undefined,
		'--smb-spider-contents-slider--slide-box-shadow': !! boxShadow.color
			? `0 0 ${ boxShadow.blur }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
		'--smb-spider-contents-slider--slide-background-color':
			!! backgroundColor
				? `var(--wp--preset--color--${ backgroundColor })`
				: style?.color?.background || undefined,
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
