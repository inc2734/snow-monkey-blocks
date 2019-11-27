'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import List from '../../block/list/list';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		forEachHtmlNodes(
			document.querySelectorAll( '.smb-list' ),
			( list ) => new List( list )
		);
	},
	false
);
