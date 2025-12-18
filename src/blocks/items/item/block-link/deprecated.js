import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
} from '@wordpress/block-editor';

import { toBorderRadiusValue } from '@smb/helper';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			target: {
				...blockAttributes.target,
				selector: '.smb-items__item--block-link',
				default: '_self',
			},
			url: {
				...blockAttributes.url,
				selector: '.smb-items__item--block-link',
				default: '',
			},
			btnBorderRadius: {
				type: 'number',
			},
		},

		supports: {
			...blockSupports,
		},

		save( { attributes, className } ) {
			const {
				titleTagName,
				title,
				lede,
				summary,
				url,
				target,
				displayImage,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
				displayBtn,
				btnLabel,
				btnBackgroundColor,
				btnBackgroundGradientColor,
				btnTextColor,
				btnSize,
				btnBorderRadius,
				btnWrap,
			} = attributes;

			const colorProps = getColorClassesAndStyles( attributes );

			const classes = classnames( 'c-row__col', className );

			const btnClasses = classnames( 'smb-items__item__btn', 'smb-btn', {
				[ `smb-btn--${ btnSize }` ]: !! btnSize,
				'smb-btn--wrap': btnWrap,
			} );

			const btnStyles = {
				'--smb-btn--background-color': btnBackgroundColor || undefined,
				'--smb-btn--background-image':
					btnBackgroundGradientColor || undefined,
				'--smb-btn--border-radius':
					toBorderRadiusValue( btnBorderRadius ),
				'--smb-btn--color': btnTextColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<a
						className={ classnames(
							'smb-items__item',
							'smb-items__item--block-link',
							colorProps?.className
						) }
						style={ { ...colorProps?.style } }
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_blank' === target
								? 'noopener noreferrer'
								: undefined
						}
					>
						{ displayImage && (
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

							{ displayBtn && (
								<div className="smb-items__item__action">
									<span
										className={ btnClasses }
										href={ url }
										style={ btnStyles }
										target={
											'_self' === target
												? undefined
												: target
										}
										rel={
											'_blank' === target
												? 'noopener noreferrer'
												: undefined
										}
									>
										<span className="smb-btn__label">
											<RichText.Content
												value={ btnLabel }
											/>
										</span>
									</span>
								</div>
							) }
						</div>
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			target: {
				...blockAttributes.target,
				selector: '.smb-items__item--block-link',
				default: '_self',
			},
			url: {
				...blockAttributes.url,
				selector: '.smb-items__item--block-link',
				default: '',
			},
			btnBorderRadius: {
				type: 'number',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { btnLabel, imageURL, btnBorderRadius } = attributes;

			if ( ! RichText.isEmpty( btnLabel ) ) {
				attributes.displayBtn = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			attributes.btnBorderRadius = toBorderRadiusValue( btnBorderRadius );

			return attributes;
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
				btnBackgroundGradientColor,
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

			const btnStyles = {
				'--smb-btn--background-color': btnBackgroundColor || undefined,
				'--smb-btn--background-image':
					btnBackgroundGradientColor || undefined,
				'--smb-btn--border-radius':
					toBorderRadiusValue( btnBorderRadius ),
				'--smb-btn--color': btnTextColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<a
						className="smb-items__item smb-items__item--block-link"
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_blank' === target
								? 'noopener noreferrer'
								: undefined
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
									<span
										className={ btnClasses }
										href={ url }
										style={ btnStyles }
										target={
											'_self' === target
												? undefined
												: target
										}
										rel={
											'_blank' === target
												? 'noopener noreferrer'
												: undefined
										}
									>
										<span className="smb-btn__label">
											<RichText.Content
												value={ btnLabel }
											/>
										</span>
									</span>
								</div>
							) }
						</div>
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			target: {
				...blockAttributes.target,
				selector: '.smb-items__item--block-link',
				default: '_self',
			},
			url: {
				...blockAttributes.url,
				selector: '.smb-items__item--block-link',
				default: '',
			},
			btnBorderRadius: {
				type: 'number',
			},
		},

		supports: {
			...blockSupports,
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
				btnBackgroundGradientColor,
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

			const btnStyles = {
				'--smb-btn--background-color': btnBackgroundColor || undefined,
				'--smb-btn--background-image':
					btnBackgroundGradientColor || undefined,
				'--smb-btn--border-radius':
					toBorderRadiusValue( btnBorderRadius ),
				'--smb-btn--color': btnTextColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<a
						className="smb-items__item smb-items__item--block-link"
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_blank' === target
								? 'noopener noreferrer'
								: undefined
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
									<span
										className={ btnClasses }
										href={ url }
										style={ btnStyles }
										target={
											'_self' === target
												? undefined
												: target
										}
										rel={
											'_blank' === target
												? 'noopener noreferrer'
												: undefined
										}
									>
										<span className="smb-btn__label">
											<RichText.Content
												value={ btnLabel }
											/>
										</span>
									</span>
								</div>
							) }
						</div>
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			target: {
				...blockAttributes.target,
				selector: '.smb-items__item--block-link',
				default: '_self',
			},
			url: {
				...blockAttributes.url,
				selector: '.smb-items__item--block-link',
				default: '',
			},
			btnBorderRadius: {
				type: 'number',
			},
		},

		supports: {
			...blockSupports,
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
				btnBackgroundGradientColor,
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
				backgroundImage: btnBackgroundGradientColor || undefined,
				borderRadius: toBorderRadiusValue( btnBorderRadius ),
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<a
						className="smb-items__item smb-items__item--block-link"
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_blank' === target
								? 'noopener noreferrer'
								: undefined
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
									<span
										className={ btnClasses }
										href={ url }
										style={ itemBtnStyles }
										target={
											'_self' === target
												? undefined
												: target
										}
										rel={
											'_blank' === target
												? 'noopener noreferrer'
												: undefined
										}
									>
										<span
											className="smb-btn__label"
											style={ itemBtnLabelStyles }
										>
											<RichText.Content
												value={ btnLabel }
											/>
										</span>
									</span>
								</div>
							) }
						</div>
					</a>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			btnBorderRadius: {
				type: 'number',
			},
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
				borderRadius: toBorderRadiusValue( btnBorderRadius ),
			};

			return (
				<div className={ classes }>
					<a
						className="smb-items__item smb-items__item--block-link"
						href={ url }
						target={ '_self' === target ? undefined : target }
						rel={
							'_blank' === target
								? 'noopener noreferrer'
								: undefined
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
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			btnBorderRadius: {
				type: 'number',
			},
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
				borderRadius: toBorderRadiusValue( btnBorderRadius ),
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
										'_blank' === target
											? 'noopener noreferrer'
											: undefined
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
			btnLabel: {
				...blockAttributes.btnLabel,
				selector: '.smb-items__item__btn > .smb-btn__label',
				default: '',
			},
			url: {
				type: 'string',
				default: '',
			},
			target: {
				type: 'string',
				default: '_self',
			},
			btnBorderRadius: {
				type: 'number',
			},
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
							'_blank' === target
								? 'noopener noreferrer'
								: undefined
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
