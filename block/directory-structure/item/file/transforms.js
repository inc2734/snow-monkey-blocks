import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [
				'snow-monkey-blocks/directory-structure--item--directory',
			],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/directory-structure--item--directory',
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
