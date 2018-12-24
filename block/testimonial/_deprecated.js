'use strict';

const { get, times } = lodash;
const { RichText } = wp.editor;
const { createBlock } = wp.blocks;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: {
			items: {
				type: 'array',
				default: [],
				selector: '.smb-testimonial__item',
				source: 'query',
				query: {
					avatarID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-testimonial__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					avatarURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-testimonial__item__figure > img',
						attribute: 'src',
						default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
					},
					name: {
						source: 'html',
						selector: '.smb-testimonial__item__name',
					},
					lede: {
						source: 'html',
						selector: '.smb-testimonial__item__lede',
					},
					content: {
						source: 'html',
						selector: '.smb-testimonial__item__content',
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
				const ret = [];

				for ( let index = 0; index < attributes.items.length; index++ ) {
					const avatarID = get( attributes.items, [ index, 'avatarID' ], 0 );
					const avatarURL = get( attributes.items, [ index, 'avatarURL' ], 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g' );
					const name = get( attributes.items, [ index, 'name' ], '' );
					const lede = get( attributes.items, [ index, 'lede' ], '' );
					const content = get( attributes.items, [ index, 'content' ], '' );

					ret.push(
						createBlock( 'snow-monkey-blocks/testimonial--item', {
							avatarID: avatarID,
							avatarURL: avatarURL,
							name: name,
							lede: lede,
							content: content,
						} )
					);
				}

				return ret;
			};

			return [
				{},
				migratedInnerBlocks(),
			];
		},

		save( { attributes } ) {
			const { items } = attributes;

			return (
				<div className="smb-testimonial">
					<div className="smb-testimonial__body">
						<div className="c-row c-row--margin">
							{ ( () => {
								const ret = [];
								for ( let index = 0; index < items.length; index++ ) {
									const avatarID = get( items, [ index, 'avatarID' ], 0 );
									const avatarURL = get( items, [ index, 'avatarURL' ], 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g' );
									const name = get( items, [ index, 'name' ], '' );
									const lede = get( items, [ index, 'lede' ], '' );
									const content = get( items, [ index, 'content' ], '' );

									ret.push(
										<div className="c-row__col c-row__col--1-1 c-row__col--md-1-2">
											<div className="smb-testimonial__item">
												<div className="smb-testimonial__item__figure">
													<img src={ avatarURL } alt="" className={ `wp-image-${ avatarID }` } data-image-id={ avatarID } />
												</div>
												<div className="smb-testimonial__item__body">
													<div className="smb-testimonial__item__content">
														<RichText.Content value={ content } />
													</div>
													<div className="smb-testimonial__item__name">
														<RichText.Content value={ name } />
													</div>
													{ ! RichText.isEmpty( lede ) &&
														<div className="smb-testimonial__item__lede">
															<RichText.Content value={ lede } />
														</div>
													}
												</div>
											</div>
										</div>
									);

									return (
										<Fragment>
											{ ret }
										</Fragment>
									);
								}
							} )() }
						</div>
					</div>
				</div>
			);
		},
	},
	{
		attributes: {
			items: {
				type: 'array',
				default: [],
				selector: '.smb-testimonial__item',
				source: 'query',
				query: {
					avatarID: {
						type: 'number',
						source: 'attribute',
						selector: '.smb-testimonial__item__figure > img',
						attribute: 'data-image-id',
						default: 0,
					},
					avatarURL: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-testimonial__item__figure > img',
						attribute: 'src',
						default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
					},
					name: {
						source: 'html',
						selector: '.smb-testimonial__item__name',
					},
					lede: {
						source: 'html',
						selector: '.smb-testimonial__item__lede',
					},
					content: {
						source: 'html',
						selector: '.smb-testimonial__item__content',
					},
				},
			},
			columns: {
				type: 'number',
				default: 1,
			},
		},

		save( { attributes } ) {
			const { items, columns } = attributes;

			return (
				<div className="smb-testimonial">
					<div className="smb-testimonial__body">
						<div className="c-row c-row--margin">
							{ times( columns, ( index ) => {
								const avatarID = get( items, [ index, 'avatarID' ], 0 );
								const avatarURL = get( items, [ index, 'avatarURL' ], 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g' );
								const name = get( items, [ index, 'name' ], '' );
								const lede = get( items, [ index, 'lede' ], '' );
								const content = get( items, [ index, 'content' ], '' );

								return (
									<div className="c-row__col c-row__col--1-1 c-row__col--md-1-2">
										<div className="smb-testimonial__item">
											<div className="smb-testimonial__item__figure">
												<img src={ avatarURL } alt="" data-image-id={ avatarID } />
											</div>
											<div className="smb-testimonial__item__body">
												<div className="smb-testimonial__item__content">
													<RichText.Content value={ content } />
												</div>
												<div className="smb-testimonial__item__name">
													<RichText.Content value={ name } />
												</div>
												{ ! RichText.isEmpty( lede ) &&
													<div className="smb-testimonial__item__lede">
														<RichText.Content value={ lede } />
													</div>
												}
											</div>
										</div>
									</div>
								);
							} ) }
						</div>
					</div>
				</div>
			);
		},
	},
];
