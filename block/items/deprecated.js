import { times, get } from 'lodash';

import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
		},

		save( { attributes } ) {
			const { sm, md, lg } = attributes;

			return (
				<div className="smb-items">
					<div
						className="c-row c-row--margin"
						data-columns={ sm }
						data-md-columns={ md }
						data-lg-columns={ lg }
					>
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			columns: {
				type: 'number',
				default: 2,
			},
			sm: {
				type: 'number',
				default: 1,
			},
			md: {
				type: 'number',
				default: 1,
			},
			lg: {
				type: 'number',
				default: 2,
			},
			itemTitleTagName: {
				type: 'string',
				default: 'div',
			},
			items: {
				type: 'array',
				source: 'query',
				default: [],
				selector: '.smb-items__item',
				query: {
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
						source: 'attribute',
						selector: '.smb-items__item__btn',
						attribute: 'data-background-color',
					},
					btnTextColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-items__item__btn',
						attribute: 'data-color',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-items__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-items__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
		},

		migrate( attributes ) {
			const migratedInnerBlocks = () => {
				const length =
					'undefined' === typeof attributes.items
						? 0
						: attributes.items.length;

				return times( length, ( index ) => {
					const title = get(
						attributes.items,
						[ index, 'title' ],
						''
					);
					const lede = get( attributes.items, [ index, 'lede' ], '' );
					const summary = get(
						attributes.items,
						[ index, 'summary' ],
						''
					);
					const btnLabel = get(
						attributes.items,
						[ index, 'btnLabel' ],
						''
					);
					const btnURL = get(
						attributes.items,
						[ index, 'btnURL' ],
						''
					);
					const btnTarget = get(
						attributes.items,
						[ index, 'btnTarget' ],
						'_self'
					);
					const btnBackgroundColor = get(
						attributes.items,
						[ index, 'btnBackgroundColor' ],
						''
					);
					const btnTextColor = get(
						attributes.items,
						[ index, 'btnTextColor' ],
						''
					);
					const imageID = get(
						attributes.items,
						[ index, 'imageID' ],
						0
					);
					const imageURL = get(
						attributes.items,
						[ index, 'imageURL' ],
						''
					);

					return createBlock( 'snow-monkey-blocks/items--item', {
						titleTagName: attributes.itemTitleTagName,
						title,
						lede,
						summary,
						btnLabel,
						btnURL,
						btnTarget,
						btnBackgroundColor,
						btnTextColor,
						imageID: Number( imageID ),
						imageURL,
					} );
				} );
			};

			return [
				{
					sm: attributes.sm,
					md: attributes.md,
					lg: attributes.lg,
				},
				migratedInnerBlocks(),
			];
		},

		save( { attributes } ) {
			const { sm, md, lg, itemTitleTagName, items } = attributes;
			const length =
				'undefined' === typeof attributes.items
					? 0
					: attributes.items.length;

			const generateColClasses = () => {
				let colClasses = [];
				colClasses.push( 'c-row__col' );
				colClasses.push( `c-row__col--1-${ sm }` );
				colClasses.push( `c-row__col--md-1-${ md }` );
				colClasses.push( `c-row__col--lg-1-${ lg }` );
				colClasses = colClasses.join( ' ' );
				return colClasses;
			};

			return (
				<div
					className={ `smb-items smb-items--sm-${ sm } smb-items--md-${ md } smb-items--lg-${ lg }` }
				>
					<div className="c-row c-row--margin">
						{ times( length, ( index ) => {
							const itemTitle = get(
								items,
								[ index, 'title' ],
								''
							);
							const lede = get( items, [ index, 'lede' ], '' );
							const summary = get(
								items,
								[ index, 'summary' ],
								''
							);
							const btnLabel = get(
								items,
								[ index, 'btnLabel' ],
								''
							);
							const btnURL = get(
								items,
								[ index, 'btnURL' ],
								''
							);
							const btnTarget = get(
								items,
								[ index, 'btnTarget' ],
								'_self'
							);
							const btnBackgroundColor = get(
								items,
								[ index, 'btnBackgroundColor' ],
								''
							);
							const btnTextColor = get(
								items,
								[ index, 'btnTextColor' ],
								''
							);
							const imageID = get(
								items,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								items,
								[ index, 'imageURL' ],
								''
							);

							return (
								<div
									className={ generateColClasses(
										sm,
										md,
										lg
									) }
								>
									<div className="smb-items__item">
										{ !! imageID && (
											<div className="smb-items__item__figure">
												<img
													src={ imageURL }
													alt=""
													className={ `wp-image-${ imageID }` }
													data-image-id={ imageID }
												/>
											</div>
										) }

										<RichText.Content
											tagName={ itemTitleTagName }
											className="smb-items__item__title"
											value={ itemTitle }
										/>

										{ ! RichText.isEmpty( lede ) && (
											<div className="smb-items__item__lede">
												<RichText.Content
													value={ lede }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( summary ) && (
											<div className="smb-items__item__content">
												<RichText.Content
													value={ summary }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( btnLabel ) &&
											!! btnURL && (
												<div className="smb-items__item__action">
													<a
														className="smb-items__item__btn smb-btn"
														href={ btnURL }
														target={ btnTarget }
														style={ {
															backgroundColor: btnBackgroundColor,
														} }
														data-background-color={
															btnBackgroundColor
														}
														data-color={
															btnTextColor
														}
													>
														<span
															className="smb-btn__label"
															style={ {
																color: btnTextColor,
															} }
														>
															<RichText.Content
																value={
																	btnLabel
																}
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
			columns: {
				type: 'number',
				default: 2,
			},
			sm: {
				type: 'number',
				default: 1,
			},
			md: {
				type: 'number',
				default: 1,
			},
			lg: {
				type: 'number',
				default: 2,
			},
			items: {
				type: 'array',
				source: 'query',
				default: [],
				selector: '.smb-items__item',
				query: {
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
						source: 'attribute',
						selector: '.smb-items__item__btn',
						attribute: 'data-background-color',
					},
					btnTextColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-items__item__btn',
						attribute: 'data-color',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-items__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-items__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
		},

		save( { attributes } ) {
			const { columns, sm, md, lg, items } = attributes;

			return (
				<div
					className={ `smb-items smb-items--sm-${ sm } smb-items--md-${ md } smb-items--lg-${ lg }` }
				>
					<div className="c-row c-row--margin">
						{ times( columns, ( index ) => {
							const itemTitle = get(
								items,
								[ index, 'title' ],
								''
							);
							const lede = get( items, [ index, 'lede' ], '' );
							const summary = get(
								items,
								[ index, 'summary' ],
								''
							);
							const btnLabel = get(
								items,
								[ index, 'btnLabel' ],
								''
							);
							const btnURL = get(
								items,
								[ index, 'btnURL' ],
								''
							);
							const btnTarget = get(
								items,
								[ index, 'btnTarget' ],
								'_self'
							);
							const btnBackgroundColor = get(
								items,
								[ index, 'btnBackgroundColor' ],
								''
							);
							const btnTextColor = get(
								items,
								[ index, 'btnTextColor' ],
								''
							);
							const imageID = get(
								items,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								items,
								[ index, 'imageURL' ],
								''
							);

							const _generateColClasses = () => {
								let colClasses = [];
								colClasses.push( 'c-row__col' );
								colClasses.push( `c-row__col--1-${ sm }` );
								if ( sm === md ) {
									colClasses.push( `c-row__col--1-${ md }` );
								}
								colClasses.push( `c-row__col--lg-1-${ lg }` );
								colClasses = colClasses.join( ' ' );
								return colClasses;
							};

							return (
								<div
									className={ _generateColClasses(
										sm,
										md,
										lg
									) }
								>
									<div className="smb-items__item">
										{ !! imageID && (
											<div className="smb-items__item__figure">
												<img
													src={ imageURL }
													alt=""
													data-image-id={ imageID }
												/>
											</div>
										) }

										<div className="smb-items__item__title">
											<RichText.Content
												value={ itemTitle }
											/>
										</div>

										{ ! RichText.isEmpty( lede ) && (
											<div className="smb-items__item__lede">
												<RichText.Content
													value={ lede }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( summary ) && (
											<div className="smb-items__item__content">
												<RichText.Content
													value={ summary }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( btnLabel ) &&
											!! btnURL && (
												<div className="smb-items__item__action">
													<a
														className="smb-items__item__btn smb-btn"
														href={ btnURL }
														target={ btnTarget }
														style={ {
															backgroundColor: btnBackgroundColor,
														} }
														data-background-color={
															btnBackgroundColor
														}
														data-color={
															btnTextColor
														}
													>
														<span
															className="smb-btn__label"
															style={ {
																color: btnTextColor,
															} }
														>
															<RichText.Content
																value={
																	btnLabel
																}
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
			columns: {
				type: 'number',
				default: 2,
			},
			sm: {
				type: 'number',
				default: 1,
			},
			md: {
				type: 'number',
				default: 1,
			},
			lg: {
				type: 'number',
				default: 2,
			},
			items: {
				type: 'array',
				source: 'query',
				default: [],
				selector: '.smb-items__item',
				query: {
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
						source: 'attribute',
						selector: '.smb-items__item__btn',
						attribute: 'data-background-color',
					},
					btnTextColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-items__item__btn',
						attribute: 'data-color',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-items__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-items__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
		},

		save( { attributes } ) {
			const { columns, sm, md, lg, items } = attributes;

			return (
				<div className={ `smb-items smb-items--lg-${ lg }` }>
					<div className="c-row c-row--margin">
						{ times( columns, ( index ) => {
							const itemTitle = get(
								items,
								[ index, 'title' ],
								''
							);
							const lede = get( items, [ index, 'lede' ], '' );
							const summary = get(
								items,
								[ index, 'summary' ],
								''
							);
							const btnLabel = get(
								items,
								[ index, 'btnLabel' ],
								''
							);
							const btnURL = get(
								items,
								[ index, 'btnURL' ],
								''
							);
							const btnTarget = get(
								items,
								[ index, 'btnTarget' ],
								'_self'
							);
							const btnBackgroundColor = get(
								items,
								[ index, 'btnBackgroundColor' ],
								''
							);
							const btnTextColor = get(
								items,
								[ index, 'btnTextColor' ],
								''
							);
							const imageID = get(
								items,
								[ index, 'imageID' ],
								0
							);
							const imageURL = get(
								items,
								[ index, 'imageURL' ],
								''
							);

							const _generateColClasses = () => {
								let colClasses = [];
								colClasses.push( 'c-row__col' );
								colClasses.push( `c-row__col--1-${ sm }` );
								if ( sm === md ) {
									colClasses.push( `c-row__col--1-${ md }` );
								}
								colClasses.push( `c-row__col--lg-1-${ lg }` );
								colClasses = colClasses.join( ' ' );
								return colClasses;
							};

							return (
								<div
									className={ _generateColClasses(
										sm,
										md,
										lg
									) }
								>
									<div className="smb-items__item">
										{ !! imageID && (
											<div className="smb-items__item__figure">
												<img
													src={ imageURL }
													alt=""
													data-image-id={ imageID }
												/>
											</div>
										) }

										<div className="smb-items__item__title">
											<RichText.Content
												value={ itemTitle }
											/>
										</div>

										{ ! RichText.isEmpty( lede ) && (
											<div className="smb-items__item__lede">
												<RichText.Content
													value={ lede }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( summary ) && (
											<div className="smb-items__item__content">
												<RichText.Content
													value={ summary }
												/>
											</div>
										) }

										{ ! RichText.isEmpty( btnLabel ) &&
											!! btnURL && (
												<div className="smb-items__item__action">
													<a
														className="smb-items__item__btn smb-btn"
														href={ btnURL }
														target={ btnTarget }
														style={ {
															backgroundColor: btnBackgroundColor,
														} }
														data-background-color={
															btnBackgroundColor
														}
														data-color={
															btnTextColor
														}
													>
														<span
															className="smb-btn__label"
															style={ {
																color: btnTextColor,
															} }
														>
															<RichText.Content
																value={
																	btnLabel
																}
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
