/**
 * @see https://github.com/WordPress/gutenberg/blob/7f7a58a154084df65c493e58365402ac89fb6950/packages/block-editor/src/components/inserter/block-patterns-tab.js
 */

import { useBlockProps } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useMemo, useCallback, useState } from '@wordpress/element';
import { group } from '@wordpress/icons';
import { __, _x } from '@wordpress/i18n';

import usePatternsState from './inserter/hooks/use-patterns-state';
import PatternsExplorerModal from './inserter/block-patterns-explorer/explorer';

function usePatternsCategories( rootClientId ) {
	const [ allPatterns, allCategories ] = usePatternsState(
		undefined,
		rootClientId
	);

	const hasRegisteredCategory = useCallback(
		( pattern ) => {
			if ( ! pattern.categories || ! pattern.categories.length ) {
				return false;
			}

			return pattern.categories.some( ( cat ) =>
				allCategories.some( ( category ) => category.name === cat )
			);
		},
		[ allCategories ]
	);

	// Remove any empty categories.
	const populatedCategories = useMemo( () => {
		const categories = allCategories
			.filter( ( category ) =>
				allPatterns.some( ( pattern ) =>
					pattern.categories?.includes( category.name )
				)
			)
			.sort( ( { name: currentName }, { name: nextName } ) => {
				if (
					! [ currentName, nextName ].some( ( categoryName ) =>
						[ 'featured', 'text' ].includes( categoryName )
					)
				) {
					return 0;
				}
				// Move `featured` category to the top and `text` to the bottom.
				return currentName === 'featured' || nextName === 'text'
					? -1
					: 1;
			} );

		if (
			allPatterns.some(
				( pattern ) => ! hasRegisteredCategory( pattern )
			) &&
			! categories.find(
				( category ) => category.name === 'uncategorized'
			)
		) {
			categories.push( {
				name: 'uncategorized',
				label: _x( 'Uncategorized' ),
			} );
		}

		return categories;
		// Temporarily disabling exhaustive-deps to avoid introducing unexpected side effecst.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ allPatterns, allCategories ] );

	return populatedCategories;
}

export default function ( { clientId } ) {
	const [ showPatternsExplorer, setShowPatternsExplorer ] = useState( false );

	const { removeBlocks } = useDispatch( 'core/block-editor' );

	const rootClientId = null;
	const categories = usePatternsCategories( rootClientId );
	const selectedCategory =
		0 < categories.length ? categories.slice( 0, 1 )[ 0 ] : {};

	return (
		<>
			<div { ...useBlockProps() }>
				<Placeholder
					icon={ group }
					label={ __(
						'Insert Pattern (Beta)',
						'snow-monkey-blocks'
					) }
				>
					<p>
						{ __(
							'Click on the button below to see all available patterns. Click on any pattern you wish to insert, and that pattern will be inserted into the article.',
							'snow-monkey-blocks'
						) }
					</p>
					<div>
						<Button
							className="block-editor-inserter__patterns-explore-button"
							onClick={ () => setShowPatternsExplorer( true ) }
							variant="secondary"
						>
							{ __( 'Explore all patterns' ) }
						</Button>
						<Button
							variant="tertiary"
							onClick={ () => removeBlocks( clientId, false ) }
						>
							{ __(
								'Remove this placeholder',
								'snow-monkey-blocks'
							) }
						</Button>
					</div>
				</Placeholder>
			</div>

			{ showPatternsExplorer && (
				<PatternsExplorerModal
					initialCategory={ selectedCategory }
					patternCategories={ categories }
					onModalClose={ () => setShowPatternsExplorer( false ) }
				/>
			) }
		</>
	);
}
