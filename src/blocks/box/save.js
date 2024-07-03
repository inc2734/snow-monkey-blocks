import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		borderStyle,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
		boxShadow,
	} = attributes;

	const styles = {
		'--smb-box--color': textColor || undefined,
		'--smb-box--border-radius': String( borderRadius ).match( /^\d+$/ )
			? `${ borderRadius }px`
			: borderRadius,
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
		'--smb-box--background-opacity': String( opacity ),
		'--smb-box--border-color': borderColor || undefined,
		'--smb-box--border-style': borderStyle || undefined,
		'--smb-box--border-width': String( borderWidth ).match( /^\d+$/ )
			? `${ borderWidth }px`
			: borderWidth,
	};

	const classes = classnames( 'smb-box' );

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
