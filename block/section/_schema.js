'use strict';

export const schema = {
	title: {
		source: 'html',
		selector: '.smb-section__title',
	},
	backgroundColor: {
		type: 'string',
	},
	contentsWidth: {
		type: 'string',
		default: null,
	},
	topDividerType: {
		type: 'string',
		default: 'tilt',
	},
	topDividerLevel: {
		type: 'number',
		default: 0,
	},
	topDividerColor: {
		type: 'string',
		default: '#fff',
	},
	bottomDividerType: {
		type: 'string',
		default: 'tilt',
	},
	bottomDividerLevel: {
		type: 'number',
		default: 0,
	},
	bottomDividerColor: {
		type: 'string',
		default: '#fff',
	},
};
