import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/section',
					attributes,
					innerBlocks
				),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section-break-the-grid' ],
			transform: ( attributes, innerBlocks ) => {
				attributes.imageID =
					attributes.lgImageID ||
					attributes.mdImageID ||
					attributes.smImageID;
				attributes.imageURL =
					attributes.lgImageURL ||
					attributes.mdImageURL ||
					attributes.smImageURL;
				attributes.imageAlt =
					attributes.lgImageAlt ||
					attributes.mdImageAlt ||
					attributes.smImageAlt;
				attributes.imageWidth =
					attributes.lgImageWidth ||
					attributes.mdImageWidth ||
					attributes.smImageWidth;
				attributes.imageHeight =
					attributes.lgImageHeight ||
					attributes.mdImageHeight ||
					attributes.smImageHeight;
				attributes.imageMediaType =
					attributes.lgImageMediaType ||
					attributes.mdImageMediaType ||
					attributes.smImageMediaType;

				return createBlock(
					'snow-monkey-blocks/section-break-the-grid',
					attributes,
					innerBlocks
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section-side-heading' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/section-side-heading',
					attributes,
					innerBlocks
				),
		},
	],
};
