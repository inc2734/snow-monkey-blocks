'use strict';

import {
	createBlock,
} from '@wordpress/blocks';

export default {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/alert',
					{
						content: `<p>${ attributes.content }</p>`,
					}
				);
			},
		},
	],
};
