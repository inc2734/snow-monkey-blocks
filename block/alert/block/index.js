'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';
import example from './example';

export const name = 'snow-monkey-blocks/alert';

export const settings = {
	title: __( 'Alert', 'snow-monkey-blocks' ),
	description: __(
		'It is a block that warns visitors.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	deprecated,
	transforms,
	example,
};
