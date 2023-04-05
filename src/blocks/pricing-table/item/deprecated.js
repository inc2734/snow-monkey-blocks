import classnames from 'classnames';

import { rawHandler } from '@wordpress/blocks';
import { RichText, useBlockProps } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;
const blockSupports = metadata.supports;

export default [
	{
		attributes: {
			...blockAttributes,
			btnBorderRadius: {
				type: 'number',
			},
			list: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { btnLabel, btnURL, imageURL, list, btnBorderRadius } =
				attributes;

			if ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) {
				attributes.displayBtn = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			attributes.btnBorderRadius = String( btnBorderRadius ).match(
				/^\d+$/
			)
				? `${ btnBorderRadius }px`
				: btnBorderRadius;

			const items = document.createElement( 'ul' );
			items.innerHTML = list;
			const [ listBlock ] = rawHandler( { HTML: items.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

		save( { attributes, className } ) {
			const {
				title,
				price,
				lede,
				list,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
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

			const classes = classnames( 'c-row__col', className );

			const btnClasses = classnames(
				'smb-btn',
				'smb-pricing-table__item__btn',
				{
					[ `smb-btn--${ btnSize }` ]: !! btnSize,
					'smb-btn--wrap': btnWrap,
				}
			);

			const btnStyles = {
				'--smb-btn--background-color': btnBackgroundColor || undefined,
				'--smb-btn--background-image':
					btnBackgroundGradientColor || undefined,
				'--smb-btn--border-radius': String( btnBorderRadius ).match(
					/^\d+$/
				)
					? `${ btnBorderRadius }px`
					: btnBorderRadius,
				'--smb-btn--color': btnTextColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-pricing-table__item">
						{ !! imageURL && (
							<div className="smb-pricing-table__item__figure">
								<img
									src={ imageURL }
									alt={ imageAlt }
									width={ !! imageWidth && imageWidth }
									height={ !! imageHeight && imageHeight }
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div className="smb-pricing-table__item__title">
							<RichText.Content value={ title } />
						</div>

						{ ! RichText.isEmpty( price ) && (
							<div className="smb-pricing-table__item__price">
								<RichText.Content value={ price } />
							</div>
						) }

						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-pricing-table__item__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<ul>
							<RichText.Content value={ list } />
						</ul>

						{ ! RichText.isEmpty( btnLabel ) && !! btnURL && (
							<div className="smb-pricing-table__item__action">
								<a
									className={ btnClasses }
									href={ btnURL }
									style={ btnStyles }
									target={
										'_self' === btnTarget
											? undefined
											: btnTarget
									}
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
						) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnBorderRadius: {
				type: 'number',
			},
			list: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { btnLabel, btnURL, imageURL, list, btnBorderRadius } =
				attributes;

			if ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) {
				attributes.displayBtn = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			attributes.btnBorderRadius = String( btnBorderRadius ).match(
				/^\d+$/
			)
				? `${ btnBorderRadius }px`
				: btnBorderRadius;

			const items = document.createElement( 'ul' );
			items.innerHTML = list;
			const [ listBlock ] = rawHandler( { HTML: items.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

		save( { attributes, className } ) {
			const {
				title,
				price,
				lede,
				list,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
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

			const classes = classnames( 'c-row__col', className );

			const btnClasses = classnames(
				'smb-btn',
				'smb-pricing-table__item__btn',
				{
					[ `smb-btn--${ btnSize }` ]: !! btnSize,
					'smb-btn--wrap': btnWrap,
				}
			);

			const btnStyles = {
				'--smb-btn--background-color': btnBackgroundColor || undefined,
				'--smb-btn--background-image':
					btnBackgroundGradientColor || undefined,
				'--smb-btn--border-radius':
					'undefined' !== typeof btnBorderRadius
						? `${ btnBorderRadius }px`
						: undefined,
				'--smb-btn--color': btnTextColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-pricing-table__item">
						{ !! imageURL && (
							<div className="smb-pricing-table__item__figure">
								<img
									src={ imageURL }
									alt={ imageAlt }
									width={ !! imageWidth && imageWidth }
									height={ !! imageHeight && imageHeight }
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div className="smb-pricing-table__item__title">
							<RichText.Content value={ title } />
						</div>

						{ ! RichText.isEmpty( price ) && (
							<div className="smb-pricing-table__item__price">
								<RichText.Content value={ price } />
							</div>
						) }

						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-pricing-table__item__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<ul>
							<RichText.Content value={ list } />
						</ul>

						{ ! RichText.isEmpty( btnLabel ) && !! btnURL && (
							<div className="smb-pricing-table__item__action">
								<a
									className={ btnClasses }
									href={ btnURL }
									style={ btnStyles }
									target={
										'_self' === btnTarget
											? undefined
											: btnTarget
									}
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
						) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			...blockAttributes,
			btnBorderRadius: {
				type: 'number',
			},
			list: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { btnLabel, btnURL, imageURL, list, btnBorderRadius } =
				attributes;

			if ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) {
				attributes.displayBtn = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			attributes.btnBorderRadius = String( btnBorderRadius ).match(
				/^\d+$/
			)
				? `${ btnBorderRadius }px`
				: btnBorderRadius;

			const items = document.createElement( 'ul' );
			items.innerHTML = list;
			const [ listBlock ] = rawHandler( { HTML: items.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

		save( { attributes, className } ) {
			const {
				title,
				price,
				lede,
				list,
				imageID,
				imageURL,
				imageAlt,
				imageWidth,
				imageHeight,
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

			const classes = classnames( 'c-row__col', className );

			const btnClasses = classnames(
				'smb-btn',
				'smb-pricing-table__item__btn',
				{
					[ `smb-btn--${ btnSize }` ]: !! btnSize,
					'smb-btn--wrap': btnWrap,
				}
			);

			const btnStyles = {
				backgroundColor: btnBackgroundColor || undefined,
				backgroundImage: btnBackgroundGradientColor || undefined,
				borderRadius:
					'undefined' !== typeof btnBorderRadius
						? `${ btnBorderRadius }px`
						: undefined,
			};

			const btnLabelStyles = {
				color: btnTextColor || undefined,
			};

			return (
				<div { ...useBlockProps.save( { className: classes } ) }>
					<div className="smb-pricing-table__item">
						{ !! imageURL && (
							<div className="smb-pricing-table__item__figure">
								<img
									src={ imageURL }
									alt={ imageAlt }
									width={ !! imageWidth && imageWidth }
									height={ !! imageHeight && imageHeight }
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div className="smb-pricing-table__item__title">
							<RichText.Content value={ title } />
						</div>

						{ ! RichText.isEmpty( price ) && (
							<div className="smb-pricing-table__item__price">
								<RichText.Content value={ price } />
							</div>
						) }

						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-pricing-table__item__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<ul>
							<RichText.Content value={ list } />
						</ul>

						{ ! RichText.isEmpty( btnLabel ) && !! btnURL && (
							<div className="smb-pricing-table__item__action">
								<a
									className={ btnClasses }
									href={ btnURL }
									style={ btnStyles }
									target={
										'_self' === btnTarget
											? undefined
											: btnTarget
									}
									rel={
										'_self' === btnTarget
											? undefined
											: 'noopener noreferrer'
									}
								>
									<span
										className="smb-btn__label"
										style={ btnLabelStyles }
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
			btnBorderRadius: {
				type: 'number',
			},
			list: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { btnLabel, btnURL, imageURL, list, btnBorderRadius } =
				attributes;

			if ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) {
				attributes.displayBtn = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			attributes.btnBorderRadius = String( btnBorderRadius ).match(
				/^\d+$/
			)
				? `${ btnBorderRadius }px`
				: btnBorderRadius;

			const items = document.createElement( 'ul' );
			items.innerHTML = list;
			const [ listBlock ] = rawHandler( { HTML: items.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

		save( { attributes } ) {
			const {
				title,
				price,
				lede,
				list,
				btnLabel,
				btnURL,
				btnTarget,
				btnBackgroundColor,
				btnTextColor,
				imageID,
				imageURL,
			} = attributes;

			return (
				<div className="c-row__col">
					<div className="smb-pricing-table__item">
						{ !! imageID && (
							<div className="smb-pricing-table__item__figure">
								<img
									src={ imageURL }
									alt=""
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div className="smb-pricing-table__item__title">
							<RichText.Content value={ title } />
						</div>

						{ ! RichText.isEmpty( price ) && (
							<div className="smb-pricing-table__item__price">
								<RichText.Content value={ price } />
							</div>
						) }

						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-pricing-table__item__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<ul>
							<RichText.Content value={ list } />
						</ul>

						{ ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) && (
							<div className="smb-pricing-table__item__action">
								<a
									className="smb-pricing-table__item__btn smb-btn"
									href={ btnURL }
									style={ {
										backgroundColor: btnBackgroundColor,
									} }
									target={
										'_self' === btnTarget
											? undefined
											: btnTarget
									}
									rel={
										'_self' === btnTarget
											? undefined
											: 'noopener noreferrer'
									}
								>
									<span
										className="smb-btn__label"
										style={ { color: btnTextColor } }
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
			btnTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-pricing-table__item__btn',
				attribute: 'target',
				default: '_self',
			},
			btnBorderRadius: {
				type: 'number',
			},
			list: {
				type: 'string',
				source: 'html',
				selector: 'ul',
				multiline: 'li',
				default: '',
			},
		},

		supports: {
			...blockSupports,
		},

		migrate( attributes ) {
			const { btnLabel, btnURL, imageURL, list, btnBorderRadius } =
				attributes;

			if ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) {
				attributes.displayBtn = true;
			}

			if ( !! imageURL ) {
				attributes.displayImage = true;
			}

			attributes.btnBorderRadius = String( btnBorderRadius ).match(
				/^\d+$/
			)
				? `${ btnBorderRadius }px`
				: btnBorderRadius;

			const items = document.createElement( 'ul' );
			items.innerHTML = list;
			const [ listBlock ] = rawHandler( { HTML: items.outerHTML } );

			return [ { ...attributes }, [ ...listBlock.innerBlocks ] ];
		},

		save( { attributes } ) {
			const {
				title,
				price,
				lede,
				list,
				btnLabel,
				btnURL,
				btnTarget,
				btnBackgroundColor,
				btnTextColor,
				imageID,
				imageURL,
			} = attributes;

			return (
				<div className="c-row__col">
					<div className="smb-pricing-table__item">
						{ !! imageID && (
							<div className="smb-pricing-table__item__figure">
								<img
									src={ imageURL }
									alt=""
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<div className="smb-pricing-table__item__title">
							<RichText.Content value={ title } />
						</div>

						{ ! RichText.isEmpty( price ) && (
							<div className="smb-pricing-table__item__price">
								<RichText.Content value={ price } />
							</div>
						) }

						{ ! RichText.isEmpty( lede ) && (
							<div className="smb-pricing-table__item__lede">
								<RichText.Content value={ lede } />
							</div>
						) }

						<ul>
							<RichText.Content value={ list } />
						</ul>

						{ ( ! RichText.isEmpty( btnLabel ) || !! btnURL ) && (
							<div className="smb-pricing-table__item__action">
								<a
									className="smb-pricing-table__item__btn smb-btn"
									href={ btnURL }
									target={ btnTarget }
									style={ {
										backgroundColor: btnBackgroundColor,
									} }
								>
									<span
										className="smb-btn__label"
										style={ { color: btnTextColor } }
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
];
