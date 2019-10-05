'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-exclusive-accordion__item__title__label',
	},
	rootId: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-exclusive-accordion__item__control',
		attribute: 'name',
		default: '',
	},
};
