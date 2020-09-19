import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Section (Break the grid)', 'snow-monkey-blocks' ),
	description: __( 'It is a break the grid section.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'text',
	},
	edit,
	save,
	example,
};
