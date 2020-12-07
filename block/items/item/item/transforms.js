import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/items--item--standard' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/items--item--standard',
					{
						...attributes,
						url: attributes.btnURL,
						target: attributes.btnTarget,
					}
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/items--item--block-link' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/items--item--block-link',
					{
						...attributes,
						url: attributes.btnURL,
						target: attributes.btnTarget,
					}
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/items--item--free' ],
			transform: ( attributes ) =>
				createBlock( 'snow-monkey-blocks/items--item--free', {}, [
					createBlock( 'core/paragraph', {
						content: attributes.summary,
					} ),
				] ),
		},
	],
};
