'use strict';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';
import example from './example';

import {
	__,
} from '@wordpress/i18n';

export const name = 'snow-monkey-blocks/like-me-box';

export const settings = {
	title: __( 'Like me box', 'snow-monkey-blocks' ),
	description: __( 'You can display like me box.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'thumbs-up',
	},
	category: blockConfig.blockCategories.common,
	edit,
	save,
	example,
};
