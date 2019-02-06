'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class smbList {
	constructor() {
		this.selector = '.smb-list';
		window.addEventListener( 'DOMContentLoaded', () => this._DOMContentLoaded(), false );
	}

	_DOMContentLoaded() {
		const lists = document.querySelectorAll( this.selector );
		forEachHtmlNodes( lists, ( list ) => {
			const icon = list.getAttribute( 'data-icon' );
			const iconColor = list.getAttribute( 'data-icon-color' );
			const items = list.querySelectorAll( 'li' );
			const iconHtml = `<span class="smb-list__icon" style="color: ${ iconColor }"><i class="fas fa-${ icon }"></i></span>`;

			forEachHtmlNodes( items, ( item ) => {
				forEachHtmlNodes( item.getElementsByClassName( 'smb-list__icon' ), ( _icon ) => {
					item.removeChild( _icon );
				} );

				item.innerHTML = iconHtml + item.innerHTML;
			} );
		} );
	}
}
