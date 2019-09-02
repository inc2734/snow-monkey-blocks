'use strict';

import { blockConfig } from '../../src/js/config/block';
import { edit } from './_edit';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { withSelect } = wp.data;

registerBlockType( 'snow-monkey-blocks/recent-posts', {
	title: __( 'Recent posts', 'snow-monkey-blocks' ),
	description: __( 'You can display recent posts with richer.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ul',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/recent-posts.png`,
	},

	edit: withSelect( ( select, props ) => {
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
	} )( edit ),

	save() {
		return null;
	},
} );
