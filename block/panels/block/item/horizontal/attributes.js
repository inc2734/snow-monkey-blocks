'use strict';

export default {
	titleTagName: {
		type: 'string',
		default: 'div',
	},
	title: {
		source: 'html',
		selector: '.smb-panels__item__title',
	},
	summary: {
		source: 'html',
		selector: '.smb-panels__item__content',
	},
	linkLabel: {
		source: 'html',
		selector: '.smb-panels__item__link',
	},
	linkURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-panels__item',
		attribute: 'href',
		default: '',
	},
	linkTarget: {
		type: 'string',
		default: '_self',
	},
	imagePosition: {
		type: 'string',
		default: 'right',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-panels__item__figure > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-panels__item__figure > img',
		attribute: 'alt',
		default: '',
	},
};
