'use strict';

import Masonry from 'Masonry';

export default class smbCategoriesList {
	constructor() {
		window.addEventListener( 'DOMContentLoaded', () => this._masonry(), false );
		window.addEventListener( 'load', () => this._masonry(), false );
		window.addEventListener( 'resize', () => this._masonry(), false );
	}

	_masonry() {
		const categoryLists = document.getElementsByClassName( 'smb-categories-list__list' );
		this._forEachHtmlNodes( categoryLists, ( categoryList ) => {
			new Masonry( categoryList, {
				itemSelector: '.smb-categories-list__item',
				percentPosition: true,
				horizontalOrder: true,
			} );
		} );
	}

	_forEachHtmlNodes( htmlNodes, callback ) {
		if ( 0 < htmlNodes.length ) {
			let index = 0;
			[].forEach.call( htmlNodes, ( htmlNode ) => {
				callback( htmlNode, index );
				index++;
			} );
		}
	}
}
