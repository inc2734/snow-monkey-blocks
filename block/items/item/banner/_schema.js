'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-items__banner__title',
	},
	lede: {
		source: 'html',
		selector: '.smb-items__banner__lede',
	},
	url: {
		type: 'string',
		default: '',
	},
	target: {
		type: 'string',
		default: '_self',
	},
	blur: {
		type: 'boolean',
		default: false,
	},
	textColor: {
		type: 'string',
		default: '#fff',
	},
	maskColor: {
		type: 'string',
		default: '#000',
	},
	maskOpacity: {
		type: 'number',
		default: 1,
	},
	imageSize: {
		default: 'default',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-items__banner__figure > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-items__banner__figure > img',
		attribute: 'alt',
		default: '',
	},
};
