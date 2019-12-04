'use strict';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/btn-box';

export const settings = {
	title: __( 'Button box', 'snow-monkey-blocks' ),
	description: __( 'It is a button with micro copy.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'embed-generic',
	},
	category: blockConfig.blockCategories.common,
	supports: {
		align: [ 'wide', 'full' ],
	},
	styles: [
		{ name: 'default', label: __( 'Default', 'snow-monkey-blocks' ), isDefault: true },
		{ name: 'ghost', label: __( 'Ghost', 'snow-monkey-blocks' ) },
	],
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/btn-box.png`,
	},
	attributes,
	edit,
	save,
	deprecated,
};
