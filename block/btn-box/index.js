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
	title: __( 'Button box', 'snow-monkey-blocks' ),
	description: __( 'It is a button with micro copy.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'embed-generic',
	},
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'snow-monkey-blocks' ),
			isDefault: true,
		},
		{ name: 'ghost', label: __( 'Ghost', 'snow-monkey-blocks' ) },
	],
	edit,
	save,
	deprecated,
	example,
};
