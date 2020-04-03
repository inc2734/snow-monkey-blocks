'use strict';

export default {
	question: {
		type: 'string',
		source: 'html',
		selector: '.smb-faq__item__question__body',
		default: '',
	},
	questionColor: {
		type: 'string',
	},
	answerColor: {
		type: 'string',
	},
	questionLabel: {
		type: 'string',
		source: 'html',
		selector: '.smb-faq__item__question__label',
		default: 'Q',
	},
	answerLabel: {
		type: 'string',
		source: 'html',
		selector: '.smb-faq__item__answer__label',
		default: 'A',
	},
};
