'use strict';

import TaxonomyPosts from './taxonomy-posts';

import {
	withSelect,
} from '@wordpress/data';

export default withSelect( ( select ) => {
	const { getTaxonomies, getEntityRecords } = select( 'core' );

	const AllTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
	const taxonomies = AllTaxonomies.filter( ( taxonomy ) => taxonomy.visibility.show_ui );

	const taxonomiesTerms = {};
	taxonomies.forEach( ( taxonomy ) => {
		const terms = getEntityRecords( 'taxonomy', taxonomy.slug, { per_page: -1 } ) || [];
		if ( 0 < terms.length ) {
			taxonomiesTerms[ taxonomy.slug ] = terms;
		}
	} );

	return {
		withSelect: {
			taxonomies: taxonomies,
			taxonomiesTerms: taxonomiesTerms,
		},
	};
} )( TaxonomyPosts );
