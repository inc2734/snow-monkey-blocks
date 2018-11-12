'use strict';

import $ from 'jquery';

$( () => {
	$( '[data-smb-slider]' ).each( ( i, e ) => {
		const slider = $( e );
		const config = slider.data( 'smb-slider' );
		if ( !! config ) {
			slider.slick( config );
		}
	} );
} );
