import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

registerBlockType( metadata.name, {
	icon: {
		src: icon,
	},
	edit,
	save,
	deprecated,
} );
