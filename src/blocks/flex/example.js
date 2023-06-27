export default {
	attributes: {
		style: {
			spacing: {
				blockGap: 'var:preset|spacing|40',
			},
		},
		layout: {
			orientation: 'horizontal',
			type: 'flex',
			flexWrap: 'wrap',
			verticalAlignment: 'stretch',
		},
	},
	innerBlocks: [
		{
			name: 'snow-monkey-blocks/flex',
			attributes: {
				boxShadow: {
					color: '#000000',
					opacity: 0.1,
					horizontal: 0,
					vertical: 0,
					blur: 15,
					spread: 0,
				},
				smb: {
					flexBasis: '150px',
					flexGrow: true,
				},
			},
			innerBlocks: [
				{
					name: 'core/image',
					attributes: {
						url: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: 'Lorem ipsum dolor sit amet, consectetur',
						style: {
							spacing: {
								padding: {
									top: 'var:preset|spacing|40',
									right: 'var:preset|spacing|40',
									bottom: 'var:preset|spacing|40',
									left: 'var:preset|spacing|40',
								},
							},
						},
					},
				},
			],
		},
		{
			name: 'snow-monkey-blocks/flex',
			attributes: {
				boxShadow: {
					color: '#000000',
					opacity: 0.1,
					horizontal: 0,
					vertical: 0,
					blur: 15,
					spread: 0,
				},
				smb: {
					flexBasis: '150px',
					flexGrow: true,
				},
			},
			innerBlocks: [
				{
					name: 'core/image',
					attributes: {
						url: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: 'Lorem ipsum dolor sit amet, consectetur',
						style: {
							spacing: {
								padding: {
									top: 'var:preset|spacing|40',
									right: 'var:preset|spacing|40',
									bottom: 'var:preset|spacing|40',
									left: 'var:preset|spacing|40',
								},
							},
						},
					},
				},
			],
		},
		{
			name: 'snow-monkey-blocks/flex',
			attributes: {
				boxShadow: {
					color: '#000000',
					opacity: 0.1,
					horizontal: 0,
					vertical: 0,
					blur: 15,
					spread: 0,
				},
				smb: {
					flexBasis: '150px',
					flexGrow: true,
				},
			},
			innerBlocks: [
				{
					name: 'core/image',
					attributes: {
						url: `${ smb.pluginUrl }/dist/img/photos/stocksnap_wrn48fo5mr.jpg`,
					},
				},
				{
					name: 'core/paragraph',
					attributes: {
						content: 'Lorem ipsum dolor sit amet, consectetur',
						style: {
							spacing: {
								padding: {
									top: 'var:preset|spacing|40',
									right: 'var:preset|spacing|40',
									bottom: 'var:preset|spacing|40',
									left: 'var:preset|spacing|40',
								},
							},
						},
					},
				},
			],
		},
	],
};
