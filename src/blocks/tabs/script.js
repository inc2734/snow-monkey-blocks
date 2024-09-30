import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

const toggle = ( tab ) => {
	const targetId = tab.getAttribute( 'aria-controls' );
	if ( ! targetId ) {
		return;
	}

	const target = document.getElementById( targetId );
	if ( ! target ) {
		return;
	}

	tab.setAttribute(
		'aria-selected',
		'true' === tab.getAttribute( 'aria-selected' ) ? 'false' : 'true'
	);
	target.setAttribute(
		'aria-hidden',
		'true' === target.getAttribute( 'aria-hidden' ) ? 'false' : 'true'
	);
};

const apply = ( tab ) => {
	tab.addEventListener(
		'click',
		() => {
			const targetId = tab.getAttribute( 'aria-controls' );
			if ( ! targetId ) {
				return;
			}

			const target = document.getElementById( targetId );
			if ( ! target ) {
				return;
			}

			if ( 'true' === tab.getAttribute( 'aria-selected' ) ) {
				return true;
			}

			const tabsWrapper = tab.parentElement.parentElement;
			const siblings = tabsWrapper.querySelectorAll( '.smb-tabs__tab' );
			if ( 2 > siblings.length ) {
				return;
			}

			forEachHtmlNodes( siblings, ( sibling ) => {
				if (
					sibling === tab ||
					'true' === sibling.getAttribute( 'aria-selected' )
				) {
					toggle( sibling );
				}
			} );
		},
		false
	);
};

const openTabWithHash = ( hash ) => {
	if ( hash?.match( /^#smb-tab-for-/ ) ) {
		const tab = document.querySelector( `${ hash } .smb-tabs__tab` );
		if ( !! tab ) {
			if ( 'false' === tab.getAttribute( 'aria-selected' ) ) {
				tab.click();
			}
		}
	}
};

const applyOpenTabHashNav = ( link ) => {
	link.addEventListener(
		'click',
		( event ) => {
			const targetURL = event.target.href.replace(
				event.target.hash,
				''
			);

			if ( window.location.href.includes( targetURL ) ) {
				event.preventDefault();
				openTabWithHash( event.target.hash );
			}
		},
		false
	);
};

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const tabs = document.querySelectorAll( '.smb-tabs__tab' );
		forEachHtmlNodes( tabs, apply );

		openTabWithHash( window.location.hash );

		const tabLinks = document.querySelectorAll(
			'a[href*="#smb-tab-for-"]'
		);
		forEachHtmlNodes( tabLinks, applyOpenTabHashNav );
	},
	false
);
