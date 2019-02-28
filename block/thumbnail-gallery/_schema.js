'use strict';

export const schema = {
	content: {
		type: 'array',
		source: 'query',
		selector: '.smb-thumbnail-gallery__item',
		default: [],
		query: {
			imageID: {
				type: 'number',
				source: 'attribute',
				selector: '.smb-thumbnail-gallery__item__figure > img',
				attribute: 'data-image-id',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-thumbnail-gallery__item__figure > img',
				attribute: 'src',
				default: '',
			},
		},
	},
	items: {
		type: 'number',
		default: 2,
	},
};
