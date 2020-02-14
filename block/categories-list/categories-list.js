'use strict';

import Masonry from 'masonry-layout';

export default class CategoriesList {
	constructor( categoryList ) {
		categoryList.classList.add( 'masonry-active' );

		new Masonry( categoryList, {
			itemSelector: '.smb-categories-list__item',
			percentPosition: true,
			horizontalOrder: true,
		} );
	}
}
