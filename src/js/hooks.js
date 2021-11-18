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
 */
export const useMigrateDoubleHyphenToSingleHyphen = (
	clientId,
	migrateBlocks
) => {
	const { replaceBlock } = useDispatch( 'core/block-editor' );

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
		getBlockOrder( clientId ).forEach( ( itemClientId ) => {
			const item = getBlock( itemClientId );
			migrateBlocks.forEach( ( migrateBlock ) => {
				if (
					'core/missing' === item.name ||
					migrateBlock.oldBlockName === item.name
				) {
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
					replaceBlock( item.clientId, newBlock );
				}
			} );
		} );
	}, [] );
};
