import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Like me box', 'snow-monkey-blocks' ),
	description: __( 'You can display like me box.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'thumbs-up',
	},
	edit,
	save,
	example,
};
