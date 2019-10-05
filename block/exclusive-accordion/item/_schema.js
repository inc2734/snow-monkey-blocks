'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-exclusive-accordion__item__title__label',
	},
	rootId: {
		type: 'string',
		default: '',
	},
};
