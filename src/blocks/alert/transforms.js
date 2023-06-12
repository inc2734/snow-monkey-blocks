import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

export default {
	from: [
		{
			type: 'block',
			blocks: [ 'core/paragraph' ],
			transform: ( attributes ) => {
				return createBlock( metadata.name, {}, [
					createBlock( 'core/paragraph', {
						content: attributes.content,
					} ),
				] );
			},
		},
	],
};
