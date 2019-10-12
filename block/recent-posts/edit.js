'use strict';

import RecentPosts from './recent-posts';

import {
	withSelect,
} from '@wordpress/data';

export default withSelect( ( select, props ) => {
	const { getPostTypes, getEntityRecords } = select( 'core' );
	const { attributes } = props;

	const AllPostTypes = getPostTypes( { per_page: -1 } ) || [];
	const postTypes = AllPostTypes.filter(
		( postType ) => {
			return postType.viewable && ! postType.hierarchical && 'media' !== postType.rest_base;
		}
	);

	return {
		withSelect: {
			postTypes: postTypes,
			latestPost: getEntityRecords( 'postType', attributes.postType, { per_page: 1 } ),
		},
	};
} )( RecentPosts );
