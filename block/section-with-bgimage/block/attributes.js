'use strict';

export default {
	wrapperTagName: {
		type: 'string',
		default: 'div',
	},
	titleTagName: {
		type: 'string',
		default: 'h2',
	},
	title: {
		type: 'string',
		source: 'html',
		selector: '.smb-section__title',
		default: '',
	},
	imageID: {
		// deprecated
		type: 'number',
		default: 0,
	},
	imageURL: {
		// deprecated
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage > img',
		attribute: 'src',
		default: '',
	},
	imageAlt: {
		// deprecated
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage > img',
		attribute: 'alt',
		default: '',
	},
	lgImageID: {
		type: 'number',
		default: 0,
	},
	lgImageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage--lg > img',
		attribute: 'src',
		default: '',
	},
	lgImageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage--lg > img',
		attribute: 'alt',
		default: '',
	},
	mdImageID: {
		type: 'number',
		default: 0,
	},
	mdImageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage--md > img',
		attribute: 'src',
		default: '',
	},
	mdImageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage--md > img',
		attribute: 'alt',
		default: '',
	},
	smImageID: {
		type: 'number',
		default: 0,
	},
	smImageURL: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage--sm > img',
		attribute: 'src',
		default: '',
	},
	smImageAlt: {
		type: 'string',
		source: 'attribute',
		selector: '.smb-section-with-bgimage__bgimage--sm > img',
		attribute: 'alt',
		default: '',
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
	parallax: {
		type: 'boolean',
		default: false,
	},
	contentsWidth: {
		// deprecated
		type: 'boolean',
		default: false,
	},
	isSlim: {
		type: 'boolean',
		default: false,
	},
};
