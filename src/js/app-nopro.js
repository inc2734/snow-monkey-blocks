'use strict';

jQuery( ( $ ) => {
	const removeClasses = [
		'.smb-section-with-image',
		'.smb-section-with-items',
		'.smb-section-with-video',
		'.smb-pickup-slider',
	];

	$.each( removeClasses, ( index, value ) => $( value ).remove() );
} );
