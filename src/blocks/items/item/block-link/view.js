import { boxLink } from '../../../../js/helper/helper';

document.addEventListener( 'DOMContentLoaded', () => {
	const panels = document.querySelectorAll( '.smb-items__item--block-link' );

	[].slice.call( panels ).forEach( ( panel ) => {
		const link = panel.querySelector( '.smb-items__item__action > a' );
		boxLink( panel, link );
	} );
} );
