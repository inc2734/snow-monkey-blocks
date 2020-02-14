'use strict';

export default {
	innerBlocks: [
		{
			name: 'snow-monkey-blocks/accordion--item',
			attributes: {
				title: 'Lorem ipsum dolor sit amet',
				initialState: true,
			},
			innerBlocks: [
				{
					name: 'core/paragraph',
					attributes: {
						content:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu',
					},
				},
			],
		},
		{
			name: 'snow-monkey-blocks/accordion--item',
			attributes: {
				title: 'consectetur adipiscing elit',
				initialState: false,
			},
			innerBlocks: [
				{
					name: 'core/paragraph',
					attributes: {
						content:
							'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillu',
					},
				},
			],
		},
	],
};
