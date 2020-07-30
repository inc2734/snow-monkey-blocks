import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';

export const name = 'snow-monkey-blocks/spider-slider';

export const settings = {
	title: __( 'Slider', 'snow-monkey-blocks' ),
	description: __(
		'Show attractive images as beautiful sliders.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	supports: {
		align: [ 'wide', 'full' ],
	},
};
