'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import example from './example';

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
	attributes,
	edit,
	save,
	example,
};
