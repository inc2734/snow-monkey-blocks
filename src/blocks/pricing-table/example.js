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
				list: '<li>Lorem ipsum dolor</li><li>sit amet</li>',
				btnLabel: 'more',
				btnURL: 'https://2inc.org',
				imageURL: `${ smb.pluginUrl }/dist/img/photos/beach-sand-coast2756.jpg`,
				imageID: 1,
			},
		},
		{
			name: 'snow-monkey-blocks/pricing-table-item',
			attributes: {
				title: 'ipsum',
				price: '$100',
				lede: '/month',
				list: '<li>consectetur adipiscing</li><li>elit, sed</li>',
				btnLabel: 'more',
				btnURL: 'https://2inc.org',
				imageURL: `${ smb.pluginUrl }/dist/img/photos/building-architecture-sky2096.jpg`,
				imageID: 1,
			},
		},
	],
};
