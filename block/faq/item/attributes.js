'use strict';

export default {
	question: {
		source: 'html',
		selector: '.smb-faq__item__question__body',
	},
	questionColor: {
		type: 'string',
	},
	answerColor: {
		type: 'string',
	},
	questionLabel: {
		source: 'html',
		selector: '.smb-faq__item__question__label',
		default: 'Q',
	},
	answerLabel: {
		source: 'html',
		selector: '.smb-faq__item__answer__label',
		default: 'A',
	},
};
