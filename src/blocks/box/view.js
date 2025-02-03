import { boxLink } from '../../js/helper/helper';

document.addEventListener( 'DOMContentLoaded', () => {
	const boxes = document.querySelectorAll( '.smb-box--has-link' );

	[].slice.call( boxes ).forEach( ( box ) => {
		const link = box.querySelector( ':scope > .smb-box__link' );
		boxLink( box, link );
	} );
} );
