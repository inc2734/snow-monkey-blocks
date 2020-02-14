'use strict';

import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

export const name = 'snow-monkey-blocks/accordion--item';

export const settings = {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-justify',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/accordion' ],
	attributes,
	edit,
	save,
	deprecated,
};
