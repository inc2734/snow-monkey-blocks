'use strict';

export const schema = {
	scope: {
		type: 'string',
	},
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
	imageColumnSize: {
		type: 'number',
		default: 66,
	},
	imageSizeAdjustment: {
		type: 'string',
	},
	contentSizeAdjustment: {
		type: 'string',
	},
	contentHorizontalPositionAdjustment: {
		type: 'string',
		default: '1-6',
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
