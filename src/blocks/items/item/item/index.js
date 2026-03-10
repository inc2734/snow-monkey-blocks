import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import icon from '../../icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

registerBlockType( metadata.name, {
	icon: {
		src: icon,
	},
	inserter: false,
	edit,
	save,
	deprecated,
	transforms,
} );
