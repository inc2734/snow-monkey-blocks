import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

import './style.scss';
import './index.scss';

registerBlockType( metadata.name, {
	icon: {
		src: icon,
	},
	keywords: [ __( 'Carousel', 'snow-monkey-blocks' ) ],
	edit,
	save,
	deprecated,
	example,
} );
