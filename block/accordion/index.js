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
	title: __( 'Accordion', 'snow-monkey-blocks' ),
	description: __(
		'You can set up a content area that expands and contracts like the accordion.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-justify',
	},
	edit,
	save,
	deprecated,
	example,
};
