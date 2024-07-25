import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function ( { attributes } ) {
	const { boxShadow } = attributes;

	const classes = classnames( 'smb-flex' );

	const styles = {
		'--smb-flex--box-shadow': !! boxShadow.color
			? `${ boxShadow.horizontal }px ${ boxShadow.vertical }px ${
					boxShadow.blur
			  }px ${ boxShadow.spread }px ${ hexToRgba(
					boxShadow.color,
					boxShadow.opacity
			  ) }`
			: undefined,
	};

	return (
		<div
			{ ...useInnerBlocksProps.save( {
				...useBlockProps.save( { className: classes, style: styles } ),
			} ) }
		/>
	);
}
