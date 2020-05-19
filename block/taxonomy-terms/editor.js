import { registerBlockStyle } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import { registerBlock } from '../../src/js/helper/helper';

import * as taxonomyTerms from './block';

registerBlock( taxonomyTerms );

[
	{
		name: 'default',
		label: __( 'Default', 'snow-monkey-blocks' ),
		isDefault: true,
	},
	{
		name: 'tag',
		label: __( 'Tag', 'snow-monkey-blocks' ),
	},
	{
		name: 'slash',
		label: __( 'Slash', 'snow-monkey-blocks' ),
	},
].forEach( ( props ) => registerBlockStyle( taxonomyTerms.name, props ) );
