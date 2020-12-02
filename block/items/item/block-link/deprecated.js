import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
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
				<div className={ classes }>
					<a
						className="smb-items__item smb-items__item--block-link"
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
					>
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
								<span
									className={ btnClasses }
									style={ itemBtnStyles }
								>
									<span
										className="smb-btn__label"
										style={ itemBtnLabelStyles }
									>
										<RichText.Content value={ btnLabel } />
									</span>
								</span>
							</div>
						) }
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
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
				<div className={ classes }>
					<div className="smb-items__item smb-items__item--block-link">
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
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const {
				titleTagName,
				title,
				lede,
				summary,
				btnLabel,
				url,
				target,
				btnBackgroundColor,
				btnTextColor,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
			} = attributes;

			const classes = classnames( 'c-row__col', className );

			const itemBtnLabelStyles = {
				color: btnTextColor || undefined,
			};

			const itemBtnStyles = {
				backgroundColor: btnBackgroundColor || undefined,
			};

			return (
				<div className={ classes }>
					<a
						className="smb-items__item"
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_self' === target
								? undefined
								: 'noopener noreferrer'
						}
					>
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
								<span
									className="smb-items__item__btn smb-btn"
									style={ itemBtnStyles }
								>
									<span
										className="smb-btn__label"
										style={ itemBtnLabelStyles }
									>
										<RichText.Content value={ btnLabel } />
									</span>
								</span>
							</div>
						) }
					</a>
				</div>
			);
		},
	},
];
