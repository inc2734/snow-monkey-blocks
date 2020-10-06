import classnames from 'classnames';

import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/faq--item' ];
	const template = [ [ 'snow-monkey-blocks/faq--item' ] ];

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-faq', className );

	return (
		<BlockWrapper className={ classes }>
			<div className="smb-faq__body">
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		</BlockWrapper>
	);
}
