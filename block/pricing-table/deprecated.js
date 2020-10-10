import classnames from 'classnames';
import { get, times } from 'lodash';

import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes, className } ) {
			const { columnSize } = attributes;

			const classes = classnames( 'smb-pricing-table', {
				[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
				[ className ]: !! className,
			} );

			return (
				<div className={ classes }>
					<div className="c-row c-row--md-nowrap">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		save() {
			return (
				<div className="smb-pricing-table">
					<div className="c-row c-row--md-nowrap">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'query',
				selector: '.smb-pricing-table__item',
				default: [],
				query: {
					title: {
						source: 'html',
						selector: '.smb-pricing-table__item__title',
					},
					price: {
						source: 'html',
						selector: '.smb-pricing-table__item__price',
					},
					lede: {
						source: 'html',
						selector: '.smb-pricing-table__item__lede',
					},
					list: {
						source: 'html',
						selector: 'ul',
					},
					btnLabel: {
						source: 'html',
						selector:
							'.smb-pricing-table__item__btn > .smb-btn__label',
					},
					btnURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'href',
						default: '',
					},
					btnTarget: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'target',
						default: '_self',
					},
					btnBackgroundColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'data-background-color',
					},
					btnTextColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'data-color',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-pricing-table__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
			columns: {
				type: 'number',
				default: 1,
			},
		},

		migrate( attributes ) {
			const migratedInnerBlocks = () => {
				const length =
					'undefined' === typeof attributes.content
						? 0
						: attributes.content.length;

				return times( length, ( index ) => {
					const title = get(
						attributes.content,
						[ index, 'title' ],
						''
					);
					const price = get(
						attributes.content,
						[ index, 'price' ],
						''
					);
					const lede = get(
						attributes.content,
						[ index, 'lede' ],
						''
					);
					const list = get(
						attributes.content,
						[ index, 'list' ],
						''
					);
					const btnLabel = get(
						attributes.content,
						[ index, 'btnLabel' ],
						''
					);
					const btnURL = get(
						attributes.content,
						[ index, 'btnURL' ],
						''
					);
					const btnTarget = get(
						attributes.content,
						[ index, 'btnTarget' ],
						'_self'
					);
					const btnBackgroundColor = get(
						attributes.content,
						[ index, 'btnBackgroundColor' ],
						''
					);
					const btnTextColor = get(
						attributes.content,
						[ index, 'btnTextColor' ],
						''
					);
					const imageID = get(
						attributes.content,
						[ index, 'imageID' ],
						0
					);
					const imageURL = get(
						attributes.content,
						[ index, 'imageURL' ],
						''
					);

					return createBlock(
						'snow-monkey-blocks/pricing-table--item',
						{
							title,
							price,
							lede,
							list,
							btnLabel,
							btnURL,
							btnTarget,
							btnBackgroundColor,
							btnTextColor,
							imageID: Number( imageID ),
							imageURL,
						}
					);
				} );
			};

			return [ {}, migratedInnerBlocks() ];
		},

		save( { attributes } ) {
			const { content } = attributes;
			const length =
				'undefined' === typeof attributes.content
					? 0
					: attributes.content.length;

			return (
				<div className={ `smb-pricing-table` }>
					<div className="smb-pricing-table__row">
						{ times( length, ( index ) => {
							const title = get(
								content,
								[ index, 'title' ],
								''
							);
							const price = get(
								content,
								[ index, 'price' ],
								''
							);
							const lede = get( content, [ index, 'lede' ], '' );
							const list = get( content, [ index, 'list' ], '' );
							const btnLabel = get(
								content,
								[ index, 'btnLabel' ],
								''
							);
							const btnURL = get(
								content,
								[ index, 'btnURL' ],
								''
							);
							const btnTarget = get(
								content,
								[ index, 'btnTarget' ],
								'_self'
							);
							const btnBackgroundColor = get(
								content,
								[ index, 'btnBackgroundColor' ],
								''
							);
							const btnTextColor = get(
								content,
								[ index, 'btnTextColor' ],
								''
							);
							const imageID = get(
								content,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								content,
								[ index, 'imageURL' ],
								''
							);

							return (
								<div className="smb-pricing-table__col">
									<div className="smb-pricing-table__item">
										{ !! imageID && (
											<div className="smb-pricing-table__item__figure">
												<img
													src={ imageURL }
													alt=""
													className={ `wp-image-${ imageID }` }
													data-image-id={ imageID }
												/>
											</div>
										) }

										<div className="smb-pricing-table__item__title">
											<RichText.Content value={ title } />
										</div>

										{ ! RichText.isEmpty( price ) && (
											<div className="smb-pricing-table__item__price">
												<RichText.Content
													value={ price }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( lede ) && (
											<div className="smb-pricing-table__item__lede">
												<RichText.Content
													value={ lede }
												/>
											</div>
										) }

										<ul>
											<RichText.Content value={ list } />
										</ul>

										{ ( ! RichText.isEmpty( btnLabel ) ||
											!! btnURL ) && (
											<div className="smb-pricing-table__item__action">
												<a
													className="smb-pricing-table__item__btn smb-btn"
													href={ btnURL }
													target={ btnTarget }
													style={ {
														backgroundColor: btnBackgroundColor,
													} }
													data-background-color={
														btnBackgroundColor
													}
													data-color={ btnTextColor }
												>
													<span
														className="smb-btn__label"
														style={ {
															color: btnTextColor,
														} }
													>
														<RichText.Content
															value={ btnLabel }
														/>
													</span>
												</a>
											</div>
										) }
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			content: {
				type: 'array',
				source: 'query',
				selector: '.smb-pricing-table__item',
				default: [],
				query: {
					title: {
						source: 'html',
						selector: '.smb-pricing-table__item__title',
					},
					price: {
						source: 'html',
						selector: '.smb-pricing-table__item__price',
					},
					lede: {
						source: 'html',
						selector: '.smb-pricing-table__item__lede',
					},
					list: {
						source: 'html',
						selector: 'ul',
					},
					btnLabel: {
						source: 'html',
						selector:
							'.smb-pricing-table__item__btn > .smb-btn__label',
					},
					btnURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'href',
						default: '',
					},
					btnTarget: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'target',
						default: '_self',
					},
					btnBackgroundColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'data-background-color',
					},
					btnTextColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__btn',
						attribute: 'data-color',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-pricing-table__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-pricing-table__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
			columns: {
				type: 'number',
				default: 1,
			},
		},

		save( { attributes } ) {
			const { content, columns } = attributes;

			return (
				<div
					className={ `smb-pricing-table smb-pricing-table--${ columns }` }
				>
					<div className="smb-pricing-table__row">
						{ times( columns, ( index ) => {
							const title = get(
								content,
								[ index, 'title' ],
								''
							);
							const price = get(
								content,
								[ index, 'price' ],
								''
							);
							const lede = get( content, [ index, 'lede' ], '' );
							const list = get( content, [ index, 'list' ], '' );
							const btnLabel = get(
								content,
								[ index, 'btnLabel' ],
								''
							);
							const btnURL = get(
								content,
								[ index, 'btnURL' ],
								''
							);
							const btnTarget = get(
								content,
								[ index, 'btnTarget' ],
								'_self'
							);
							const btnBackgroundColor = get(
								content,
								[ index, 'btnBackgroundColor' ],
								''
							);
							const btnTextColor = get(
								content,
								[ index, 'btnTextColor' ],
								''
							);
							const imageID = get(
								content,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								content,
								[ index, 'imageURL' ],
								''
							);

							return (
								<div className="smb-pricing-table__col">
									<div className="smb-pricing-table__item">
										{ !! imageID && (
											<div className="smb-pricing-table__item__figure">
												<img
													src={ imageURL }
													alt=""
													data-image-id={ imageID }
												/>
											</div>
										) }

										<div className="smb-pricing-table__item__title">
											<RichText.Content value={ title } />
										</div>

										{ ! RichText.isEmpty( price ) && (
											<div className="smb-pricing-table__item__price">
												<RichText.Content
													value={ price }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( lede ) && (
											<div className="smb-pricing-table__item__lede">
												<RichText.Content
													value={ lede }
												/>
											</div>
										) }

										<ul>
											<RichText.Content value={ list } />
										</ul>

										{ ( ! RichText.isEmpty( btnLabel ) ||
											!! btnURL ) && (
											<div className="smb-pricing-table__item__action">
												<a
													className="smb-pricing-table__item__btn smb-btn"
													href={ btnURL }
													target={ btnTarget }
													style={ {
														backgroundColor: btnBackgroundColor,
													} }
													data-background-color={
														btnBackgroundColor
													}
													data-color={ btnTextColor }
												>
													<span
														className="smb-btn__label"
														style={ {
															color: btnTextColor,
														} }
													>
														<RichText.Content
															value={ btnLabel }
														/>
													</span>
												</a>
											</div>
										) }
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
];
