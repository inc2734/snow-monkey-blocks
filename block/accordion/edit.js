import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/accordion-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/accordion-item' ] ];

export default function ( { className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/accordion--item',
			newBlockName: 'snow-monkey-blocks/accordion-item',
		},
	] );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-accordion', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		templateLock: false,
		renderAppender: hasInnerBlocks
			? InnerBlocks.DefaultBlockAppender
			: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
