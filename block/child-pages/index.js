'use strict';

import blockConfig from '../../src/js/config/block';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/child-pages';

export const settings = {
	title: __( 'Child pages', 'snow-monkey-blocks' ),
	description: __( 'You can display child pages of this page.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/child-pages.png`,
	},
	edit,
	save,
};
