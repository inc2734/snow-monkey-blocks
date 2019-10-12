'use strict';

const { __ } = wp.i18n;

import blockConfig from '../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

export const name = 'snow-monkey-blocks/section-with-bgvideo';

export const settings = {
	title: __( 'Section (with background video)', 'snow-monkey-blocks' ),
	description: __( 'It is a section with a background video.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'text',
	},
	category: blockConfig.blockCategories.section,
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
	},
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/section-with-bgvideo.png`,
	},
	attributes,
	edit,
	save,
	deprecated,
};
