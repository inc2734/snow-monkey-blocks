'use strict';

const { RichText } = wp.editor;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: {
			titleTagName: {
				type: 'string',
				default: 'div',
			},
			title: {
				source: 'html',
				selector: '.smb-items__item__title',
			},
			lede: {
				source: 'html',
				selector: '.smb-items__item__lede',
			},
			summary: {
				source: 'html',
				selector: '.smb-items__item__content',
			},
			btnLabel: {
				source: 'html',
				selector: '.smb-items__item__btn > .smb-btn__label',
			},
			btnURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__btn',
				attribute: 'href',
				default: '',
			},
			btnTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__btn',
				attribute: 'target',
				default: '_self',
			},
			btnBackgroundColor: {
				type: 'string',
			},
			btnTextColor: {
				type: 'string',
			},
			imageID: {
				type: 'number',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__figure > img',
				attribute: 'src',
				default: '',
			},
			isBlockLink: {
				type: 'boolean',
				default: false,
			},
		},

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
		attributes: {
			titleTagName: {
				type: 'string',
				default: 'div',
			},
			title: {
				source: 'html',
				selector: '.smb-items__item__title',
			},
			lede: {
				source: 'html',
				selector: '.smb-items__item__lede',
			},
			summary: {
				source: 'html',
				selector: '.smb-items__item__content',
			},
			btnLabel: {
				source: 'html',
				selector: '.smb-items__item__btn > .smb-btn__label',
			},
			btnURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item',
				attribute: 'href',
				default: '',
			},
			btnTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item',
				attribute: 'target',
				default: '_self',
			},
			btnBackgroundColor: {
				type: 'string',
			},
			btnTextColor: {
				type: 'string',
			},
			imageID: {
				type: 'number',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__figure > img',
				attribute: 'src',
				default: '',
			},
			isBlockLink: {
				type: 'boolean',
				default: false,
			},
		},

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
