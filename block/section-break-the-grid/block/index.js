'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import example from './example';

export const name = 'snow-monkey-blocks/section-break-the-grid';

export const settings = {
	title: __( 'Section (Break the grid)', 'snow-monkey-blocks' ),
	description: __( 'It is a break the grid section.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'text',
	},
	category: blockConfig.blockCategories.section,
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
	},
	attributes,
	edit,
	save,
	example,
};
