/**
 * @see https://github.com/WordPress/gutenberg/blob/7f7a58a154084df65c493e58365402ac89fb6950/packages/block-editor/src/components/inserter/block-patterns-explorer/explorer.js
 */

/**
 * WordPress dependencies
 */
import { Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import PatternExplorerSidebar from './sidebar';
import PatternList from './patterns-list';

function PatternsExplorer( { initialCategory, patternCategories } ) {
	const [ filterValue, setFilterValue ] = useState( '' );
	const [ selectedCategory, setSelectedCategory ] = useState(
		initialCategory?.name
	);
	return (
		<div className="block-editor-block-patterns-explorer">
			<PatternExplorerSidebar
				selectedCategory={ selectedCategory }
				patternCategories={ patternCategories }
				onClickCategory={ setSelectedCategory }
				filterValue={ filterValue }
				setFilterValue={ setFilterValue }
			/>
			<PatternList
				filterValue={ filterValue }
				selectedCategory={ selectedCategory }
				patternCategories={ patternCategories }
			/>
		</div>
	);
}

function PatternsExplorerModal( { onModalClose, ...restProps } ) {
	return (
		<Modal
			title={ __( 'Patterns' ) }
			closeLabel={ __( 'Close' ) }
			onRequestClose={ onModalClose }
			isFullScreen
		>
			<PatternsExplorer { ...restProps } />
		</Modal>
	);
}

export default PatternsExplorerModal;
