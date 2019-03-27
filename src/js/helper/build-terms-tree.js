'use strict';

const { groupBy } = lodash;

/**
 * Returns terms in a tree form.
 *
 * @copyright torounit
 * @see https://github.com/torounit/advanced-posts-blocks/blob/master/src/util/terms.js
 *
 * @param {Array} flatTerms  Array of terms in flat format.
 * @return {Array} Array of terms in tree format.
 */
export default function buildTermsTree( flatTerms ) {
	const flatTermsWithParentAndChildren = flatTerms.map( ( term ) => {
		return {
			children: [],
			parent: null,
			...term,
		};
	} );

	const termsByParent = groupBy( flatTermsWithParentAndChildren, 'parent' );
	if ( termsByParent.null && termsByParent.null.length ) {
		return flatTermsWithParentAndChildren;
	}

	const fillWithChildren = ( terms ) => {
		return terms.map( ( term ) => {
			const children = termsByParent[ term.id ];
			return {
				...term,
				children: children && children.length ?
					fillWithChildren( children ) :
					[],
			};
		} );
	};

	return fillWithChildren( termsByParent[ '0' ] || [] );
}
