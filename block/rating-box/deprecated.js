import { get, times } from 'lodash';

import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

export default [
	{
		save() {
			return (
				<div className="smb-rating-box">
					<div className="smb-rating-box__body">
						<InnerBlocks.Content />
					</div>
				</div>
			);
		},
	},
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
				const length =
					'undefined' === typeof attributes.ratings
						? 0
						: attributes.ratings.length;

				return times( length, ( index ) => {
					const title = get(
						attributes.ratings,
						[ index, 'title' ],
						''
					);
					const rating = get(
						attributes.ratings,
						[ index, 'rating' ],
						0
					);
					const color = get(
						attributes.ratings,
						[ index, 'color' ],
						''
					);

					return createBlock( 'snow-monkey-blocks/rating-box--item', {
						title,
						rating: Number( rating ),
						color,
					} );
				} );
			};

			return [ {}, migratedInnerBlocks() ];
		},

		save( { attributes } ) {
			const { ratings } = attributes;
			const length =
				'undefined' === typeof attributes.ratings
					? 0
					: attributes.ratings.length;

			return (
				<div className="smb-rating-box">
					<div className="smb-rating-box__body">
						{ times( length, ( index ) => {
							const title = get(
								ratings,
								[ index, 'title' ],
								''
							);
							const rating = get(
								ratings,
								[ index, 'rating' ],
								0
							);
							const color = get(
								ratings,
								[ index, 'color' ],
								''
							);

							return (
								<div
									className="smb-rating-box__item"
									data-rating={ rating }
									data-color={ color }
								>
									<div className="smb-rating-box__item__title">
										<RichText.Content value={ title } />
									</div>

									<div className="smb-rating-box__item__evaluation">
										<div className="smb-rating-box__item__evaluation__bar">
											<div className="smb-rating-box__item__evaluation__numeric">
												{ rating }
											</div>
											<div
												className="smb-rating-box__item__evaluation__rating"
												style={ {
													width: `${ rating * 10 }%`,
													backgroundColor: color,
												} }
											/>
										</div>
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
