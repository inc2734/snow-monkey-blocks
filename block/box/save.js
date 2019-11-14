'use strict';

import classnames from 'classnames';

import {
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

	const boxStyles = {
		backgroundColor: backgroundColor || undefined,
		borderColor: borderColor || undefined,
		color: textColor || undefined,
		borderWidth: borderWidth || undefined,
	};

	const classes = classnames( 'smb-box', className );

	return (
		<div className={ classes } style={ boxStyles }>
			<div className="smb-box__body">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
