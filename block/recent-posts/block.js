'use strict';

import { edit } from './_edit.js';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { withSelect } = wp.data;

registerBlockType( 'snow-monkey-blocks/recent-posts', {
	title: __( 'Recent posts', 'snow-monkey-blocks' ),
	icon: 'editor-ul',
	category: 'smb',

	edit: withSelect( ( select ) => {
		const { getPostTypes } = select( 'core' );

		const AllPostTypes = getPostTypes( { per_page: -1 } ) || [];
		const postTypes = AllPostTypes.filter(
			( postType ) => {
				return postType.viewable && ! postType.hierarchical && 'media' !== postType.rest_base;
			}
		);

		return {
			withSelect: {
				postTypes: postTypes,
			},
		};
	} )( edit ),

	save() {
		return null;
	},
} );
