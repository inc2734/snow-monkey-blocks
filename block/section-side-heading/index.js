import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Section (Side heading)', 'snow-monkey-blocks' ),
	description: __(
		'Contents can be separated by appropriate margins.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'text',
	},
	edit,
	save,
	deprecated,
	example,
};
