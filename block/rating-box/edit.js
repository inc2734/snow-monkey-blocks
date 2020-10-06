import classnames from 'classnames';

import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/rating-box--item' ];
	const template = [ [ 'snow-monkey-blocks/rating-box--item' ] ];

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-rating-box', className );

	return (
		<BlockWrapper className={ classes }>
			<div className="smb-rating-box__body">
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		</BlockWrapper>
	);
}
