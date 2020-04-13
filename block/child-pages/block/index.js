'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/child-pages';

export const settings = {
	title: __( 'Child pages', 'snow-monkey-blocks' ),
	description: __(
		'You can display child pages of this page.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
};
