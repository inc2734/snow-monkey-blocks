'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';
import example from './example';

export const name = 'snow-monkey-blocks/price-menu';

export const settings = {
	title: __( 'Price menu', 'snow-monkey-blocks' ),
	description: __(
		'Display the menu name and the price.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	edit,
	save,
	example,
};
