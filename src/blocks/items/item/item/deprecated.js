import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
			imageURL: {
				type: 'string',
				default: '',
			},
		},

		save( { attributes } ) {
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
				isBlockLink,
			} = attributes;

			const Item = !! isBlockLink ? 'a' : 'div';
			const Btn = !! isBlockLink ? 'span' : 'a';

			return (
				<div className="c-row__col">
					<Item
						className="smb-items__item"
						href={ btnURL }
						target={ '_self' === btnTarget ? undefined : btnTarget }
						rel={
							'_self' === btnTarget
								? undefined
								: 'noopener noreferrer'
						}
					>
						{ !! imageID && (
							<div className="smb-items__item__figure">
								<img
									src={ imageURL }
									alt=""
									className={ `wp-image-${ imageID }` }
								/>
							</div>
						) }

						<RichText.Content
							tagName={ titleTagName }
							className="smb-items__item__title"
							value={ title }
						/>

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
								</Btn>
							</div>
						) }
					</Item>
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
				selector: '.smb-items__item__btn',
				attribute: 'target',
				default: '_self',
			},
		},

		save( { attributes } ) {
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
				isBlockLink,
			} = attributes;

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

				return <div className="smb-items__item">{ itemContent }</div>;
			};

			const renderBtn = ( btnContent ) => {
				if ( !! isBlockLink ) {
					return (
						<span
							className="smb-items__item__btn smb-btn"
							href={ btnURL }
							target={ btnTarget }
							style={ { backgroundColor: btnBackgroundColor } }
						>
							{ btnContent }
						</span>
					);
				}

				return (
					<a
						className="smb-items__item__btn smb-btn"
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
					{ renderItem(
						<>
							{ !! imageID && (
								<div className="smb-items__item__figure">
									<img
										src={ imageURL }
										alt=""
										className={ `wp-image-${ imageID }` }
									/>
								</div>
							) }

							<RichText.Content
								tagName={ titleTagName }
								className="smb-items__item__title"
								value={ title }
							/>

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
									{ renderBtn(
										<span
											className="smb-btn__label"
											style={ { color: btnTextColor } }
										>
											<RichText.Content
												value={ btnLabel }
											/>
										</span>
									) }
								</div>
							) }
						</>
					) }
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
				selector: '.smb-items__item__btn',
				attribute: 'target',
				default: '_self',
			},
		},

		save( { attributes } ) {
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
				isBlockLink,
			} = attributes;

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

				return <div className="smb-items__item">{ itemContent }</div>;
			};

			const renderBtn = ( btnContent ) => {
				if ( !! isBlockLink ) {
					return (
						<span
							className="smb-items__item__btn smb-btn"
							href={ btnURL }
							target={ btnTarget }
							style={ { backgroundColor: btnBackgroundColor } }
						>
							{ btnContent }
						</span>
					);
				}

				return (
					<a
						className="smb-items__item__btn smb-btn"
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
					{ renderItem(
						<>
							{ !! imageID && (
								<div className="smb-items__item__figure">
									<img
										src={ imageURL }
										alt=""
										className={ `wp-image-${ imageID }` }
									/>
								</div>
							) }

							<RichText.Content
								tagName={ titleTagName }
								className="smb-items__item__title"
								value={ title }
							/>

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
									{ renderBtn(
										<span
											className="smb-btn__label"
											style={ { color: btnTextColor } }
										>
											<RichText.Content
												value={ btnLabel }
											/>
										</span>
									) }
								</div>
							) }
						</>
					) }
				</div>
			);
		},
	},
];
