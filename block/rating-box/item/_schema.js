'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-rating-box__item__title',
	},
	rating: {
		type: 'number',
		default: 0,
	},
	color: {
		type: 'string',
	},
};
