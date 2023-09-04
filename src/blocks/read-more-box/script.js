document.addEventListener( 'DOMContentLoaded', () => {
	const boxes = document.querySelectorAll( '.smb-read-more-box' );
	[].slice.call( boxes ).forEach( ( box ) => {
		const content = box.querySelector( '.smb-read-more-box__content' );
		if ( ! content ) {
			return;
		}

		const btn = box.querySelector( '.smb-read-more-box__button' );
		if ( ! btn ) {
			return;
		}

		const label = box.querySelector( '.smb-read-more-box__label' );
		if ( ! label ) {
			return;
		}

		btn.addEventListener( 'click', () => {
			const targetId = btn.getAttribute( 'aria-controls' );
			const target = document.getElementById( targetId );
			if ( ! target ) {
				return;
			}

			const expanded = btn.getAttribute( 'aria-expanded' );
			if ( 'false' === expanded ) {
				target.style.height = `${ target.scrollHeight }px`;

				btn.setAttribute( 'aria-expanded', 'true' );
				target.setAttribute( 'aria-hidden', 'false' );
			} else {
				target.style.height = '';

				btn.setAttribute( 'aria-expanded', 'false' );
				target.setAttribute( 'aria-hidden', 'true' );
			}

			return false;
		} );

		content.addEventListener( 'transitionend', () => {
			const expanded = btn.getAttribute( 'aria-expanded' );
			if ( 'false' === expanded ) {
				label.textContent = btn.getAttribute( 'data-label' );
			} else {
				label.textContent = btn.getAttribute( 'data-close-label' );
			}
		} );
	} );
} );
