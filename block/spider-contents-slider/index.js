import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import icon from '../spider-slider/icon';
import edit from './edit';
import save from './save';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	keywords: [ __( 'Carousel', 'snow-monkey-blocks' ) ],
	edit,
	save,
	example,
};
