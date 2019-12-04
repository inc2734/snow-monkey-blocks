'use strict';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/items';

export const settings = {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( 'Let\'s line up the contents.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/items.png`,
	},
	attributes,
	edit,
	save,
	deprecated,
};
