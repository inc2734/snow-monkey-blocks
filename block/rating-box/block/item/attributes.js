'use strict';

export default {
	title: {
		type: 'string',
		source: 'html',
		selector: '.smb-rating-box__item__title',
		default: '',
	},
	rating: {
		type: 'number',
		default: 0,
	},
	color: {
		type: 'string',
	},
};
