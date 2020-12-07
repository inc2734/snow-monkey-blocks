import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/items--item--block-link' ],
			transform: ( attributes ) =>
				createBlock(
					'snow-monkey-blocks/items--item--block-link',
					attributes
				),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/items--banner' ],
			transform: ( attributes ) =>
				createBlock( 'snow-monkey-blocks/items--banner', attributes ),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/items--item--standard' ],
			transform: ( attributes ) =>
				createBlock(
					'snow-monkey-blocks/items--item--standard',
					attributes
				),
		},
	],
};
