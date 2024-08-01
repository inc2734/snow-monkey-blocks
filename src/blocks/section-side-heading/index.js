import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from '../section/icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

import './style.scss';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [
		__( 'Outer', 'snow-monkey-blocks' ),
		__( 'Wrapper', 'snow-monkey-blocks' ),
		__( 'Container', 'snow-monkey-blocks' ),
	],
	edit,
	save,
	deprecated,
	transforms,
} );
