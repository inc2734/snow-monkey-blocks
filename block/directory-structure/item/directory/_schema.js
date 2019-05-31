'use strict';

export const schema = {
	name: {
		source: 'html',
		selector: '.smb-directory-structure__item__name',
		default: '',
	},
	iconVendor: {
		type: 'string',
		default: 'fas',
	},
	iconClass: {
		type: 'string',
		default: 'folder',
	},
	iconColor: {
		type: 'string',
	},
};
