import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/section',
					attributes,
					innerBlocks
				),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section-break-the-grid' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/section-break-the-grid',
					attributes,
					innerBlocks
				),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section-with-bgimage' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/section-with-bgimage',
					attributes,
					innerBlocks
				),
		},
	],
};
