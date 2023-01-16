/**
 * @see https://github.com/WordPress/gutenberg/blob/7f7a58a154084df65c493e58365402ac89fb6950/packages/block-editor/src/components/inserter/block-patterns-explorer/sidebar.js
 */

/**
 * WordPress dependencies
 */
import { Button, SearchControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function PatternCategoriesList( {
	selectedCategory,
	patternCategories,
	onClickCategory,
} ) {
	const baseClassName = 'block-editor-block-patterns-explorer__sidebar';
	return (
		<div className={ `${ baseClassName }__categories-list` }>
			{ patternCategories.map( ( { name, label } ) => {
				return (
					<Button
						key={ name }
						label={ label }
						className={ `${ baseClassName }__categories-list__item` }
						isPressed={ selectedCategory === name }
						onClick={ () => {
							onClickCategory( name );
						} }
					>
						{ label }
					</Button>
				);
			} ) }
		</div>
	);
}

function PatternsExplorerSearch( { filterValue, setFilterValue } ) {
	const baseClassName = 'block-editor-block-patterns-explorer__search';
	return (
		<div className={ baseClassName }>
			<SearchControl
				__nextHasNoMarginBottom
				onChange={ setFilterValue }
				value={ filterValue }
				label={ __( 'Search for patterns' ) }
				placeholder={ __( 'Search' ) }
			/>
		</div>
	);
}

function PatternExplorerSidebar( {
	selectedCategory,
	patternCategories,
	onClickCategory,
	filterValue,
	setFilterValue,
} ) {
	const baseClassName = 'block-editor-block-patterns-explorer__sidebar';
	return (
		<div className={ baseClassName }>
			<PatternsExplorerSearch
				filterValue={ filterValue }
				setFilterValue={ setFilterValue }
			/>
			{ ! filterValue && (
				<PatternCategoriesList
					selectedCategory={ selectedCategory }
					patternCategories={ patternCategories }
					onClickCategory={ onClickCategory }
				/>
			) }
		</div>
	);
}

export default PatternExplorerSidebar;
