'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/slider--item';

export const settings = {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the slider block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/slider' ],
	attributes,
	edit,
	save,
};
