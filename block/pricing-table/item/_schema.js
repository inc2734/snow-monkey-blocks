'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-pricing-table__item__title',
	},
	price: {
		source: 'html',
		selector: '.smb-pricing-table__item__price',
	},
	lede: {
		source: 'html',
		selector: '.smb-pricing-table__item__lede',
	},
	list: {
		source: 'html',
		selector: 'ul',
	},
	btnLabel: {
		source: 'html',
		selector: '.smb-pricing-table__item__btn > .smb-btn__label',
	},
	btnURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-pricing-table__item__btn',
		attribute: 'href',
		default: '',
	},
	btnTarget: {
		type: 'string',
		default: '_self',
	},
	btnBackgroundColor: {
		type: 'string',
	},
	btnTextColor: {
		type: 'string',
	},
	imageID: {
		type: 'number',
		default: 0,
	},
	imageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-pricing-table__item__figure > img',
		attribute: 'src',
		default: '',
	},
};
