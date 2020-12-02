import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		url,
		target,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		btnLabel,
		btnBackgroundColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const classes = classnames( 'c-row__col', className );

	const btnClasses = classnames( 'smb-items__item__btn', 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const itemBtnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const itemBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
		borderRadius:
			'undefined' !== typeof btnBorderRadius
				? `${ btnBorderRadius }px`
				: undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-items__item">
				{ !! imageURL && (
					<div className="smb-items__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							width={ !! imageWidth && imageWidth }
							height={ !! imageHeight && imageHeight }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

				<div className="smb-items__item__body">
					{ 'none' !== titleTagName && (
						<RichText.Content
							tagName={ titleTagName }
							className="smb-items__item__title"
							value={ title }
						/>
					) }

					{ ! RichText.isEmpty( lede ) && (
						<div className="smb-items__item__lede">
							<RichText.Content value={ lede } />
						</div>
					) }

					{ ! RichText.isEmpty( summary ) && (
						<div className="smb-items__item__content">
							<RichText.Content value={ summary } />
						</div>
					) }

					{ ! RichText.isEmpty( btnLabel ) && !! url && (
						<div className="smb-items__item__action">
							<a
								className={ btnClasses }
								href={ url }
								style={ itemBtnStyles }
								target={
									'_self' === target ? undefined : target
								}
								rel={
									'_self' === target
										? undefined
										: 'noopener noreferrer'
								}
							>
								<span
									className="smb-btn__label"
									style={ itemBtnLabelStyles }
								>
									<RichText.Content value={ btnLabel } />
								</span>
							</a>
						</div>
					) }
				</div>
			</div>
		</div>
	);
}
