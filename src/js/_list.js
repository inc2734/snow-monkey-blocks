'use strict';

export default class smbList {
	constructor() {
		this.selector = '.smb-list';
		window.addEventListener( 'DOMContentLoaded', () => this._DOMContentLoaded(), false );
	}

	_DOMContentLoaded() {
		const lists = document.querySelectorAll( this.selector );
		this._forEachHtmlNodes( lists, ( list ) => {
			const icon = list.getAttribute( 'data-icon' );
			const iconColor = list.getAttribute( 'data-icon-color' );
			const items = list.querySelectorAll( 'li' );
			const iconHtml = `<span class="smb-list__icon" style="color: ${ iconColor }"><i class="fas fa-${ icon }"></i></span>`;

			this._forEachHtmlNodes( items, ( item ) => {
				item.innerHTML = iconHtml + item.innerHTML;
			} );
		} );
	}

	_forEachHtmlNodes( htmlNodes, callback ) {
		if ( 0 < htmlNodes.length ) {
			[].forEach.call( htmlNodes, ( htmlNode ) => callback( htmlNode ) );
		}
	}
}
