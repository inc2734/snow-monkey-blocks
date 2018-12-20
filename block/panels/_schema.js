'use strict';

export const schema = {
	columns: {
		type: 'number',
		default: 2,
	},
	sm: {
		type: 'number',
		default: 1,
	},
	md: {
		type: 'number',
		default: 1,
	},
	lg: {
		type: 'number',
		default: 2,
	},
	itemTitleTagName: {
		type: 'string',
		default: 'div',
	},
	imagePadding: {
		type: 'boolean',
		default: false,
	},
	items: {
		type: 'array',
		source: 'query',
		default: [],
		selector: '.smb-panels__item',
		query: {
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
				attribute: 'href',
				default: '',
			},
			linkTarget: {
				type: 'string',
				source: 'attribute',
				attribute: 'target',
				default: '_self',
			},
			imageID: {
				type: 'number',
				source: 'attribute',
				selector: '.smb-panels__item__figure > img',
				attribute: 'data-image-id',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-panels__item__figure > img',
				attribute: 'src',
				default: '',
			},
		},
	},
};
