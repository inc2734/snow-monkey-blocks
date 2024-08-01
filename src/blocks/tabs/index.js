import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import icon from './icon';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

import './style.scss';
import './index.scss';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	edit,
	save,
	deprecated,
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
} );
