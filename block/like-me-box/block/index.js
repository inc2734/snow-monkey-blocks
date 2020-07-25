import { __ } from '@wordpress/i18n';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import example from './example';

export const name = 'snow-monkey-blocks/like-me-box';

export const settings = {
	title: __( 'Like me box', 'snow-monkey-blocks' ),
	description: __( 'You can display like me box.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'thumbs-up',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	example,
};
