'use strict';

import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels--item--horizontal' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/panels--item--horizontal',
					attributes
				);
			},
		},
	],
};
