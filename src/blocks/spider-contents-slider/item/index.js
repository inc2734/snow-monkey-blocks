import blockConfig from '@smb/config/block';

import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import metadata from './block.json';
import icon from '../../spider-slider/icon';
import edit from './edit';
import save from './save';
import deprecated from './deprecated';

registerBlockType( metadata.name, {
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
			attributes: { contentPosition: '' },
			scope: [ 'inserter', 'transform' ],
		},
		{
			name: 'alignmentable',
			title: __( 'Alignmentable', 'snow-monkey-blocks' ),
			attributes: { contentPosition: 'center-center' },
			scope: [ 'inserter', 'transform' ],
		},
	],
} );
