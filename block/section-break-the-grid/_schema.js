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
		selector: '.smb-section-break-the-grid__figure > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-break-the-grid__figure > img',
		attribute: 'alt',
		default: '',
	},
	textColor: {
		type: 'string',
	},
	imagePosition: {
		type: 'string',
		default: 'right',
	},
	imageSizeAdjustment: {
		type: 'string',
		default: '3-2',
	},
	contentSizeAdjustment: {
		type: 'string',
		default: '1-2',
	},
	shadowColor: {
		type: 'string',
	},
	shadowWidth: {
		type: 'string',
		default: '1-2',
	},
	shadowHeight: {
		type: 'string',
		default: '1-2',
	},
};
