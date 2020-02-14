'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

export const name = 'snow-monkey-blocks/faq';

export const settings = {
	title: __( 'FAQ', 'snow-monkey-blocks' ),
	description: __( 'You can list the FAQs.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'businessman',
	},
	category: blockConfig.blockCategories.common,
	edit,
	save,
	deprecated,
	example,
};
