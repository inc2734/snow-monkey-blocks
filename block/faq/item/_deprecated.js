'use strict';

import { schema } from './_schema.js';

const { RichText } = wp.editor;

export const deprecated = [
	{
		attributes: schema,

		save( { attributes } ) {
			const { question, answer, questionColor, answerColor } = attributes;

			return (
				<div className="smb-faq__item">
					<div className="smb-faq__item__question">
						<div className="smb-faq__item__question__label" style={ { color: questionColor } }>
							Q
						</div>
						<div className="smb-faq__item__question__body">
							<RichText.Content value={ question } />
						</div>
					</div>

					<div className="smb-faq__item__answer">
						<div className="smb-faq__item__answer__label" style={ { color: answerColor } }>
							A
						</div>
						<div className="smb-faq__item__answer__body">
							<RichText.Content value={ answer } />
						</div>
					</div>
				</div>
			);
		},
	},
];
