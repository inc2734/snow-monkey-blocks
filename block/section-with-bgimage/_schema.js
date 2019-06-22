'use strict';

export const schema = {
	titleTagName: {
		type: 'string',
		default: 'h2',
	},
	title: {
		source: 'html',
		selector: '.smb-section__title',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage > img',
		attribute: 'alt',
		default: '',
	},
	height: {
		type: 'string',
		default: 'fit',
	},
	contentsAlignment: {
		type: 'string',
		default: 'left',
	},
	maskColor: {
		type: 'string',
	},
	maskOpacity: {
		type: 'number',
		default: 1,
	},
	textColor: {
		type: 'string',
		default: '#fff',
	},
	parallax: {
		type: 'boolean',
		default: false,
	},
	contentsWidth: {
		type: 'boolean',
		default: false,
	},
};
