export default {
	attributes: {
		title: 'Lorem ipsum dolor sit amet',
		imageID: 1,
		imageURL: `${ smb.pluginUrl }/dist/img/photos/sunset-over-lake-1.jpg`,
		maskColor: '#000',
		maskOpacity: 0.7,
	},
	innerBlocks: [
		{
			name: 'core/paragraph',
			attributes: {
				content:
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
			},
		},
	],
};
