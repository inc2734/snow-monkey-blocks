import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

export const name = 'snow-monkey-blocks/box';

export const settings = {
	title: __( 'Box', 'snow-monkey-blocks' ),
	description: __( 'It is a box.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'list-view',
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
