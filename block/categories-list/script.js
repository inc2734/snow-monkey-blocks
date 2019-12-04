'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import CategoriesList from './categories-list';

const applyCategoriesList = () => {
	forEachHtmlNodes(
		document.querySelectorAll( '.smb-categories-list__list' ),
		( categoryList ) => new CategoriesList( categoryList )
	);
};

document.addEventListener(
	'DOMContentLoaded',
	applyCategoriesList,
	false
);

window.addEventListener(
	'load',
	applyCategoriesList,
	false
);

window.addEventListener(
	'resize',
	applyCategoriesList,
	false
);
