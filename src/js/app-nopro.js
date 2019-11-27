'use strict';

jQuery( ( $ ) => {
	const removeClasses = [
		'.smb-section',
		'.smb-section-with-bgimage',
		'.smb-section-with-image',
		'.smb-section-with-items',
		'.smb-section-with-video',
		'.smb-section-break-the-grid',
		'.smb-section-side-heading',
		'.smb-recent-posts',
		'.smb-pickup-slider',
	];

	$.each( removeClasses, ( index, value ) => $( value ).remove() );
} );
