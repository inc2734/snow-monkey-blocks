'use strict';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/limited-datetime';

export const settings = {
	title: __( 'Limited DateTime', 'snow-monkey-blocks' ),
	description: __( 'Only the set period is displayed', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'calendar-alt',
	},
	category: blockConfig.blockCategories.common,
	supports: {
		alignWide: false,
		customClassName: false,
		className: false,
	},
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/limited-datetime.png`,
	},
	attributes,
	edit,
	save,
};
