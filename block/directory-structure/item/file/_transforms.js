'use strict';

const {
	createBlock,
} = wp.blocks;

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'notwiz-blocks/directory-structure--item--directory' ],
			transform: ( attributes ) => {
				return createBlock( 'notwiz-blocks/directory-structure--item--directory', {
					name: attributes.name,
					iconVendor: 'fas',
					iconClass: 'folder',
					iconColor: attributes.iconColor,
				} );
			},
		},
	],
};
