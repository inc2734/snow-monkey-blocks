'use strict';

jQuery( ( $ ) => {
	const removeClasses = [
		'.smb-section',
		'.smb-section-has-bgimage',
		'.smb-section-has-image',
		'.smb-section-has-items',
	];

	$.each( removeClasses, ( index, value ) => {
		$( value ).remove();
	} );
} );
