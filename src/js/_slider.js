'use strict';

import $ from 'jquery';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class smbSlider {
	constructor() {
		this.selector = '[data-smb-slider]';
		window.addEventListener( 'DOMContentLoaded', () => this._DOMContentLoaded(), false );
	}

	_DOMContentLoaded() {
		const sliders = document.querySelectorAll( this.selector );
		forEachHtmlNodes( sliders, ( slider ) => {
			const config = slider.getAttribute( 'data-smb-slider' );
			if ( !! config ) {
				$( slider ).slick( JSON.parse( config ) );
			}
		} );
	}
}
