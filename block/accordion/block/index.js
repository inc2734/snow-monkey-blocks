'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

export const name = 'snow-monkey-blocks/accordion';

export const settings = {
	title: __( 'Accordion', 'snow-monkey-blocks' ),
	description: __(
		'You can set up a content area that expands and contracts like the accordion.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-justify',
	},
	category: blockConfig.blockCategories.common,
	edit,
	save,
	deprecated,
	example,
};
