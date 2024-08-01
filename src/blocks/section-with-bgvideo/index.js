import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from '../section/icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

import './style.scss';
import './index.scss';

registerBlockType( metadata.name, {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [
		__( 'Outer', 'snow-monkey-blocks' ),
		__( 'Wrapper', 'snow-monkey-blocks' ),
		__( 'Container', 'snow-monkey-blocks' ),
		__( 'Main visual', 'snow-monkey-blocks' ),
		__( 'Video', 'snow-monkey-blocks' ),
		__( 'Header video', 'snow-monkey-blocks' ),
	],
	edit,
	save,
	deprecated,
	example,
} );
