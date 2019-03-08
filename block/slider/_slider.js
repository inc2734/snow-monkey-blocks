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
