'use strict';

import {
	createBlock,
} from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'notwiz-blocks/directory-structure--item--directory' ],
			transform: ( attributes ) => {
				return createBlock(
					'notwiz-blocks/directory-structure--item--directory',
					{
						name: attributes.name,
						iconVendor: 'fas',
						iconClass: 'folder',
						iconColor: attributes.iconColor,
					}
				);
			},
		},
	],
};
