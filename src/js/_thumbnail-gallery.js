'use strict';

import $ from 'jquery';

export default class smbThumbnailGallery {
	constructor() {
		window.addEventListener( 'DOMContentLoaded', () => this._DOMContentLoaded(), false );
	}

	_DOMContentLoaded() {
		const sliders = document.getElementsByClassName( 'smb-thumbnail-gallery' );
		this._forEachHtmlNodes( sliders, ( slider ) => {
			const canvases = slider.getElementsByClassName( 'smb-thumbnail-gallery__canvas' );
			const navs = slider.getElementsByClassName( 'smb-thumbnail-gallery__nav' );

			if ( 1 > canvases.length || 1 > navs.length ) {
				return;
			}

			const canvasConfig = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				fade: true,
			};

			const canvas = canvases[ 0 ];
			const nav = navs[ 0 ];

			const slick = $( canvas ).slick( canvasConfig );

			const navItems = nav.getElementsByClassName( 'smb-thumbnail-gallery__nav__item' );
			this._forEachHtmlNodes( navItems, ( navItem, index ) => {
				navItem.addEventListener( 'click', () => {
					slick.slick( 'slickGoTo', index, false );
				}, false );
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
