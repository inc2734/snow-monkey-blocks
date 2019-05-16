'use strict';

export const schema = {
	name: {
		source: 'html',
		selector: '.smb-directory-structure--item--file__name',
		default: '',
	},
	iconVendor: {
		type: 'string',
		default: 'far',
	},
	iconClass: {
		type: 'string',
		default: 'file-alt',
	},
	iconColor: {
		type: 'string',
	},
};
