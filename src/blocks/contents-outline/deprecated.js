import metadata from './block.json';

const blockAttributes = metadata.attributes;

export default [
	{
		attributes: {
			...blockAttributes,
			...{
				myAnchor: {
					type: 'string',
					default: '',
				},
			},
		},
		migrate( attributes ) {
			attributes.anchor = attributes.myAnchor;
			return attributes;
		},
		save() {
			return null;
		},
	},
];
