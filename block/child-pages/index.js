import { __ } from '@wordpress/i18n';

import blockConfig from '../../src/js/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Child pages', 'snow-monkey-blocks' ),
	description: __(
		'You can display child pages of this page.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	edit,
	save,
};
