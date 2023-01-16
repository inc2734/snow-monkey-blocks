import { createBlock } from '@wordpress/blocks';

import metadata from './block.json';

const transforms = {
	from: [
		{
			type: 'block',
			isMultiBlock: true,
			blocks: [ 'snow-monkey-blocks/btn' ],
			transform: ( buttons ) =>
				createBlock(
					metadata.name,
					{},
					buttons.map( ( attributes ) =>
						createBlock( 'snow-monkey-blocks/btn', attributes )
					)
				),
		},
	],
};

export default transforms;
