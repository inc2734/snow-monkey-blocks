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
	content: {
		type: 'array',
		source: 'query',
		selector: '.smb-slider__item',
		default: [],
		query: {
			imageID: {
				type: 'number',
				source: 'attribute',
				selector: '.smb-slider__item__figure > img',
				attribute: 'data-image-id',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-slider__item__figure > img',
				attribute: 'src',
				default: '',
			},
			caption: {
				source: 'html',
				selector: '.smb-slider__item__caption',
			},
		},
	},
	items: {
		type: 'number',
		default: 2,
	},
};
