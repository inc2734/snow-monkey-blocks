export default {
	attributes: {
		columnSize: '1-2',
	},
	innerBlocks: [
		{
			name: 'snow-monkey-blocks/pricing-table-item',
			attributes: {
				title: 'Lorem',
				price: '$100',
				lede: '/month',
				btnLabel: 'more',
				btnURL: 'https://2inc.org',
				imageURL: `${ smb.pluginUrl }/dist/img/photos/beach-sand-coast2756.jpg`,
				imageID: 1,
			},
			innerBlocks: [
				{
					name: 'core/list-item',
					attributes: {
						content: 'consectetur adipiscing',
					},
				},
				{
					name: 'core/list-item',
					attributes: {
						content: 'elit, sed',
					},
				},
			],
		},
	],
};
