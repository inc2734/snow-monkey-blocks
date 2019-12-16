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

export const name = 'snow-monkey-blocks/testimonial';

export const settings = {
	title: __( 'Testimonial', 'snow-monkey-blocks' ),
	description: __( 'Let\'s arrange the voice of the customer.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	deprecated,
	example,
};
