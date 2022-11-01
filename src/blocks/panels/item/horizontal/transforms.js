import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels-item' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/panels-item',
					attributes
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels-item-free' ],
			transform: ( attributes ) =>
				createBlock( 'snow-monkey-blocks/panels-item-free', {}, [
					createBlock( 'core/paragraph', {
						content: attributes.summary,
					} ),
				] ),
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels-item-block-link' ],
			transform: ( attributes ) =>
				createBlock(
					'snow-monkey-blocks/panels-item-block-link',
					{
						linkURL: attributes.linkURL,
						linkTarget: attributes.linkTarget,
					},
					[
						createBlock( 'core/paragraph', {
							content: attributes.summary,
						} ),
					]
				),
		},
	],
};
