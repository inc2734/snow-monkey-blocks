import classnames from 'classnames';

import {
	InnerBlocks,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const allowedBlocks = [
		'snow-monkey-blocks/directory-structure--item--directory',
		'snow-monkey-blocks/directory-structure--item--file',
	];

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-directory-structure', className );

	return (
		<>
			<BlockWrapper className={ classes }>
				<InnerBlocks
					allowedBlocks={ allowedBlocks }
					templateLock={ false }
				/>
			</BlockWrapper>
		</>
	);
}
