import { parse } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Migrate block name with double hyphen to blocl name with single hyphen.
 *
 * @param { string } clientId
 * @param { Array }  migrateBlocks
 *
 * @see https://github.com/inc2734/snow-monkey-blocks/issues/529
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/blocks/src/api/parser/index.js#L288-L317
 */
export const useMigrateDoubleHyphenToSingleHyphen = (
	clientId,
	migrateBlocks
) => {
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	const { getBlockOrder, getBlock } = useSelect( ( select ) => {
		return {
			getBlockOrder: select( 'core/block-editor' ).getBlockOrder,
			getBlock: select( 'core/block-editor' ).getBlock,
		};
	}, [] );

	const blockNameToDefaultClassName = ( blockName ) => {
		return `wp-block-${ blockName.replace( '/', '-' ) }`;
	};

	useEffect( () => {
		const newInnerBlocks = getBlockOrder( clientId ).map(
			( itemClientId ) => {
				const item = getBlock( itemClientId );

				let migratedBlock;

				migrateBlocks.some( ( migrateBlock ) => {
					if (
						'core/missing' !== item.name &&
						migrateBlock.oldBlockName !== item.name
					) {
						return false;
					}

					const newBlock = parse(
						item.originalContent
							.replace(
								migrateBlock.oldBlockName,
								migrateBlock.newBlockName
							)
							.replace(
								blockNameToDefaultClassName(
									migrateBlock.oldBlockName
								),
								blockNameToDefaultClassName(
									migrateBlock.oldBlockName
								) +
									' ' +
									blockNameToDefaultClassName(
										migrateBlock.newBlockName
									)
							)
					)[ 0 ];

					if ( 'core/missing' !== newBlock.name ) {
						migratedBlock = newBlock;
						return true;
					}

					return false;
				} );

				return !! migratedBlock ? migratedBlock : item;
			}
		);

		if ( 0 < newInnerBlocks.length ) {
			replaceInnerBlocks( clientId, newInnerBlocks );
		}
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ clientId ] );
};
