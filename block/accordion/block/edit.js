import classnames from 'classnames';

import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/accordion--item' ];
	const template = [ [ 'snow-monkey-blocks/accordion--item' ] ];

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-accordion', className );

	return (
		<BlockWrapper className={ classes }>
			<InnerBlocks
				allowedBlocks={ allowedBlocks }
				template={ template }
				templateLock={ false }
			/>
		</BlockWrapper>
	);
}
