import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

export const name = 'snow-monkey-blocks/items--item--standard';

export const settings = {
	title: __( 'Items (Standard)', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the items block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/items' ],
	attributes,
	edit,
	save,
	transforms,
	supports: {
		lightBlockWrapper: true,
	},
};
