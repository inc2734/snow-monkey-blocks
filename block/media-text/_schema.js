'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-media-text__title',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-media-text__figure > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-media-text__figure > img',
		attribute: 'alt',
		default: '',
	},
	imagePosition: {
		type: 'string',
		default: 'right',
	},
	imageColumnSize: {
		type: 'string',
		default: 66,
	},
};
