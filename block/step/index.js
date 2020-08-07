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
	title: __( 'Step', 'snow-monkey-blocks' ),
	description: __(
		'Express the steps in an easy-to-understand manner.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	edit,
	save,
	deprecated,
	example,
};
