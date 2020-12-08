import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels--item' ],
			transform: ( attributes ) => {
				return createBlock(
					'snow-monkey-blocks/panels--item',
					attributes
				);
			},
		},
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/panels--item--free' ],
			transform: ( attributes ) =>
				createBlock( 'snow-monkey-blocks/panels--item--free', {}, [
					createBlock( 'core/paragraph', {
						content: attributes.summary,
					} ),
				] ),
		},
	],
};
