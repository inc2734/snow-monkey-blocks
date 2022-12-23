import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
		contentPadding,
		boxShadow,
	} = attributes;

	const styles = {
		'--smb-box--color': textColor || undefined,
		'--smb-box--border-radius':
			0 <= borderRadius ? `${ borderRadius }px` : undefined,
		'--smb-box--box-shadow': !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
		'--smb-box--background-color': backgroundColor || undefined,
		'--smb-box--background-image': backgroundGradientColor || undefined,
		'--smb-box--background-opacity': opacity,
		'--smb-box--border-color': borderColor || undefined,
		'--smb-box--border-width':
			0 <= borderWidth ? `${ borderWidth }px` : undefined,
	};

	const classes = classnames( 'smb-box', className, {
		[ `smb-box--p-${ contentPadding }` ]: !! contentPadding,
	} );

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				style: styles,
			} ) }
		>
			<div className="smb-box__background" />
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-box__body',
				} ) }
			/>
		</div>
	);
}
