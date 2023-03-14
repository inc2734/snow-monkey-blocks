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
			blocks: [ 'snow-monkey-blocks/section-side-heading' ],
			transform: ( attributes, innerBlocks ) =>
				createBlock(
					'snow-monkey-blocks/section-side-heading',
					attributes,
					innerBlocks
				),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/section-with-bgimage' ],
			transform: ( attributes, innerBlocks ) => {
				attributes.lgImageID = attributes.imageID;
				attributes.lgImageURL = attributes.imageURL;
				attributes.lgImageAlt = attributes.imageAlt;
				attributes.lgImageWidth = attributes.imageWidth;
				attributes.lgImageHeight = attributes.imageHeight;
				attributes.lgImageMediaType = attributes.imageMediaType;

				return createBlock(
					'snow-monkey-blocks/section-with-bgimage',
					attributes,
					innerBlocks
				);
			},
		},
	],
};
