'use strict';

import blockConfig from '../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/alert';

export const settings = {
	title: __( 'Alert', 'snow-monkey-blocks' ),
	description: __( 'It is a block that warns visitors.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/alert.png`,
	},
	attributes,
	edit,
	save,
	deprecated,
};
