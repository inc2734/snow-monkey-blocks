import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

export const name = 'snow-monkey-blocks/pricing-table';

export const settings = {
	title: __( 'Pricing table', 'snow-monkey-blocks' ),
	description: __(
		"Let's present the rate plan in an easy-to-understand manner.",
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	deprecated,
	example,
	supports: {
		lightBlockWrapper: true,
	},
};
