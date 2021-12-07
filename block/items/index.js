import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	edit,
	save,
	deprecated,
	example,
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'snow-monkey-blocks' ),
			isDefault: true,
		},
		{
			name: 'boundary-line',
			label: __( 'Boundary line', 'snow-monkey-blocks' ),
		},
		{
			name: 'border',
			label: __( 'Border', 'snow-monkey-blocks' ),
		},
	],
};
