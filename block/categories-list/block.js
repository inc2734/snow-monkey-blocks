'use strict';

import { blockConfig } from '../../src/js/config/block.js';
import { edit } from './_edit.js';

const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
const { apiFetch } = wp;
const { registerStore, withSelect } = wp.data;

const actions = {
	setArticleCategories( articleCategories ) {
		return {
			type: 'SET_ARTICLE_CATEGORIES',
			articleCategories,
		};
	},
	receiveArticleCategories( path ) {
		return {
			type: 'RECEIVE_ARTICLE_CATEGORIES',
			path,
		};
	},
};

registerStore( 'snow-monkey-blocks/categories-list', {
	reducer( state = { articleCategories: {} }, action ) {
		switch ( action.type ) {
			case 'SET_ARTICLE_CATEGORIES':
				return {
					...state,
					articleCategories: action.articleCategories,
				};
			case 'RECEIVE_ARTICLE_CATEGORIES':
				return action.articleCategories;
		}
		return state;
	},
	actions,
	selectors: {
		receiveArticleCategories( state ) {
			const { articleCategories } = state;
			return articleCategories;
		},
	},
	controls: {
		RECEIVE_ARTICLE_CATEGORIES( action ) {
			return apiFetch( { path: action.path } );
		},
	},
	resolvers: {
		* receiveArticleCategories() {
			const articleCategories = yield actions.receiveArticleCategories( '/wp/v2/categories/?per_page=-1' );
			return actions.setArticleCategories( articleCategories );
		},
	},
} );

registerBlockType( 'snow-monkey-blocks/categories-list', {
	title: __( 'Categories list', 'snow-monkey-blocks' ),
	description: __( 'This is a block that displays a list of categories', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'excerpt-view',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		screenshot: 'https://snow-monkey.2inc.org/wp-content/uploads/2019/04/screenshot-17.png',
	},

	edit: withSelect( ( select ) => {
		return {
			articleCategories: select( 'snow-monkey-blocks/categories-list' ).receiveArticleCategories(),
		};
	} )( edit ),

	save() {
		return null;
	},
} );
