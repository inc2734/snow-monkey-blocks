'use strict';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/list';

export const settings = {
	title: __( 'Icon list', 'snow-monkey-blocks' ),
	description: __( 'Icons are displayed only on the actual screen.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ul',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	deprecated,
	example,
};
