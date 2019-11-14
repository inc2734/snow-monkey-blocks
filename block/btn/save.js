'use strict';

import classnames from 'classnames';

import {
	RichText,
} from '@wordpress/block-editor';

export default function( { attributes, className } ) {
	const { content, url, target, modifier, backgroundColor, textColor } = attributes;

	const wrapperClasses = classnames( 'u-clearfix', 'smb-btn-wrapper', className );

	const classes = classnames(
		'smb-btn',
		{
			[ `smb-btn--${ modifier }` ]: !! modifier,
		}
	);

	const btnStyles = {
		backgroundColor: backgroundColor || undefined,
	};
	if ( 'is-style-ghost' === attributes.className ) {
		btnStyles.borderColor = backgroundColor || '#fff';
	}

	const btnLabelStyles = {
		color: textColor || undefined,
	};

	return (
		<div className={ wrapperClasses }>
			<a
				className={ classes }
				href={ url }
				style={ btnStyles }
				target={ '_self' === target ? undefined : target }
				rel={ '_self' === target ? undefined : 'noopener noreferrer' }
			>
				<span className="smb-btn__label" style={ btnLabelStyles }>
					<RichText.Content value={ content } />
				</span>
			</a>
		</div>
	);
}
