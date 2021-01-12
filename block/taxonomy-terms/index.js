import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'tag',
	},
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
