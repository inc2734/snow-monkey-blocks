'use strict';

import Masonry from 'masonry-layout';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class CategoriesList {
	constructor() {
		forEachHtmlNodes(
			document.querySelectorAll( '.smb-categories-list__list' ),
			( categoryList ) => {
				categoryList.classList.add( 'masonry-active' );

				new Masonry(
					categoryList,
					{
						itemSelector: '.smb-categories-list__item',
						percentPosition: true,
						horizontalOrder: true,
					}
				);
			}
		);
	}
}
