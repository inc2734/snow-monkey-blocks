'use strict';

export const schema = {
	isUseStartDate: {
		type: 'boolean',
		default: false,
	},
	startDate: {
		type: 'date',
		default: null,
	},
	isUseEndDate: {
		type: 'boolean',
		default: false,
	},
	endDate: {
		type: 'date',
		default: null,
	},
};
