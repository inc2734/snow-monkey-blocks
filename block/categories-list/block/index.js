'use strict';

import { registerStore } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

import blockConfig from '../../../src/js/config/block';
import attributes from './attributes.json';
import edit from './edit';
import save from './save';
import example from './example';

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

export const name = 'snow-monkey-blocks/categories-list';

const DEFAULT_STATE = {
	articleCategories: {},
};

registerStore( name, {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_ARTICLE_CATEGORIES':
				return {
					...state,
					articleCategories: action.articleCategories,
				};
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
		*receiveArticleCategories() {
			const articleCategories = yield actions.receiveArticleCategories(
				'/wp/v2/categories/?per_page=-1'
			);
			return actions.setArticleCategories( articleCategories );
		},
	},
} );

export const settings = {
	title: __( 'Categories list', 'snow-monkey-blocks' ),
	description: __(
		'This is a block that displays a list of categories',
		'snow-monkey-blocks'
	),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'excerpt-view',
	},
	category: blockConfig.blockCategories.common,
	attributes,
	edit,
	save,
	example,
};
