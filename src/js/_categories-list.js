'use strict';

import Masonry from 'masonry-layout';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class smbCategoriesList {
	constructor() {
		window.addEventListener( 'DOMContentLoaded', () => this._masonry(), false );
		window.addEventListener( 'load', () => this._masonry(), false );
		window.addEventListener( 'resize', () => this._masonry(), false );
	}

	_masonry() {
		const categoryLists = document.getElementsByClassName( 'smb-categories-list__list' );
		forEachHtmlNodes( categoryLists, ( categoryList ) => {
			categoryList.classList.add( 'masonry-active' );
			new Masonry( categoryList, {
				itemSelector: '.smb-categories-list__item',
				percentPosition: true,
				horizontalOrder: true,
			} );
		} );
	}
}
