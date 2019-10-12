'use strict';

import $ from 'jquery';
import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

export default class ThumbnailGallery {
	constructor() {
		forEachHtmlNodes(
			document.querySelectorAll( '.smb-thumbnail-gallery__canvas' ),
			( slider ) => {
				const _config = slider.getAttribute( 'data-smb-thumbnail-gallery' );
				const config = !! _config ? JSON.parse( _config ) : {};

				config.slidesToShow = 1;
				config.slidesToScroll = 1;
				config.fade = true;
				config.dots = true;
				config.customPaging = ( thisSlider, i ) => $( thisSlider.$slides[ i ] ).find( 'img' ).clone()[ 0 ];
				config.arrows = config.arrows || false;
				config.adaptiveHeight = true;

				$( slider ).on(
					'init',
					() => {
						const slickList = $( slider ).find( '.slick-list' );
						slickList.prepend( $( slider ).find( '.slick-prev' ) );
						slickList.append( $( slider ).find( '.slick-next' ) );
					}
				);

				$( slider ).slick( config );
			}
		);
	}
}
