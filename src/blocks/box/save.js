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

	const boxStyles = {
		color: textColor || undefined,
		borderRadius: 0 <= borderRadius ? `${ borderRadius }px` : undefined,
		boxShadow: !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	const backgroundStyles = {
		backgroundColor: backgroundColor || undefined,
		backgroundImage: backgroundGradientColor || undefined,
		borderColor: borderColor || undefined,
		borderWidth: borderWidth || undefined,
		borderRadius: 0 <= borderRadius ? `${ borderRadius }px` : undefined,
		opacity,
	};

	const classes = classnames( 'smb-box', className, {
		[ `smb-box--p-${ contentPadding }` ]: !! contentPadding,
	} );

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				style: boxStyles,
			} ) }
		>
			<div className="smb-box__background" style={ backgroundStyles } />
			<div
				{ ...useInnerBlocksProps.save( {
					className: 'smb-box__body',
				} ) }
			/>
		</div>
	);
}
