import { get, times } from 'lodash';

import { RichText, InnerBlocks } from '@wordpress/block-editor';

import { createBlock } from '@wordpress/blocks';

export default [
	{
		save() {
			return (
				<div className="smb-step">
					<div className="smb-step__body">
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
				selector: '.smb-step__item',
				default: [],
				query: {
					title: {
						source: 'html',
						selector: '.smb-step__item__title > span',
					},
					summary: {
						source: 'html',
						selector: '.smb-step__item__summary',
					},
					numberColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__number',
						attribute: 'data-number-color',
					},
					imagePosition: {
						type: 'string',
						source: 'attribute',
						attribute: 'data-image-position',
						default: 'center',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-step__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__figure > img',
						attribute: 'src',
						default: '',
					},
					linkLabel: {
						source: 'html',
						selector: '.smb-step__item__link__label',
					},
					linkURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'href',
						default: '',
					},
					linkTarget: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'target',
						default: '_self',
					},
					linkColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'data-color',
					},
				},
			},
			rows: {
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
					const summary = get(
						attributes.content,
						[ index, 'summary' ],
						''
					);
					const numberColor = get(
						attributes.content,
						[ index, 'numberColor' ],
						null
					);
					const imagePosition = get(
						attributes.content,
						[ index, 'imagePosition' ],
						'left'
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
					const linkURL = get(
						attributes.content,
						[ index, 'linkURL' ],
						''
					);
					const linkTarget = get(
						attributes.content,
						[ index, 'linkTarget' ],
						'_self'
					);
					const linkLabel = get(
						attributes.content,
						[ index, 'linkLabel' ],
						''
					);
					const linkColor = get(
						attributes.content,
						[ index, 'linkColor' ],
						''
					);

					return createBlock( 'snow-monkey-blocks/step--item', {
						title,
						summary,
						numberColor,
						imagePosition,
						imageID: Number( imageID ),
						imageURL,
						linkURL,
						linkTarget,
						linkLabel,
						linkColor,
					} );
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
				<div className="smb-step">
					<div className="smb-step__body">
						{ times( length, ( index ) => {
							const title = get(
								content,
								[ index, 'title' ],
								''
							);
							const summary = get(
								content,
								[ index, 'summary' ],
								''
							);
							const numberColor = get(
								content,
								[ index, 'numberColor' ],
								null
							);
							const imagePosition = get(
								content,
								[ index, 'imagePosition' ],
								'left'
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
							const linkURL = get(
								content,
								[ index, 'linkURL' ],
								''
							);
							const linkTarget = get(
								content,
								[ index, 'linkTarget' ],
								'_self'
							);
							const linkLabel = get(
								content,
								[ index, 'linkLabel' ],
								''
							);
							const linkColor = get(
								content,
								[ index, 'linkColor' ],
								''
							);

							return (
								<div
									className={ `smb-step__item smb-step__item--image-${ imagePosition }` }
									data-image-position={ imagePosition }
								>
									<div className="smb-step__item__title">
										<div
											className="smb-step__item__number"
											data-number-color={ numberColor }
											style={ {
												backgroundColor: numberColor,
											} }
										>
											{ index + 1 }
										</div>
										<span>
											<RichText.Content value={ title } />
										</span>
									</div>

									{ !! imageID && (
										<div className="smb-step__item__figure">
											<img
												src={ imageURL }
												alt=""
												className={ `wp-image-${ imageID }` }
												data-image-id={ imageID }
											/>
										</div>
									) }

									<div className="smb-step__item__body">
										<div className="smb-step__item__summary">
											<RichText.Content
												value={ summary }
											/>
										</div>

										{ ! RichText.isEmpty( linkLabel ) && (
											<a
												className="smb-step__item__link"
												href={ linkURL }
												target={ linkTarget }
												data-color={ linkColor }
												style={ { color: linkColor } }
											>
												<i className="fas fa-arrow-circle-right" />
												<span className="smb-step__item__link__label">
													<RichText.Content
														value={ linkLabel }
													/>
												</span>
											</a>
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
				selector: '.smb-step__item',
				default: [],
				query: {
					title: {
						source: 'html',
						selector: '.smb-step__item__title > span',
					},
					summary: {
						source: 'html',
						selector: '.smb-step__item__summary',
					},
					numberColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__number',
						attribute: 'data-number-color',
					},
					imagePosition: {
						type: 'string',
						source: 'attribute',
						attribute: 'data-image-position',
						default: 'center',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-step__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__figure > img',
						attribute: 'src',
						default: '',
					},
					linkLabel: {
						source: 'html',
						selector: '.smb-step__item__link__label',
					},
					linkURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'href',
						default: '',
					},
					linkTarget: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'target',
						default: '_self',
					},
				},
			},
			rows: {
				type: 'number',
				default: 1,
			},
		},

		save( { attributes } ) {
			const { rows, content } = attributes;

			return (
				<div className="smb-step">
					<div className="smb-step__body">
						{ times( rows, ( index ) => {
							const title = get(
								content,
								[ index, 'title' ],
								''
							);
							const summary = get(
								content,
								[ index, 'summary' ],
								''
							);
							const numberColor = get(
								content,
								[ index, 'numberColor' ],
								null
							);
							const imagePosition = get(
								content,
								[ index, 'imagePosition' ],
								'left'
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
							const linkURL = get(
								content,
								[ index, 'linkURL' ],
								''
							);
							const linkTarget = get(
								content,
								[ index, 'linkTarget' ],
								'_self'
							);
							const linkLabel = get(
								content,
								[ index, 'linkLabel' ],
								''
							);

							return (
								<div
									className={ `smb-step__item smb-step__item--image-${ imagePosition }` }
									data-image-position={ imagePosition }
								>
									<div className="smb-step__item__title">
										<div
											className="smb-step__item__number"
											data-number-color={ numberColor }
											style={ {
												backgroundColor: numberColor,
											} }
										>
											{ index + 1 }
										</div>
										<span>
											<RichText.Content value={ title } />
										</span>
									</div>

									{ !! imageID && (
										<div className="smb-step__item__figure">
											<img
												src={ imageURL }
												alt=""
												className={ `wp-image-${ imageID }` }
												data-image-id={ imageID }
											/>
										</div>
									) }

									<div className="smb-step__item__body">
										<div className="smb-step__item__summary">
											<RichText.Content
												value={ summary }
											/>
										</div>

										{ ! RichText.isEmpty( linkLabel ) &&
											!! linkURL && (
												<a
													className="smb-step__item__link"
													href={ linkURL }
													target={ linkTarget }
												>
													<i className="fas fa-arrow-circle-right" />
													<span className="smb-step__item__link__label">
														<RichText.Content
															value={ linkLabel }
														/>
													</span>
												</a>
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
				selector: '.smb-step__item',
				default: [],
				query: {
					title: {
						source: 'html',
						selector: '.smb-step__item__title > span',
					},
					summary: {
						source: 'html',
						selector: '.smb-step__item__summary',
					},
					numberColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__number',
						attribute: 'data-number-color',
					},
					imagePosition: {
						type: 'string',
						source: 'attribute',
						attribute: 'data-image-position',
						default: 'center',
					},
					imageID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-step__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					imageURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__figure > img',
						attribute: 'src',
						default: '',
					},
					linkLabel: {
						source: 'html',
						selector: '.smb-step__item__link__label',
					},
					linkURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'href',
						default: '',
					},
					linkTarget: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-step__item__link',
						attribute: 'target',
						default: '_self',
					},
				},
			},
			rows: {
				type: 'number',
				default: 1,
			},
		},

		save( { attributes } ) {
			const { rows, content } = attributes;

			return (
				<div className="smb-step">
					<div className="smb-step__body">
						{ times( rows, ( index ) => {
							const title = get(
								content,
								[ index, 'title' ],
								''
							);
							const summary = get(
								content,
								[ index, 'summary' ],
								''
							);
							const numberColor = get(
								content,
								[ index, 'numberColor' ],
								null
							);
							const imagePosition = get(
								content,
								[ index, 'imagePosition' ],
								'left'
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
							const linkURL = get(
								content,
								[ index, 'linkURL' ],
								''
							);
							const linkTarget = get(
								content,
								[ index, 'linkTarget' ],
								'_self'
							);
							const linkLabel = get(
								content,
								[ index, 'linkLabel' ],
								''
							);

							return (
								<div
									className={ `smb-step__item smb-step__item--image-${ imagePosition }` }
									data-image-position={ imagePosition }
								>
									<div className="smb-step__item__title">
										<div
											className="smb-step__item__number"
											data-number-color={ numberColor }
											style={ {
												backgroundColor: numberColor,
											} }
										>
											{ index + 1 }
										</div>
										<span>
											<RichText.Content value={ title } />
										</span>
									</div>

									{ !! imageID && (
										<div className="smb-step__item__figure">
											<img
												src={ imageURL }
												alt=""
												data-image-id={ imageID }
											/>
										</div>
									) }

									<div className="smb-step__item__body">
										<div className="smb-step__item__summary">
											<RichText.Content
												value={ summary }
											/>
										</div>

										{ ! RichText.isEmpty( linkLabel ) &&
											!! linkURL && (
												<a
													className="smb-step__item__link"
													href={ linkURL }
													target={ linkTarget }
												>
													<i className="fas fa-arrow-circle-right" />
													<span className="smb-step__item__link__label">
														<RichText.Content
															value={ linkLabel }
														/>
													</span>
												</a>
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
