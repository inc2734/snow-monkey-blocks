'use strict';

import $ from 'jquery';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class Slider {
	constructor() {
		forEachHtmlNodes(
			document.querySelectorAll( '[data-smb-slider]' ),
			( slider ) => {
				const _config = slider.getAttribute( 'data-smb-slider' );
				const config = !! _config ? JSON.parse( _config ) : {};
				config.responsive = [];

				if ( !! config.mdSlidesToShow && !! config.mdSlidesToScroll ) {
					config.responsive.push( {
						breakpoint: 1023,
						settings: {
							slidesToShow: config.mdSlidesToShow,
							slidesToScroll: config.mdSlidesToScroll,
						},
					} );
				}

				if ( !! config.smSlidesToShow && !! config.smSlidesToScroll ) {
					config.responsive.push( {
						breakpoint: 639,
						settings: {
							slidesToShow: config.smSlidesToShow,
							slidesToScroll: config.smSlidesToScroll,
						},
					} );
				}

				config.autoplay = 0 < config.autoplaySpeed ? true : false;

				config.adaptiveHeight = true;
				delete config.mdSlidesToShow;
				delete config.mdSlidesToScroll;
				delete config.smSlidesToShow;
				delete config.smSlidesToScroll;

				$( slider ).on( 'init', () => {
					const slickList = $( slider ).find( '.slick-list' );
					slickList.prepend( $( slider ).find( '.slick-prev' ) );
					slickList.append( $( slider ).find( '.slick-next' ) );
				} );

				$( slider ).slick( config );
			}
		);
	}
}
