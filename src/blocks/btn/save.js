import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		content,
		url,
		target,
		modifier,
		borderRadius,
		backgroundColor,
		backgroundGradientColor,
		textColor,
		wrap,
	} = attributes;

	const spacingProps = getSpacingClassesAndStyles( attributes );

	const wrapperClasses = classnames( 'smb-btn-wrapper', className, {
		[ `smb-btn-wrapper--${ modifier }` ]: !! modifier,
	} );

	const classes = classnames( 'smb-btn', {
		[ `smb-btn--${ modifier }` ]: !! modifier,
		'smb-btn--wrap': wrap,
	} );

	const styles = {
		'--smb-btn--background-color': backgroundColor || undefined,
		'--smb-btn--background-image': backgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( borderRadius ).match( /^\d+$/ )
			? `${ borderRadius }px`
			: borderRadius,
		'--smb-btn--color': textColor || undefined,
		...spacingProps.style,
	};

	if (
		!! attributes.className &&
		attributes.className.split( ' ' ).includes( 'is-style-ghost' )
	) {
		styles[ '--smb-btn--style--ghost--border-color' ] =
			backgroundColor || undefined;
	}

	return (
		<div { ...useBlockProps.save( { className: wrapperClasses } ) }>
			<a
				className={ classes }
				href={ url }
				style={ styles }
				target={ '_self' === target ? undefined : target }
				rel={ '_self' === target ? undefined : 'noopener noreferrer' }
			>
				<span className="smb-btn__label">
					<RichText.Content value={ content } />
				</span>
			</a>
		</div>
	);
}
