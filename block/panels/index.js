import { __ } from '@wordpress/i18n';

import blockConfig from '../../src/js/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Panels', 'snow-monkey-blocks' ),
	description: __(
		"Let's line up the contents like the panel.",
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	edit,
	save,
	deprecated,
	example,
};
