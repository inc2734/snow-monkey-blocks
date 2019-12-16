'use strict';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/rating-box';

export const settings = {
	title: __( 'Rating box', 'snow-monkey-blocks' ),
	description: __( 'Evaluate with bars.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-alignleft',
	},
	category: blockConfig.blockCategories.common,
	edit,
	save,
	deprecated,
	example,
};
