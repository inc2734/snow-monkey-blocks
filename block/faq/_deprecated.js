'use strict';

const { get } = lodash;
const { RichText } = wp.editor;
const { createBlock } = wp.blocks;
const { Fragment } = wp.element;

export const deprecated = [
	{
		attributes: {
			content: {
				type: 'array',
				source: 'query',
				selector: '.smb-faq__item',
				default: [],
				query: {
					question: {
						source: 'html',
						selector: '.smb-faq__item__question__body',
					},
					answer: {
						source: 'html',
						selector: '.smb-faq__item__answer__body',
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
				const ret = [];

				for ( let index = 0; index <= attributes.rows; index++ ) {
					const question = get( attributes.content, [ index, 'question' ], '' );
					const answer = get( attributes.content, [ index, 'answer' ], '' );
					const questionColor = get( attributes.content, [ index, 'questionColor' ], '' );
					const answerColor = get( attributes.content, [ index, 'answerColor' ], '' );

					ret.push(
						createBlock( 'snow-monkey-blocks/faq--item', {
							question: question,
							answer: answer,
							questionColor: questionColor,
							answerColor: answerColor,
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
			const { rows, content } = attributes;

			return (
				<div className="smb-faq">
					<div className="smb-faq__body">
						{ ( () => {
							const ret = [];
							for ( let index = 0; index <= rows; index++ ) {
								const question = get( content, [ index, 'question' ], '' );
								const answer = get( content, [ index, 'answer' ], '' );
								const questionColor = get( content, [ index, 'questionColor' ], '' );
								const answerColor = get( content, [ index, 'answerColor' ], '' );

								ret.push(
									<div className="smb-faq__item">
										<div className="smb-faq__item__question">
											<div className="smb-faq__item__question__label" style={ { color: questionColor } } data-color={ questionColor }>
												Q
											</div>
											<div className="smb-faq__item__question__body">
												<RichText.Content value={ question } />
											</div>
										</div>

										<div className="smb-faq__item__answer">
											<div className="smb-faq__item__answer__label" style={ { color: answerColor } } data-color={ answerColor }>
												A
											</div>
											<div className="smb-faq__item__answer__body">
												<RichText.Content value={ answer } />
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
