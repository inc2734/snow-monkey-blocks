import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import icon from './icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [
		__( 'Posts list', 'snow-monkey-blocks' ),
		__( 'Recent posts', 'snow-monkey-blocks' ),
		__( 'Latest posts', 'snow-monkey-blocks' ),
	],
	edit,
	save,
	deprecated,
};
