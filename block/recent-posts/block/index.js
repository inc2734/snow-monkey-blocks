'use strict';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/recent-posts';

export const settings = {
	title: __( 'Recent posts', 'snow-monkey-blocks' ),
	description: __( 'You can display recent posts with richer.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ul',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/recent-posts.png`,
	},
	edit,
	save,
};
