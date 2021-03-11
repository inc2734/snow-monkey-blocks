import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		backgroundColor,
		backgroundGradientColor,
		borderColor,
		textColor,
		borderWidth,
		opacity,
	} = attributes;

	const boxStyles = {
		color: textColor || undefined,
	};

	const backgroundStyles = {
		backgroundColor: backgroundColor || undefined,
		backgroundImage: backgroundGradientColor || undefined,
		borderColor: borderColor || undefined,
		borderWidth: borderWidth || undefined,
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
