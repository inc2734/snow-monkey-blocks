'use strict';

export default {
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
	imagePadding: {
		type: 'boolean',
		default: false,
	},
	itemTitleTagName: { // backward compatibility
		type: 'string',
		default: 'div',
	},
};
