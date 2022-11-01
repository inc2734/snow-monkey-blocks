import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { apply } from './categories-list';

const applyCategoriesList = () => {
	const lists = document.querySelectorAll( '.smb-categories-list__list' );
	forEachHtmlNodes( lists, ( list ) => apply( list ) );
};

document.addEventListener( 'DOMContentLoaded', applyCategoriesList, false );
window.addEventListener( 'load', applyCategoriesList, false );
window.addEventListener( 'resize', applyCategoriesList, false );
