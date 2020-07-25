import classnames from 'classnames';

import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function( { className } ) {
	const allowedBlocks = [
		'snow-monkey-blocks/step--item',
		'snow-monkey-blocks/step--item--free',
	];
	const template = [ [ 'snow-monkey-blocks/step--item--free' ] ];

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-step', className );

	return (
		<BlockWrapper className={ classes }>
			<div className="smb-step__body">
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					template={ template }
					templateLock={ false }
				/>
			</div>
		</BlockWrapper>
	);
}
