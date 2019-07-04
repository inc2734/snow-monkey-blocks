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
	imageSize: {
		type: 'string',
		default: 'l',
	},
	contentSize: {
		type: 'string',
		default: 's',
	},
	contentHorizontalPosition: {
		type: 'string',
		default: 's',
	},
	contentVerticalPosition: {
		type: 'string',
	},
	contentBackgroundColor: {
		type: 'string',
	},
	contentPadding: {
		type: 'string',
	},
	shadowColor: {
		type: 'string',
	},
	shadowHorizontalPosition: {
		type: 'number',
		default: 5,
	},
	shadowVerticalPosition: {
		type: 'number',
		default: 5,
	},
};
