'use strict';

import $ from 'jquery';

export default class smbSlider {
	constructor() {
		this.selector = '[data-smb-slider]';
		window.addEventListener( 'DOMContentLoaded', () => this._DOMContentLoaded(), false );
	}

	_DOMContentLoaded() {
		const sliders = document.querySelectorAll( this.selector );
		this._forEachHtmlNodes( sliders, ( slider ) => {
			const config = slider.getAttribute( 'data-smb-slider' );
			if ( !! config ) {
				$( slider ).slick( JSON.parse( config ) );
			}
		} );
	}

	_forEachHtmlNodes( htmlNodes, callback ) {
		if ( 0 < htmlNodes.length ) {
			[].forEach.call( htmlNodes, ( htmlNode ) => callback( htmlNode ) );
		}
	}
}
