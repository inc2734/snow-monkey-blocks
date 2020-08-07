import { __ } from '@wordpress/i18n';

import blockConfig from '../../../../src/js/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Item (Free input)', 'snow-monkey-blocks' ),
	description: __(
		'It is a child block of the step block.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ol',
	},
	edit,
	save,
	transforms,
};
