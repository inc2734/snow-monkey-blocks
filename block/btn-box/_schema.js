'use strict';

const { __ } = wp.i18n;

export const schema = {
	lede: {
		source: 'html',
		selector: '.smb-btn-box__lede',
	},
	note: {
		source: 'html',
		selector: '.smb-btn-box__note',
	},
	backgroundColor: {
		type: 'string',
	},
	btnLabel: {
		source: 'html',
		selector: '.smb-btn__label',
		default: __( 'Button', 'snow-monkey-blocks' ),
	},
	btnURL: {
		type: 'string',
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
	btnSize: {
		type: 'string',
		default: null,
	},
};
