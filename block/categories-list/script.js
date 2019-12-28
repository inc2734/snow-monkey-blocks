'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import CategoriesList from './categories-list';

const applyCategoriesList = () => {
	const htmlNodes = document.querySelectorAll( '.smb-categories-list__list' );
	const nodes = Array.prototype.slice.call(htmlNodes, 0);
	nodes.forEach((htmlNode) => new CategoriesList( htmlNode ));
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
