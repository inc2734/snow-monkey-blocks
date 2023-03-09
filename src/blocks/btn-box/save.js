import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		lede,
		note,
		backgroundColor,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const classes = classnames( 'smb-btn-box', className );

	const btnClasses = classnames( 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const styles = {
		'--smb-btn-box--background-color': backgroundColor || undefined,
	};

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( btnBorderRadius ).match( /^\d+$/ )
			? `${ btnBorderRadius }px`
			: btnBorderRadius,
		'--smb-btn--color': btnTextColor || undefined,
	};
	if (
		!! attributes.className &&
		attributes.className.split( ' ' ).includes( 'is-style-ghost' )
	) {
		btnStyles[ '--smb-btn--style--ghost--border-color' ] =
			btnBackgroundColor || undefined;
	}

	return (
		<div
			{ ...useBlockProps.save( {
				className: classes,
				style: styles,
			} ) }
		>
			<div className="c-container">
				{ ! RichText.isEmpty( lede ) && (
					<div className="smb-btn-box__lede">
						<RichText.Content value={ lede } />
					</div>
				) }

				<div className="smb-btn-box__btn-wrapper">
					<a
						className={ btnClasses }
						href={ btnURL }
						style={ btnStyles }
						target={ '_self' === btnTarget ? undefined : btnTarget }
						rel={
							'_self' === btnTarget
								? undefined
								: 'noopener noreferrer'
						}
					>
						<span className="smb-btn__label">
							<RichText.Content value={ btnLabel } />
						</span>
					</a>
				</div>

				{ ! RichText.isEmpty( note ) && (
					<div className="smb-btn-box__note">
						<RichText.Content value={ note } />
					</div>
				) }
			</div>
		</div>
	);
}
