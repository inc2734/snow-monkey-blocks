'use strict';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/pricing-table--item';

export const settings = {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the pricing table block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/pricing-table' ],
	attributes,
	edit,
	save,
	deprecated,
};
