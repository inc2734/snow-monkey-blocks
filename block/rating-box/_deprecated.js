'use strict';

const { get } = lodash;
const { RichText } = wp.editor;
const { createBlock } = wp.blocks;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: {
			ratings: {
				type: 'array',
				source: 'query',
				selector: '.smb-rating-box__item',
				default: [],
				query: {
					title: {
						source: 'html',
						selector: '.smb-rating-box__item__title',
					},
					rating: {
						type: 'number',
						source: 'attribute',
						attribute: 'data-rating',
						default: 0,
					},
					color: {
						type: 'string',
						source: 'attribute',
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
				const ret = [];

				for ( let index = 0; index < attributes.ratings.length; index++ ) {
					const title = get( attributes.ratings, [ index, 'title' ], '' );
					const rating = get( attributes.ratings, [ index, 'rating' ], 0 );
					const color = get( attributes.ratings, [ index, 'color' ], '' );

					ret.push(
						createBlock( 'snow-monkey-blocks/rating-box--item', {
							title: title,
							rating: rating,
							color: color,
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
			const { ratings } = attributes;

			return (
				<div className="smb-rating-box">
					<div className="smb-rating-box__body">
						{ ( () => {
							const ret = [];
							for ( let index = 0; index < ratings.length; index++ ) {
								const title = get( ratings, [ index, 'title' ], '' );
								const rating = get( ratings, [ index, 'rating' ], 0 );
								const color = get( ratings, [ index, 'color' ], '' );

								ret.push(
									<div className="smb-rating-box__item" data-rating={ rating } data-color={ color }>
										<div className="smb-rating-box__item__title" >
											<RichText.Content value={ title } />
										</div>

										<div className="smb-rating-box__item__evaluation">
											<div className="smb-rating-box__item__evaluation__bar">
												<div className="smb-rating-box__item__evaluation__numeric">
													{ rating }
												</div>
												<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
											</div>
										</div>
									</div>
								);
							}

							return (
								<Fragment>
									{ ret }
								</Fragment>
							);
						} )() }
					</div>
				</div>
			);
		},
	},
];
