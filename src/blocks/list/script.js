import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { apply } from './list';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const lists = document.querySelectorAll( '.smb-list' );
		forEachHtmlNodes( lists, ( list ) => apply( list ) );
	},
	false
);
