import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Buttons', 'snow-monkey-blocks' ),
	description: __(
		'Prompt visitors to take action with a group of button-style links.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'embed-generic',
	},
	edit,
	save,
	transforms,
};
