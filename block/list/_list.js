'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class List {
	constructor() {
		forEachHtmlNodes(
			document.querySelectorAll( '.smb-list' ),
			( list ) => {
				const icon = list.getAttribute( 'data-icon' );
				const iconColor = list.getAttribute( 'data-icon-color' );
				const iconHtml = `<span class="smb-list__icon" style="color: ${ iconColor }"><i class="fas fa-${ icon }"></i></span>`;

				forEachHtmlNodes(
					list.querySelectorAll( 'li' ),
					( item ) => {
						const iconWrapper = item.querySelector( '.smb-list__icon' );
						if ( !! iconWrapper ) {
							item.removeChild( iconWrapper );
						}
						item.innerHTML = iconHtml + item.innerHTML;
					}
				);
			}
		);
	}
}
