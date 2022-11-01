import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [
		__( 'Slider', 'snow-monkey-blocks' ),
		__( 'Carousel', 'snow-monkey-blocks' ),
	],
	edit,
	save,
} );
