import classnames from 'classnames';

import {
	InnerBlocks,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { useMigrateDoubleHyphenToSingleHyphen } from '@smb/hooks';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/directory-structure-item-directory',
	'snow-monkey-blocks/directory-structure-item-file',
];

export default function ( { className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName:
				'snow-monkey-blocks/directory-structure--item--directory',
			newBlockName:
				'snow-monkey-blocks/directory-structure-item-directory',
		},
		{
			oldBlockName: 'snow-monkey-blocks/directory-structure--item--file',
			newBlockName: 'snow-monkey-blocks/directory-structure-item-file',
		},
	] );

	const classes = classnames( 'smb-directory-structure', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: false,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
