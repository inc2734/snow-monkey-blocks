'use strict';

export default {
	content: {
		type: 'string',
		source: 'html',
		selector: 'ul',
		multiline: 'li',
		default: '',
	},
	icon: {
		type: 'string',
		default: 'angle-right',
	},
	iconColor: {
		type: 'string',
	},
};
