import { RichText } from '@wordpress/block-editor';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
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
