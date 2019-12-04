'use strict';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/slider';

export const settings = {
	title: __( 'Slider', 'snow-monkey-blocks' ),
	description: __( 'Show attractive images as beautiful sliders.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	category: blockConfig.blockCategories.common,
	supports: {
		align: [ 'wide', 'full' ],
	},
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/slider.png`,
	},
	attributes,
	edit,
	save,
	deprecated,
};
