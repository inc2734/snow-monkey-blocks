import classnames from 'classnames';

import { useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const { alignment, numericColor, clockColor, countdownTime } =
				attributes;

			const classes = classnames( 'smb-countdown', className );

			const listClasses = classnames( 'smb-countdown__list', {
				[ `align-${ alignment }` ]: !! alignment,
			} );

			const numericStyles = {
				color: numericColor || undefined,
			};

			const clockStyles = {
				color: clockColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<ul className={ listClasses } data-time={ countdownTime }>
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
		},
	},
];
