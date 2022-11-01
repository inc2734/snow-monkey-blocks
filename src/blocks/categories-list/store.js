import { apiFetch as apiFetchAction, controls } from '@wordpress/data-controls';
import { createReduxStore, register } from '@wordpress/data';

import metadata from './block.json';

const { name } = metadata;

const DEFAULT_STATE = {
	articleCategories: {},
};

const reducer = ( state = DEFAULT_STATE, action ) => {
	switch ( action.type ) {
		case 'SET_ARTICLE_CATEGORIES':
			return {
				...state,
				articleCategories: action.articleCategories,
			};
	}
	return state;
};

const actions = {
	setArticleCategories( articleCategories ) {
		return {
			type: 'SET_ARTICLE_CATEGORIES',
			articleCategories,
		};
	},

	*fetchArticleCategories() {
		const articleCategories = yield apiFetchAction( {
			path: `/wp/v2/categories/?per_page=-1`,
		} );

		return actions.setArticleCategories( articleCategories );
	},
};

const selectors = {
	getArticleCategories( state ) {
		return state.articleCategories;
	},
};

const resolvers = {
	*getArticleCategories() {
		yield actions.fetchArticleCategories();
	},
};

export const store = createReduxStore( name, {
	reducer,
	actions,
	selectors,
	controls,
	resolvers,
} );

register( store );
