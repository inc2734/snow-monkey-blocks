import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnTextColor,
		imageID,
		imageURL,
		imageAlt,
		isBlockLink,
	} = attributes;

	const classes = classnames( 'c-row__col', className );

	const itemBtnLabelStyles = {
		color: btnTextColor || undefined,
	};

	const itemBtnStyles = {
		backgroundColor: btnBackgroundColor || undefined,
	};

	const Btn = !! isBlockLink ? 'span' : 'a';

	const ItemsItemContent = () => {
		return (
			<>
				{ !! imageURL && (
					<div className="smb-items__item__figure">
						<img
							src={ imageURL }
							alt={ imageAlt }
							className={ `wp-image-${ imageID }` }
						/>
					</div>
				) }

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

				{ ! RichText.isEmpty( btnLabel ) && !! btnURL && (
					<div className="smb-items__item__action">
						<Btn
							className="smb-items__item__btn smb-btn"
							href={ btnURL }
							style={ itemBtnStyles }
							target={
								'_self' === btnTarget ? undefined : btnTarget
							}
							rel={
								'_self' === btnTarget
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
						</Btn>
					</div>
				) }
			</>
		);
	};

	const ItemsItem = () => {
		return !! isBlockLink ? (
			<a
				className="smb-items__item"
				href={ btnURL }
				target={ '_self' === btnTarget ? undefined : btnTarget }
				rel={
					'_self' === btnTarget ? undefined : 'noopener noreferrer'
				}
			>
				<ItemsItemContent />
			</a>
		) : (
			<div className="smb-items__item">
				<ItemsItemContent />
			</div>
		);
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<ItemsItem />
		</div>
	);
}
