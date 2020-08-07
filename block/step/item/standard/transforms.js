import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/step--item--free' ],
			transform: ( attributes ) =>
				createBlock(
					'snow-monkey-blocks/step--item--free',
					attributes
				),
		},
	],
};
