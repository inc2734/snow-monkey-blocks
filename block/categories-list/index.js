import { registerStore } from '@wordpress/data';
import { apiFetch as apiFetchAction, controls } from '@wordpress/data-controls';

import blockConfig from '@smb/config/block';
import metadata from './block.json';
import edit from './edit';
import save from './save';

const { name } = metadata;

export { metadata, name };

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

registerStore( name, {
	reducer,
	actions,
	selectors,
	controls,
	resolvers,
} );

export const settings = {
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'excerpt-view',
	},
	edit,
	save,
};
