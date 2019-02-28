'use strict';

import { schema } from './_schema.js';

const { merge } = lodash;
const { RichText } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: merge(
			schema,
			{
				imageURL: {
					type: 'string',
					default: '',
				},
			}
		),

		save( { attributes } ) {
			const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, isBlockLink } = attributes;

			const ItemsItemBtnContent = () => {
				return (
					<span className="smb-btn__label" style={ { color: btnTextColor } }>
						<RichText.Content value={ btnLabel } />
					</span>
				);
			};

			const ItemsItemBtn = () => {
				return !! isBlockLink ? (
					<span className="smb-items__item__btn smb-btn"
						href={ btnURL }
						style={ { backgroundColor: btnBackgroundColor } }
						target={ '_self' === btnTarget ? undefined : btnTarget }
						rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
					>
						<ItemsItemBtnContent />
					</span>
				) : (
					<a className="smb-items__item__btn smb-btn"
						href={ btnURL }
						style={ { backgroundColor: btnBackgroundColor } }
						target={ '_self' === btnTarget ? undefined : btnTarget }
						rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
					>
						<ItemsItemBtnContent />
					</a>
				);
			};

			const ItemsItemContent = () => {
				return (
					<Fragment>
						{ !! imageID &&
							<div className="smb-items__item__figure">
								<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
							</div>
						}

						<RichText.Content
							tagName={ titleTagName }
							className="smb-items__item__title"
							value={ title }
						/>

						{ ! RichText.isEmpty( lede ) &&
							<div className="smb-items__item__lede">
								<RichText.Content value={ lede } />
							</div>
						}

						{ ! RichText.isEmpty( summary ) &&
							<div className="smb-items__item__content">
								<RichText.Content value={ summary } />
							</div>
						}

						{ ( ! RichText.isEmpty( btnLabel ) && !! btnURL ) &&
							<div className="smb-items__item__action">
								<ItemsItemBtn />
							</div>
						}
					</Fragment>
				);
			};

			const ItemsItem = () => {
				return !! isBlockLink ? (
					<a
						className="smb-items__item"
						href={ btnURL }
						target={ '_self' === btnTarget ? undefined : btnTarget }
						rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
					>
						<ItemsItemContent />
					</a>
				) : (
					<div
						className="smb-items__item"
						href={ btnURL }
						target={ '_self' === btnTarget ? undefined : btnTarget }
						rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
					>
						<ItemsItemContent />
					</div>
				);
			};

			return (
				<div className="c-row__col">
					<ItemsItem />
				</div>
			);
		},
	},
	{
		attributes: merge(
			schema,
			{
				btnTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-items__item__btn',
					attribute: 'target',
					default: '_self',
				},
			}
		),

		save( { attributes } ) {
			const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, isBlockLink } = attributes;

			const renderItem = ( itemContent ) => {
				if ( !! isBlockLink ) {
					return (
						<a
							className="smb-items__item"
							href={ btnURL }
							target={ btnTarget }
						>
							{ itemContent }
						</a>
					);
				}

				return (
					<div
						className="smb-items__item"
					>
						{ itemContent }
					</div>
				);
			};

			const renderBtn = ( btnContent ) => {
				if ( !! isBlockLink ) {
					return (
						<span className="smb-items__item__btn smb-btn"
							href={ btnURL }
							target={ btnTarget }
							style={ { backgroundColor: btnBackgroundColor } }
						>
							{ btnContent }
						</span>
					);
				}

				return (
					<a className="smb-items__item__btn smb-btn"
						href={ btnURL }
						target={ btnTarget }
						style={ { backgroundColor: btnBackgroundColor } }
					>
						{ btnContent }
					</a>
				);
			};

			return (
				<div className="c-row__col">
					{
						renderItem(
							<Fragment>
								{ !! imageID &&
									<div className="smb-items__item__figure">
										<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
									</div>
								}

								<RichText.Content
									tagName={ titleTagName }
									className="smb-items__item__title"
									value={ title }
								/>

								{ ! RichText.isEmpty( lede ) &&
									<div className="smb-items__item__lede">
										<RichText.Content value={ lede } />
									</div>
								}

								{ ! RichText.isEmpty( summary ) &&
									<div className="smb-items__item__content">
										<RichText.Content value={ summary } />
									</div>
								}

								{ ( ! RichText.isEmpty( btnLabel ) && !! btnURL ) &&
									<div className="smb-items__item__action">
										{
											renderBtn(
												<span className="smb-btn__label" style={ { color: btnTextColor } }>
													<RichText.Content value={ btnLabel } />
												</span>
											)
										}
									</div>
								}
							</Fragment>
						)
					}
				</div>
			);
		},
	},
	{
		attributes: merge(
			schema,
			{
				btnTarget: {
					type: 'string',
					source: 'attribute',
					selector: '.smb-items__item__btn',
					attribute: 'target',
					default: '_self',
				},
			}
		),

		save( { attributes } ) {
			const { titleTagName, title, lede, summary, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, imageID, imageURL, isBlockLink } = attributes;

			const renderItem = ( itemContent ) => {
				if ( !! isBlockLink ) {
					return (
						<a
							className="smb-items__item"
							href={ btnURL }
							target={ btnTarget }
						>
							{ itemContent }
						</a>
					);
				}

				return (
					<div
						className="smb-items__item"
					>
						{ itemContent }
					</div>
				);
			};

			const renderBtn = ( btnContent ) => {
				if ( !! isBlockLink ) {
					return (
						<span className="smb-items__item__btn smb-btn"
							href={ btnURL }
							target={ btnTarget }
							style={ { backgroundColor: btnBackgroundColor } }
						>
							{ btnContent }
						</span>
					);
				}

				return (
					<a className="smb-items__item__btn smb-btn"
						href={ btnURL }
						target={ btnTarget }
						style={ { backgroundColor: btnBackgroundColor } }
					>
						{ btnContent }
					</a>
				);
			};

			return (
				<div className="c-row__col">
					{
						renderItem(
							<Fragment>
								{ !! imageID &&
									<div className="smb-items__item__figure">
										<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
									</div>
								}

								<RichText.Content
									tagName={ titleTagName }
									className="smb-items__item__title"
									value={ title }
								/>

								{ ! RichText.isEmpty( lede ) &&
									<div className="smb-items__item__lede">
										<RichText.Content value={ lede } />
									</div>
								}

								{ ! RichText.isEmpty( summary ) &&
									<div className="smb-items__item__content">
										<RichText.Content value={ summary } />
									</div>
								}

								{ ( ! RichText.isEmpty( btnLabel ) && !! btnURL ) &&
									<div className="smb-items__item__action">
										{
											renderBtn(
												<span className="smb-btn__label" style={ { color: btnTextColor } }>
													<RichText.Content value={ btnLabel } />
												</span>
											)
										}
									</div>
								}
							</Fragment>
						)
					}
				</div>
			);
		},
	},
];
