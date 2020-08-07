import { __ } from '@wordpress/i18n';

import blockConfig from '../../src/js/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';
import example from './example';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: __( 'Alert', 'snow-monkey-blocks' ),
	description: __(
		'It is a block that warns visitors.',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	edit,
	save,
	deprecated,
	example,
	transforms,
};
