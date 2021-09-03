import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import icon from './icon';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
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
			name: 'simple',
			label: __( 'Simple', 'snow-monkey-blocks' ),
		},
		{
			name: 'line',
			label: __( 'Line', 'snow-monkey-blocks' ),
		},
	],
};
