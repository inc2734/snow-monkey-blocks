'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import transforms from './transforms';

export const name = 'snow-monkey-blocks/items--item--block-link';

export const settings = {
	title: __( 'Items (Block Link)', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the items block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/items' ],
	attributes,
	edit,
	save,
	transforms,
};
