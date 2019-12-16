'use strict';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/contents-outline';

export const settings = {
	title: __( 'Contents outline', 'snow-monkey-blocks' ),
	description: __( 'Display the table of contents above the first heading.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	category: blockConfig.blockCategories.common,
	supports: {
		customClassName: false,
		anchor: true,
	},
	edit,
	save,
};
