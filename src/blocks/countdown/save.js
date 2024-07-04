import classnames from 'classnames';

import { useBlockProps, getFontSizeClass } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, className } ) {
	const {
		alignment,
		numericColor,
		clockColor,
		countdownTime,
		numericFontSizeSlug,
		numericFontSize,
		clockFontSizeSlug,
		clockFontSize,
	} = attributes;

	const classes = classnames( 'smb-countdown', className );

	const listClasses = classnames( 'smb-countdown__list', {
		[ `align-${ alignment }` ]: !! alignment,
	} );

	const styles = {
		'--smb-countdown--numeric-color': numericColor || undefined,
		'--smb-countdown--clock-color': clockColor || undefined,
	};

	const clockFontSizeClass = !! clockFontSizeSlug
		? getFontSizeClass( clockFontSizeSlug )
		: undefined;

	const numericFontSizeClass = !! numericFontSizeSlug
		? getFontSizeClass( numericFontSizeSlug )
		: undefined;

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<ul className={ listClasses } data-time={ countdownTime }>
				<li className="smb-countdown__list-item smb-countdown__list-item__days">
					<span
						className={ classnames(
							'smb-countdown__list-item__numeric',
							numericFontSizeClass
						) }
						style={ { fontSize: numericFontSize || undefined } }
					>
						-
					</span>
					<span
						className={ classnames(
							'smb-countdown__list-item__clock',
							clockFontSizeClass
						) }
						style={ { fontSize: clockFontSize || undefined } }
					>
						{ __( 'Days', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__hours">
					<span
						className={ classnames(
							'smb-countdown__list-item__numeric',
							numericFontSizeClass
						) }
						style={ { fontSize: numericFontSize || undefined } }
					>
						--
					</span>
					<span
						className={ classnames(
							'smb-countdown__list-item__clock',
							clockFontSizeClass
						) }
						style={ { fontSize: clockFontSize || undefined } }
					>
						{ __( 'Hours', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
					<span
						className={ classnames(
							'smb-countdown__list-item__numeric',
							numericFontSizeClass
						) }
						style={ { fontSize: numericFontSize || undefined } }
					>
						--
					</span>
					<span
						className={ classnames(
							'smb-countdown__list-item__clock',
							clockFontSizeClass
						) }
						style={ { fontSize: clockFontSize || undefined } }
					>
						{ __( 'Minutes', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
					<span
						className={ classnames(
							'smb-countdown__list-item__numeric',
							numericFontSizeClass
						) }
						style={ { fontSize: numericFontSize || undefined } }
					>
						--
					</span>
					<span
						className={ classnames(
							'smb-countdown__list-item__clock',
							clockFontSizeClass
						) }
						style={ { fontSize: clockFontSize || undefined } }
					>
						{ __( 'Seconds', 'snow-monkey-blocks' ) }
					</span>
				</li>
			</ul>
		</div>
	);
}
