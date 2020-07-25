import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

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
	supports: {
		lightBlockWrapper: true,
	},
};
