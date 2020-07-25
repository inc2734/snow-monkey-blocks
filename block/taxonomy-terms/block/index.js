import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import example from './example';

export const name = 'snow-monkey-blocks/taxonomy-terms';

export const settings = {
	title: __( 'Taxonomy', 'snow-monkey-blocks' ),
	description: __(
		'You can display terms linked to any taxonomy.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'tag',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	example,
};
