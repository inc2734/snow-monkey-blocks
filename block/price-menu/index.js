'use strict';

import blockConfig from '../../src/js/config/block';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/price-menu';

export const settings = {
	title: __( 'Price menu', 'snow-monkey-blocks' ),
	description: __( 'Display the menu name and the price.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/price-menu.png`,
	},
	edit,
	save,
};
