'use strict';

const { __ } = wp.i18n;

export const schema = {
	content: {
		source: 'html',
		selector: '.smb-btn__label',
		default: __( 'Button', 'snow-monkey-blocks' ),
	},
	url: {
		type: 'string',
		default: '',
	},
	target: {
		type: 'string',
		default: '_self',
	},
	modifier: {
		type: 'string',
		default: '',
	},
	backgroundColor: {
		type: 'string',
	},
	textColor: {
		type: 'string',
	},
};
