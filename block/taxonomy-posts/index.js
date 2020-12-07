import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Taxonomy posts', 'snow-monkey-blocks' ),
	description: __(
		'You can display recent posts linked to any taxonomy.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ul',
	},
	edit,
	save,
};
