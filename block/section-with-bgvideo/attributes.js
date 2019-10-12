'use strict';

export default {
	titleTagName: {
		type: 'string',
		default: 'h2',
	},
	title: {
		source: 'html',
		selector: '.smb-section__title',
	},
	videoURL: {
		type: 'string',
		default: '',
	},
	videoWidth: {
		type: 'number',
		default: 640,
	},
	videoHeight: {
		type: 'number',
		default: 360,
	},
	height: {
		type: 'string',
		default: 'fit',
	},
	contentsAlignment: {
		type: 'string',
		default: 'left',
	},
	maskColor: {
		type: 'string',
		default: '',
	},
	maskColor2: {
		type: 'string',
	},
	maskColorAngle: {
		type: 'number',
		default: 0,
	},
	maskOpacity: {
		type: 'number',
		default: 1,
	},
	textColor: {
		type: 'string',
		default: '#fff',
	},
	contentsWidth: { // deprecated
		type: 'boolean',
		default: false,
	},
	isSlim: {
		type: 'boolean',
		default: false,
	},
};
