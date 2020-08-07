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
			const { sm, md, lg, imagePadding } = attributes;

			return (
				<div className="smb-panels" data-image-padding={ imagePadding }>
					<div
						className="c-row c-row--margin c-row--fill"
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
			...blockAttributes,
			columns: {
				type: 'number',
				default: 2,
			},
			items: {
				type: 'array',
				source: 'query',
				default: [],
				selector: '.smb-panels__item',
				query: {
					title: {
						source: 'html',
						selector: '.smb-panels__item__title',
					},
					summary: {
						source: 'html',
						selector: '.smb-panels__item__content',
					},
					linkLabel: {
						source: 'html',
						selector: '.smb-panels__item__link',
					},
					linkURL: {
						type: 'string',
						source: 'attribute',
						attribute: 'href',
						default: '',
					},
					linkTarget: {
						type: 'string',
						source: 'attribute',
						attribute: 'target',
						default: '_self',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-panels__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-panels__item__figure > img',
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
					const summary = get(
						attributes.items,
						[ index, 'summary' ],
						''
					);
					const linkLabel = get(
						attributes.items,
						[ index, 'linkLabel' ],
						''
					);
					const linkURL = get(
						attributes.items,
						[ index, 'linkURL' ],
						''
					);
					const linkTarget = get(
						attributes.items,
						[ index, 'linkTarget' ],
						'_self'
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

					return createBlock( 'snow-monkey-blocks/panels--item', {
						titleTagName: attributes.itemTitleTagName,
						title,
						summary,
						linkLabel,
						linkURL,
						linkTarget,
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
					imagePadding: Boolean( attributes.imagePadding ),
				},
				migratedInnerBlocks(),
			];
		},

		save( { attributes } ) {
			const {
				sm,
				md,
				lg,
				imagePadding,
				itemTitleTagName,
				items,
			} = attributes;
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
					className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` }
					data-image-padding={ imagePadding }
				>
					<div className="c-row c-row--margin c-row--fill">
						{ times( length, ( index ) => {
							const itemTitle = get(
								items,
								[ index, 'title' ],
								''
							);
							const summary = get(
								items,
								[ index, 'summary' ],
								''
							);
							const linkLabel = get(
								items,
								[ index, 'linkLabel' ],
								''
							);
							const linkURL = get(
								items,
								[ index, 'linkURL' ],
								''
							);
							const linkTarget = get(
								items,
								[ index, 'linkTarget' ],
								'_self'
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

							const renderItem = ( itemContent ) => {
								if ( !! linkURL ) {
									return (
										<a
											className="smb-panels__item"
											href={ linkURL }
											target={ linkTarget }
										>
											{ itemContent }
										</a>
									);
								}

								return (
									<div
										className="smb-panels__item"
										href={ linkURL }
										target={ linkTarget }
									>
										{ itemContent }
									</div>
								);
							};

							return (
								<div
									className={ generateColClasses(
										sm,
										md,
										lg
									) }
								>
									{ renderItem(
										<>
											{ !! imageID && (
												<div className="smb-panels__item__figure">
													<img
														src={ imageURL }
														alt=""
														className={ `wp-image-${ imageID }` }
														data-image-id={
															imageID
														}
													/>
												</div>
											) }

											<div className="smb-panels__item__body">
												{ ! RichText.isEmpty(
													itemTitle
												) && (
													<RichText.Content
														tagName={
															itemTitleTagName
														}
														className="smb-panels__item__title"
														value={ itemTitle }
													/>
												) }

												{ ! RichText.isEmpty(
													summary
												) && (
													<div className="smb-panels__item__content">
														<RichText.Content
															value={ summary }
														/>
													</div>
												) }

												{ ! RichText.isEmpty(
													linkLabel
												) && (
													<div className="smb-panels__item__action">
														<div className="smb-panels__item__link">
															<RichText.Content
																value={
																	linkLabel
																}
															/>
														</div>
													</div>
												) }
											</div>
										</>
									) }
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
			imagePadding: {
				type: 'boolean',
				default: false,
			},
			items: {
				type: 'array',
				source: 'query',
				default: [],
				selector: '.smb-panels__item',
				query: {
					title: {
						source: 'html',
						selector: '.smb-panels__item__title',
					},
					summary: {
						source: 'html',
						selector: '.smb-panels__item__content',
					},
					linkLabel: {
						source: 'html',
						selector: '.smb-panels__item__link',
					},
					linkURL: {
						type: 'string',
						source: 'attribute',
						attribute: 'href',
						default: '',
					},
					linkTarget: {
						type: 'string',
						source: 'attribute',
						attribute: 'target',
						default: '_self',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-panels__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-panels__item__figure > img',
						attribute: 'src',
						default: '',
					},
				},
			},
		},

		save( { attributes } ) {
			const { columns, sm, md, lg, imagePadding, items } = attributes;

			return (
				<div
					className={ `smb-panels smb-panels--sm-${ sm } smb-panels--md-${ md } smb-panels--lg-${ lg }` }
					data-image-padding={ imagePadding }
				>
					<div className="c-row c-row--margin c-row--fill">
						{ times( columns, ( index ) => {
							const itemTitle = get(
								items,
								[ index, 'title' ],
								''
							);
							const summary = get(
								items,
								[ index, 'summary' ],
								''
							);
							const linkLabel = get(
								items,
								[ index, 'linkLabel' ],
								''
							);
							const linkURL = get(
								items,
								[ index, 'linkURL' ],
								''
							);
							const linkTarget = get(
								items,
								[ index, 'linkTarget' ],
								'_self'
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

							const renderItem = ( itemContent ) => {
								if ( !! linkURL ) {
									return (
										<a
											className="smb-panels__item"
											href={ linkURL }
											target={ linkTarget }
										>
											{ itemContent }
										</a>
									);
								}

								return (
									<div
										className="smb-panels__item"
										href={ linkURL }
										target={ linkTarget }
									>
										{ itemContent }
									</div>
								);
							};

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
									{ renderItem(
										<>
											{ !! imageID && (
												<div className="smb-panels__item__figure">
													<img
														src={ imageURL }
														alt=""
														data-image-id={
															imageID
														}
													/>
												</div>
											) }

											<div className="smb-panels__item__body">
												{ ! RichText.isEmpty(
													itemTitle
												) && (
													<div className="smb-panels__item__title">
														<RichText.Content
															value={ itemTitle }
														/>
													</div>
												) }

												{ ! RichText.isEmpty(
													summary
												) && (
													<div className="smb-panels__item__content">
														<RichText.Content
															value={ summary }
														/>
													</div>
												) }

												{ ! RichText.isEmpty(
													linkLabel
												) && (
													<div className="smb-panels__item__action">
														<div className="smb-panels__item__link">
															<RichText.Content
																value={
																	linkLabel
																}
															/>
														</div>
													</div>
												) }
											</div>
										</>
									) }
								</div>
							);
						} ) }
					</div>
				</div>
			);
		},
	},
];
