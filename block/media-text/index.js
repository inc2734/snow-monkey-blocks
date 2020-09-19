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
	title: __( 'Media text', 'snow-monkey-blocks' ),
	description: __(
		'Set media and words side-by-side for a richer layout.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'align-left',
	},
	edit,
	save,
	deprecated,
	example,
};
