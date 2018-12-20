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
	items: {
		type: 'array',
		source: 'query',
		default: [],
		selector: '.smb-items__item',
		query: {
			title: {
				source: 'html',
				selector: '.smb-items__item__title',
			},
			lede: {
				source: 'html',
				selector: '.smb-items__item__lede',
			},
			summary: {
				source: 'html',
				selector: '.smb-items__item__content',
			},
			btnLabel: {
				source: 'html',
				selector: '.smb-items__item__btn > .smb-btn__label',
			},
			btnURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__btn',
				attribute: 'href',
				default: '',
			},
			btnTarget: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__btn',
				attribute: 'target',
				default: '_self',
			},
			btnBackgroundColor: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__btn',
				attribute: 'data-background-color',
			},
			btnTextColor: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__btn',
				attribute: 'data-color',
			},
			imageID: {
				type: 'number',
				source: 'attribute',
				selector: '.smb-items__item__figure > img',
				attribute: 'data-image-id',
				default: 0,
			},
			imageURL: {
				type: 'string',
				source: 'attribute',
				selector: '.smb-items__item__figure > img',
				attribute: 'src',
				default: '',
			},
		},
	},
};
