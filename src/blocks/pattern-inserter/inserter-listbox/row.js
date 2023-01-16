/**
 * @see https://github.com/WordPress/gutenberg/blob/7f7a58a154084df65c493e58365402ac89fb6950/packages/block-editor/src/components/inserter-listbox/row.js
 */

/**
 * WordPress dependencies
 */
import { forwardRef, useContext } from '@wordpress/element';
import { __unstableCompositeGroup as CompositeGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import InserterListboxContext from './context';

function InserterListboxRow( props, ref ) {
	const state = useContext( InserterListboxContext );
	return (
		<CompositeGroup
			state={ state }
			role="presentation"
			ref={ ref }
			{ ...props }
		/>
	);
}

export default forwardRef( InserterListboxRow );
