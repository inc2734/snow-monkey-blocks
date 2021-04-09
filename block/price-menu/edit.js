import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/price-menu--item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/price-menu--item' ] ];

export default function ( { className } ) {
	const classes = classnames( 'smb-price-menu', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
