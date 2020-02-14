'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/pickup-slider';

export const settings = {
	title: __( 'Pickup slider', 'snow-monkey-blocks' ),
	description: __(
		'Display posts with pickup tags as a slider.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	category: blockConfig.blockCategories.common,
	edit,
	save,
};
