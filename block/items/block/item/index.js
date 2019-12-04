'use strict';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

import {
	__,
} from '@wordpress/i18n';

/**
 * THIS BLOCK IS DEPRECATED.
 * It exists only for backward compatibility.
 *
 * @deprecated
 */
export const name = 'snow-monkey-blocks/items--item';

export const settings = {
	title: __( 'Items', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'DEPRECATED' ],
	attributes,
	edit,
	save,
	deprecated,
	transforms,
};
