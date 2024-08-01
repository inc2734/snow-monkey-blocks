import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';

import './style.scss';

registerBlockType( metadata.name, {
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
} );
