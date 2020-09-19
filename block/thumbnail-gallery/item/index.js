import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title:
		__( 'Items', 'snow-monkey-blocks' ) +
		' ' +
		__( '(Deprecated)', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the thumbnail gallery block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	edit,
	save,
	deprecated,
};
