import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

export const name = 'snow-monkey-blocks/panels--item';

export const settings = {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the panels block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/panels' ],
	attributes,
	edit,
	save,
	deprecated,
	transforms,
	supports: {
		lightBlockWrapper: true,
	},
};
