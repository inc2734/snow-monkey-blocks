'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import example from './example';

export const name = 'snow-monkey-blocks/container';

export const settings = {
	title: __( 'Container', 'snow-monkey-blocks' ),
	description: __(
		'Container blocks keep content within a certain width.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'list-view',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	example,
};
