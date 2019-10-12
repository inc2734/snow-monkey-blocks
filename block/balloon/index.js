'use strict';

import blockConfig from '../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/balloon';

export const settings = {
	title: __( 'Balloon', 'snow-monkey-blocks' ),
	description: __( 'It is a block that can express a conversation.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/balloon.png`,
	},
	attributes,
	edit,
	save,
	deprecated,
};
