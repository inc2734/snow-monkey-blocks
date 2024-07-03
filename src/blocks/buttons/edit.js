import classnames from 'classnames';

import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/btn' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/btn' ] ];

export default function ( { attributes, clientId } ) {
	const { templateLock } = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-buttons' );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		template: TEMPLATE,
		orientation: 'horizontal',
		templateLock,
		renderAppender: hasInnerBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
