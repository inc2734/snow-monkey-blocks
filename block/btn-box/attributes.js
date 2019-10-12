'use strict';

import {
	__,
} from '@wordpress/i18n';

export default {
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
