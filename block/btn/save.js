import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( props ) {
	const { attributes, className } = props;
	const {
		content,
		url,
		target,
		modifier,
		borderRadius,
		backgroundColor,
		textColor,
		wrap,
	} = attributes;

	const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
		[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
	} );

	const classes = classnames( 'smb-btn', {
		[ `smb-btn--${ modifier }` ]: !! modifier,
		'smb-btn--wrap': wrap,
	} );

	const btnStyles = {
		backgroundColor: backgroundColor || undefined,
		borderRadius:
			'undefined' !== typeof borderRadius
				? `${ borderRadius }px`
				: undefined,
	};
	if ( 'is-style-ghost' === attributes.className ) {
		btnStyles.borderColor = backgroundColor || undefined;
	}

	const btnLabelStyles = {
		color: textColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: wrapperClasses } ) }>
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
