import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

import './style.scss';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [
		__( 'Image', 'snow-monkey-blocks' ),
		__( 'Video', 'snow-monkey-blocks' ),
		__( 'Media & sentence', 'snow-monkey-blocks' ),
	],
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
			name: 'border',
			label: __( 'Border', 'snow-monkey-blocks' ),
		},
	],
} );
