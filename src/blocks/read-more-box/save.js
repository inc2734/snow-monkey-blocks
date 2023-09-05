import classnames from 'classnames';

import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		label,
		closeLabel,
		btnJustification,
		contenHeight,
		mask,
		maskColor,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
		clientId,
	} = attributes;

	const classes = classnames( 'smb-read-more-box', className, {
		'smb-read-more-box--has-mask': mask,
	} );

	const innerClasses = classnames( 'smb-read-more-box__content' );

	const actionClasses = classnames( 'smb-read-more-box__action', {
		[ `is-content-justification-${ btnJustification }` ]: btnJustification,
	} );

	const styles = {
		'--smb-read-more-box--content-height': contenHeight || undefined,
		'--smb-read-more-box--mask-color': ( mask && maskColor ) || undefined,
	};

	const btnWrapperClasses = classnames(
		'smb-read-more-box__btn-wrapper',
		'smb-btn-wrapper',
		{
			[ `smb-btn-wrapper--${ btnSize }` ]: !! btnSize,
		}
	);

	const btnClasses = classnames( 'smb-read-more-box__button', 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( btnBorderRadius ).match( /^\d+$/ )
			? `${ btnBorderRadius }px`
			: btnBorderRadius || undefined,
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
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<div
				{ ...useInnerBlocksProps.save( {
					className: innerClasses,
					'aria-hidden': 'true',
				} ) }
				id={ clientId }
			/>
			<div className={ actionClasses }>
				<div className={ btnWrapperClasses }>
					<button
						className={ btnClasses }
						style={ btnStyles }
						aria-expanded="false"
						aria-controls={ clientId }
						data-label={ label }
						data-close-label={ closeLabel }
					>
						<span className="smb-read-more-box__label smb-btn__label">
							{ label }
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
