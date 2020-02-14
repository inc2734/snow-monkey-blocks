'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/price-menu--item';

export const settings = {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the price menu block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/price-menu' ],
	attributes,
	edit,
	save,
};
