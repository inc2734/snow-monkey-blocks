'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import supports from './supports.json';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/rss';

export const settings = {
	title: __( 'RSS', 'snow-monkey-blocks' ),
	description: __(
		'Display entries from any RSS or Atom feed.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'rss',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	supports,
	edit,
	save,
};
