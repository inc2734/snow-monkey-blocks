'use strict';

export default {
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
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-thumbnail-gallery__item__figure > img',
		attribute: 'alt',
		default: '',
	},
	caption: {
		type: 'string',
		source: 'html',
		selector: '.smb-thumbnail-gallery__item__caption',
		default: '',
	},
};
