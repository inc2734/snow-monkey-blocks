import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/directory-structure--item--file' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/directory-structure--item--file',
					{
						name: attributes.name,
						iconVendor: 'fas',
						iconClass: 'file',
						iconColor: attributes.iconColor,
					}
				);
			},
		},
	],
};
