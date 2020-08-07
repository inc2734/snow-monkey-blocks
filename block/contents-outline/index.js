import { __ } from '@wordpress/i18n';

import blockConfig from '../../src/js/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Contents outline', 'snow-monkey-blocks' ),
	description: __(
		'Display the table of contents above the first heading.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	edit,
	save,
};
