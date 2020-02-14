'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

export const name = 'snow-monkey-blocks/step--item';

export const settings = {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the step block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/step' ],
	supports: {
		anchor: true,
	},
	attributes,
	edit,
	save,
	transforms,
	deprecated,
};
