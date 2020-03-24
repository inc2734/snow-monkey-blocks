'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export function apply( list ) {
	const icon = list.getAttribute( 'data-icon' );
	const iconColor = list.getAttribute( 'data-icon-color' );
	const iconWrapperHtml = document.createElement( 'span' );
	const iconHtml = document.createElement( 'i' );

	iconWrapperHtml.classList.add( 'smb-list__icon' );
	iconHtml.classList.add( 'fas' );
	iconHtml.classList.add( `fa-${ icon }` );

	if ( !! iconColor ) {
		iconWrapperHtml.style.color = iconColor;
	}
	iconWrapperHtml.appendChild( iconHtml );

	const items = list.querySelectorAll( 'li' );
	const setIcon = ( item ) => {
		const iconWrapper = item.querySelector( '.smb-list__icon' );
		if ( !! iconWrapper ) {
			item.removeChild( iconWrapper );
		}
		item.insertAdjacentHTML( 'afterbegin', iconWrapperHtml.outerHTML );
	};

	forEachHtmlNodes( items, setIcon );
}
