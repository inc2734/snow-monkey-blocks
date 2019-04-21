'use strict';

export const schema = {
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
	imageALT: {
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
};
