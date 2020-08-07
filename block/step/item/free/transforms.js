import { createBlock } from '@wordpress/blocks';

export default {
	to: [
		{
			type: 'block',
			blocks: [ 'snow-monkey-blocks/step--item' ],
			transform: ( attributes ) =>
				createBlock( 'snow-monkey-blocks/step--item', attributes ),
		},
	],
};
