import classnames from 'classnames';

import {
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { className } ) {
	const allowedBlocks = [ 'snow-monkey-blocks/price-menu--item' ];
	const template = [ [ 'snow-monkey-blocks/price-menu--item' ] ];

	const classes = classnames( 'smb-price-menu', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks,
		template,
		templateLock: false,
	} );

	return <div { ...innerBlocksProps } />;
}
