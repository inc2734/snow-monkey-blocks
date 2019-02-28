'use strict';

export const schema = {
	slidesToShow: {
		type: 'number',
		default: 1,
	},
	slidesToScroll: {
		type: 'number',
		default: 1,
	},
	dots: {
		type: 'boolean',
		default: false,
	},
	arrows: {
		type: 'boolean',
		default: true,
	},
	speed: {
		type: 'number',
		default: 300,
	},
	autoplay: {
		type: 'boolean',
		default: false,
	},
	autoplaySpeed: {
		type: 'number',
		default: 0,
	},
	rtl: {
		type: 'boolean',
		default: false,
	},
};
