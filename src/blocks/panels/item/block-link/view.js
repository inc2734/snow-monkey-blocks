import { boxLink } from '../../../../js/helper/helper';

document.addEventListener( 'DOMContentLoaded', () => {
	const panels = document.querySelectorAll( '.smb-panels__item--block-link' );

	[].slice.call( panels ).forEach( ( panel ) => {
		const link = panel.querySelector(
			':scope > .smb-panels__item__action > a'
		);
		boxLink( panel, link );
	} );
} );
