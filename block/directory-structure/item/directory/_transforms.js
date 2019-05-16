'use strict';

const {
	createBlock,
} = wp.blocks;

export const transforms = {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/directory-structure--item--file' ],
			transform: ( attributes ) => {
				return createBlock( 'snow-monkey-blocks/directory-structure--item--file', {
					name: attributes.name,
					iconVendor: 'far',
					iconClass: 'file-alt',
					iconColor: attributes.iconColor,
				} );
			},
		},
	],
};
