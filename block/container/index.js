'use strict';

import {
	__,
} from '@wordpress/i18n';

import blockConfig from '../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/container';

export const settings = {
	title: __( 'Container', 'snow-monkey-blocks' ),
	description: __( 'Container blocks keep content within a certain width.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/container.png`,
	},
	attributes,
	edit,
	save,
};
