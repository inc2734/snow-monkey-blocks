'use strict';

jQuery( ( $ ) => {
	const removeClasses = [
		'.smb-section',
		'.smb-section-with-bgimage',
		'.smb-section-with-image',
		'.smb-section-with-items',
		'.smb-recent-posts',
		'.smb-pickup-slider',
		'.smb-contents-outline',
		'.smb-child-pages',
	];

	$.each( removeClasses, ( index, value ) => {
		$( value ).remove();
	} );
} );
