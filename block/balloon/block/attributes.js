'use strict';

export default {
	avatarID: {
		type: 'number',
		default: 0,
	},
	avatarURL: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'src',
		default:
			'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
	},
	avatarAlt: {
		type: 'string',
		source: 'attribute',
		selector: 'img',
		attribute: 'alt',
		default: '',
	},
	avatarBorderColor: {
		type: 'string',
	},
	balloonName: {
		type: 'string',
		default: '',
	},
	balloonBody: {
		type: 'string',
		source: 'html',
		selector: '.smb-balloon__body',
		multiline: 'p',
		default: '',
	},
	modifier: {
		type: 'string',
		default: '',
	},
};
