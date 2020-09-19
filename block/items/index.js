import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( "Let's line up the contents.", 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	edit,
	save,
	deprecated,
	example,
};
