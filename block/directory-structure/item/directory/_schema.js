'use strict';

export const schema = {
	name: {
		source: 'html',
		selector: '.smb-directory-structure--item--directory__name',
		default: '',
	},
	iconVendor: {
		type: 'string',
		default: 'far',
	},
	iconClass: {
		type: 'string',
		default: 'folder',
	},
	iconColor: {
		type: 'string',
	},
};
