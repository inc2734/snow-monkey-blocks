import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		textColor,
		borderWidth,
		borderRadius,
		opacity,
	} = attributes;

	const boxStyles = {
		color: textColor || undefined,
		borderRadius: !! borderRadius ? `${ borderRadius }px` : undefined,
	};

	const backgroundStyles = {
		backgroundColor: backgroundColor || undefined,
		backgroundImage: backgroundGradientColor || undefined,
		borderColor: borderColor || undefined,
		borderWidth: borderWidth || undefined,
		borderRadius:
			!! borderRadius || 0 <= borderRadius
				? `${ borderRadius }px`
				: undefined,
		opacity,
	};

	const classes = classnames( 'smb-box', className );

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				style: boxStyles,
			} ) }
		>
			<div className="smb-box__background" style={ backgroundStyles } />
			<div className="smb-box__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
