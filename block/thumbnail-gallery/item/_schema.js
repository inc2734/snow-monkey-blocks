'use strict';

export const schema = {
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-thumbnail-gallery__item__figure > img',
		attribute: 'src',
		default: '',
	},
};
