import classnames from 'classnames';

import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/price-menu--item' ];
	const template = [ [ 'snow-monkey-blocks/price-menu--item' ] ];

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-price-menu', className );

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
