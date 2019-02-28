'use strict';

export const schema = {
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
	},
	answerColor: {
		type: 'string',
	},
};
