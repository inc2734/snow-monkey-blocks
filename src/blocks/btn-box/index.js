import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'snow-monkey-blocks' ),
			isDefault: true,
		},
		{ name: 'ghost', label: __( 'Ghost', 'snow-monkey-blocks' ) },
	],
	edit,
	save,
	deprecated,
} );
