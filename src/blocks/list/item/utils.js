/**
 * @see https://github.com/WordPress/gutenberg/blob/74a71e27d74c34a1ec195127709a1ef8a59fe05f/packages/block-library/src/list-item/utils.js
 */

/**
 * WordPress dependencies
 */
import { switchToBlockType } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { name as listItemName } from './block.json';
import { name as listName } from '../block.json';

const paragraphName = 'core/paragraph';

function convertBlockToList( block ) {
	const list = switchToBlockType( block, listName );
	if ( list ) return list;
	const paragraph = switchToBlockType( block, paragraphName );
	if ( paragraph ) return switchToBlockType( paragraph, listName );
	return null;
}

export function convertToListItems( blocks ) {
	const listItems = [];

	for ( let block of blocks ) {
		if ( block.name === listItemName ) {
			listItems.push( block );
		} else if ( block.name === listName ) {
			listItems.push( ...block.innerBlocks );
		} else if ( ( block = convertBlockToList( block ) ) ) {
			for ( const { innerBlocks } of block ) {
				listItems.push( ...innerBlocks );
			}
		}
	}

	return listItems;
}
