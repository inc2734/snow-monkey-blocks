import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function ( { attributes, className } ) {
	const { alignment, numericColor, clockColor, countdownTime } = attributes;

	const classes = classnames( 'smb-countdown', className );

	const listClasses = classnames( 'smb-countdown__list', {
		[ `align-${ alignment }` ]: !! alignment,
	} );

	const styles = {
		'--smb-countdown--numeric-color': numericColor || undefined,
		'--smb-countdown--clock-color': clockColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<ul className={ listClasses } data-time={ countdownTime }>
				<li className="smb-countdown__list-item smb-countdown__list-item__days">
					<span className="smb-countdown__list-item__numeric">-</span>
					<span className="smb-countdown__list-item__clock">
						{ __( 'Days', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__hours">
					<span className="smb-countdown__list-item__numeric">
						--
					</span>
					<span className="smb-countdown__list-item__clock">
						{ __( 'Hours', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
					<span className="smb-countdown__list-item__numeric">
						--
					</span>
					<span className="smb-countdown__list-item__clock">
						{ __( 'Minutes', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
					<span className="smb-countdown__list-item__numeric">
						--
					</span>
					<span className="smb-countdown__list-item__clock">
						{ __( 'Seconds', 'snow-monkey-blocks' ) }
					</span>
				</li>
			</ul>
		</div>
	);
}
