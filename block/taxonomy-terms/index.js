import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [
		__( 'Categories', 'snow-monkey-blocks' ),
		__( 'Tags', 'snow-monkey-blocks' ),
		__( 'Taxonomies', 'snow-monkey-blocks' ),
	],
	edit,
	save,
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'snow-monkey-blocks' ),
			isDefault: true,
		},
		{
			name: 'tag',
			label: __( 'Tag', 'snow-monkey-blocks' ),
		},
		{
			name: 'slash',
			label: __( 'Slash', 'snow-monkey-blocks' ),
		},
	],
};
