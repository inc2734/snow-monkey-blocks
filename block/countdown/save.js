import classnames from 'classnames';

import { __ } from '@wordpress/i18n';

import { useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const classes = classnames( 'smb-countdown', className );

	const listClasses = classnames( 'smb-countdown__list', {
		[ `align-${ attributes.alignment }` ]: !! attributes.alignment,
	} );

	const numericStyles = {
		color: attributes.numericColor || undefined,
	};

	const clockStyles = {
		color: attributes.clockColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<ul
				className={ listClasses }
				data-time={ attributes.countdownTime }
			>
				<li className="smb-countdown__list-item smb-countdown__list-item__days">
					<span
						className="smb-countdown__list-item__numeric"
						style={ numericStyles }
					>
						-
					</span>
					<span
						className="smb-countdown__list-item__clock"
						style={ clockStyles }
					>
						{ __( 'Days', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__hours">
					<span
						className="smb-countdown__list-item__numeric"
						style={ numericStyles }
					>
						--
					</span>
					<span
						className="smb-countdown__list-item__clock"
						style={ clockStyles }
					>
						{ __( 'Hours', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
					<span
						className="smb-countdown__list-item__numeric"
						style={ numericStyles }
					>
						--
					</span>
					<span
						className="smb-countdown__list-item__clock"
						style={ clockStyles }
					>
						{ __( 'Minutes', 'snow-monkey-blocks' ) }
					</span>
				</li>
				<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
					<span
						className="smb-countdown__list-item__numeric"
						style={ numericStyles }
					>
						--
					</span>
					<span
						className="smb-countdown__list-item__clock"
						style={ clockStyles }
					>
						{ __( 'Seconds', 'snow-monkey-blocks' ) }
					</span>
				</li>
			</ul>
		</div>
	);
}
