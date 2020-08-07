import { __ } from '@wordpress/i18n';

import blockConfig from '../../src/js/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Limited DateTime', 'snow-monkey-blocks' ),
	description: __( 'Only the set period is displayed', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'calendar-alt',
	},
	edit,
	save,
	example,
};
