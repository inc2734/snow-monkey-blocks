'use strict';

export const schema = {
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
	maskOpacity: {
		type: 'number',
		default: 1,
	},
	textColor: {
		type: 'string',
		default: '#fff',
	},
};
