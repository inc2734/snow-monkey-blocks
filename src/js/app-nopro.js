'use strict';

jQuery( ( $ ) => {
	const removeClasses = [
		'.smb-section-with-image',
		'.smb-section-with-items',
	];

	$.each( removeClasses, ( index, value ) => $( value ).remove() );
} );
