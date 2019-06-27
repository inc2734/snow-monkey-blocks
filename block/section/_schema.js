'use strict';

export const schema = {
	titleTagName: {
		type: 'string',
		default: 'h2',
	},
	title: {
		source: 'html',
		selector: '.smb-section__title',
	},
	backgroundColor: {
		type: 'string',
	},
	backgroundColor2: {
		type: 'string',
	},
	backgroundColorAngle: {
		type: 'number',
		default: 0,
	},
	textColor: {
		type: 'string',
	},
	contentsWidth: { // deprecated
		type: 'string',
		default: null,
	},
	isSlim: {
		type: 'boolean',
		default: false,
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
