document.addEventListener( 'DOMContentLoaded', () => {
	const boxes = document.querySelectorAll( '.smb-box--has-link' );

	[].slice.call( boxes ).forEach( ( box ) => {
		let down, up;
		const link = box.querySelector( ':scope > .smb-box__link' );

		if ( !! link ) {
			box.addEventListener( 'pointerdown', ( event ) => {
				event.stopPropagation();
				down = +new Date();
			} );

			box.addEventListener( 'pointerup', ( event ) => {
				event.stopPropagation();

				if ( 0 !== event.button ) {
					return false;
				}

				if (
					[ 'A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA' ].includes(
						event.target?.tagName
					)
				) {
					return false;
				}

				up = +new Date();
				if ( up - down < 200 ) {
					const pressedKeys =
						event.shiftKey || event.ctrlKey || event.metaKey;
					if ( pressedKeys ) {
						const originalTarget = link.getAttribute( 'target' );
						const originalRel = link.getAttribute( 'rel' );
						link.setAttribute( 'target', '_blank' );
						link.setAttribute( 'rel', 'noopener noreferrer' );

						link.click();

						link.setAttribute( 'target', originalTarget || '' );
						link.setAttribute( 'rel', originalRel || '' );
					} else {
						link.click();
					}
				}
			} );
		}
	} );
} );
