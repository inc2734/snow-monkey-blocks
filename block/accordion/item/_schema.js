'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-accordion__item__title__label',
	},
	initialState: {
		type: 'boolean',
		default: false,
	},
};
