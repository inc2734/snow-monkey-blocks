'use strict';

export default {
	title: {
		source: 'html',
		selector: '.smb-alert__title strong',
	},
	content: {
		source: 'html',
		selector: '.smb-alert__body',
	},
	modifier: {
		type: 'string',
		default: '',
	},
	icon: {
		type: 'string',
		default: 'exclamation-circle',
	},
};
