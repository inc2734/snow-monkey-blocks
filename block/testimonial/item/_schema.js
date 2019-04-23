'use strict';

export const schema = {
	avatarID: {
		type: 'number',
		default: 0,
	},
	avatarURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-testimonial__item__figure > img',
		attribute: 'src',
		default: 'https://0.gravatar.com/avatar/00000000000000000000000000000000?s=128&d=mp&r=g',
	},
	avatarAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-testimonial__item__figure > img',
		attribute: 'alt',
		default: '',
	},
	name: {
		source: 'html',
		selector: '.smb-testimonial__item__name',
	},
	lede: {
		source: 'html',
		selector: '.smb-testimonial__item__lede',
	},
	content: {
		source: 'html',
		selector: '.smb-testimonial__item__content',
	},
};
