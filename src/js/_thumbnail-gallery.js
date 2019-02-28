'use strict';

import $ from 'jquery';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class smbThumbnailGallery {
	constructor() {
		window.addEventListener( 'DOMContentLoaded', () => this._DOMContentLoaded(), false );
	}

	_DOMContentLoaded() {
		const sliders = document.getElementsByClassName( 'smb-thumbnail-gallery' );
		forEachHtmlNodes( sliders, ( slider ) => {
			const canvases = slider.getElementsByClassName( 'smb-thumbnail-gallery__canvas' );

			if ( 1 > canvases.length ) {
				return;
			}

			const canvasConfig = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
				dots: true,
				customPaging: ( thisSlider, i ) => $( thisSlider.$slides[ i ] ).find( 'img' ).clone()[ 0 ],
			};

			const canvas = canvases[ 0 ];

			$( canvas ).slick( canvasConfig );
		} );
	}
}
