/**
 * @see https://github.com/WordPress/gutenberg/blob/7f7a58a154084df65c493e58365402ac89fb6950/packages/block-editor/src/components/inserter-listbox/index.js
 */

/**
 * WordPress dependencies
 */
import { __unstableUseCompositeState as useCompositeState } from '@wordpress/components';

/**
 * Internal dependencies
 */
import InserterListboxContext from './context';

export { default as InserterListboxGroup } from './group';
export { default as InserterListboxRow } from './row';
export { default as InserterListboxItem } from './item';

function InserterListbox( { children } ) {
	const compositeState = useCompositeState( {
		shift: true,
		wrap: 'horizontal',
	} );
	return (
		<InserterListboxContext.Provider value={ compositeState }>
			{ children }
		</InserterListboxContext.Provider>
	);
}

export default InserterListbox;
