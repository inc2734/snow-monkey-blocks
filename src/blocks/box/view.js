document.addEventListener( 'DOMContentLoaded', () => {
	const boxes = document.querySelectorAll( '.smb-box--has-link' );

	[].slice.call( boxes ).forEach( ( box ) => {
		let down, up;
		const link = box.querySelector( ':scope > .smb-box__link' );

		if ( !! link ) {
			box.addEventListener( 'mousedown', ( event ) => {
				event.stopPropagation();
				down = +new Date();
			} );

			box.addEventListener( 'mouseup', ( event ) => {
				event.stopPropagation();

				if (
					[ 'A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA' ].includes(
						event.target?.tagName
					)
				) {
					return false;
				}

				up = +new Date();
				if ( up - down < 200 ) {
					link.click();
				}
			} );
		}
	} );
} );
