import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels-item' ],
			transform: ( attributes ) =>
				createBlock( 'snow-monkey-blocks/panels-item', attributes ),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels-item-horizontal' ],
			transform: ( attributes ) =>
				createBlock(
					'snow-monkey-blocks/panels-item-horizontal',
					attributes
				),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels-item-block-link' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/panels-item-block-link',
					attributes,
					innerBlocks
				),
		},
	],
};
