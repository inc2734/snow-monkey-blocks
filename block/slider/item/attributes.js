'use strict';

export default {
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-slider__item__figure > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-slider__item__figure > img',
		attribute: 'alt',
		default: '',
	},
	caption: {
		source: 'html',
		selector: '.smb-slider__item__caption',
	},
	url: {
		type: 'string',
		default: '',
	},
	target: {
		type: 'string',
		default: '_self',
	},
};
