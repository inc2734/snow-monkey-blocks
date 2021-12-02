import { __ } from '@wordpress/i18n';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import icon from '../../spider-slider/icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

const { name } = metadata;

export { metadata, name };

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: icon,
	},
	edit,
	save,
	deprecated,
	variations: [
		{
			name: 'full-height',
			title: __( 'Full height', 'snow-monkey-blocks' ),
			isDefault: true,
			icon: {
				foreground: blockConfig.blockIconColor,
				src: icon,
			},
			scope: [ 'inserter', 'transform' ],
		},
		{
			name: 'alignmentable',
			title: __( 'Alignmentable', 'snow-monkey-blocks' ),
			icon: {
				foreground: blockConfig.blockIconColor,
				src: icon,
			},
			attributes: { contentPosition: 'center-center' },
			scope: [ 'inserter', 'transform' ],
		},
	],
};
