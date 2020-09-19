import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the pricing table block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	edit,
	save,
	deprecated,
};
