import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import transforms from './transforms';

import { __ } from '@wordpress/i18n';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'embed-generic',
	},
	edit,
	save,
	deprecated,
	transforms,
};
