'use strict';

export default {
	titleTagName: {
		type: 'string',
		default: 'h2',
	},
	title: {
		type: 'string',
		source: 'html',
		selector: '.smb-media-text__title',
		default: '',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-media-text__figure img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-media-text__figure img',
		attribute: 'alt',
		default: '',
	},
	caption: {
		type: 'string',
		source: 'html',
		selector: '.smb-media-text__caption',
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
	url: {
		type: 'string',
		default: '',
	},
	target: {
		type: 'string',
		default: '_self',
	},
};
