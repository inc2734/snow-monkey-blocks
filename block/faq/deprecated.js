import { get, times } from 'lodash';

import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

export default [
	{
		save() {
			return (
				<div className="smb-faq">
					<div className="smb-faq__body">
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
				selector: '.smb-faq__item',
				default: [],
				query: {
					question: {
						type: 'string',
						source: 'html',
						selector: '.smb-faq__item__question__body',
						default: '',
					},
					answer: {
						type: 'string',
						source: 'html',
						selector: '.smb-faq__item__answer__body',
						multiline: 'p',
						default: '',
					},
					questionColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-faq__item__question__label',
						attribute: 'data-color',
					},
					answerColor: {
						type: 'string',
						source: 'attribute',
						selector: '.smb-faq__item__answer__label',
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
					const question = get(
						attributes.content,
						[ index, 'question' ],
						''
					);
					const answer = get(
						attributes.content,
						[ index, 'answer' ],
						''
					);
					const questionColor = get(
						attributes.content,
						[ index, 'questionColor' ],
						''
					);
					const answerColor = get(
						attributes.content,
						[ index, 'answerColor' ],
						''
					);

					return createBlock( 'snow-monkey-blocks/faq--item', {
						question,
						answer,
						questionColor,
						answerColor,
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
				<div className="smb-faq">
					<div className="smb-faq__body">
						{ times( length, ( index ) => {
							const question = get(
								content,
								[ index, 'question' ],
								''
							);
							const answer = get(
								content,
								[ index, 'answer' ],
								''
							);
							const questionColor = get(
								content,
								[ index, 'questionColor' ],
								''
							);
							const answerColor = get(
								content,
								[ index, 'answerColor' ],
								''
							);

							return (
								<div className="smb-faq__item">
									<div className="smb-faq__item__question">
										<div
											className="smb-faq__item__question__label"
											style={ { color: questionColor } }
											data-color={ questionColor }
										>
											Q
										</div>
										<div className="smb-faq__item__question__body">
											<RichText.Content
												value={ question }
											/>
										</div>
									</div>

									<div className="smb-faq__item__answer">
										<div
											className="smb-faq__item__answer__label"
											style={ { color: answerColor } }
											data-color={ answerColor }
										>
											A
										</div>
										<div className="smb-faq__item__answer__body">
											<RichText.Content
												value={ answer }
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
