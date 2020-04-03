'use strict';

export default {
	title: {
		type: 'string',
		source: 'html',
		selector: '.smb-accordion__item__title__label',
		default: '',
	},
	initialState: {
		type: 'boolean',
		default: false,
	},
};
