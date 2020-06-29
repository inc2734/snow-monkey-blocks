import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

const isPassiveSupported = () => {
	let passiveSupported = false;

	try {
		const options = Object.defineProperty( {}, 'passive', {
			get: () => {
				passiveSupported = true;
			},
		} );

		window.addEventListener( 'test', options, options );
		window.removeEventListener( 'test', options, options );
	} catch ( err ) {
		passiveSupported = false;
	}

	return passiveSupported;
};

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const targets = document.querySelectorAll( '.js-bg-parallax' );
		if ( 'undefined' === typeof IntersectionObserver ) {
			forEachHtmlNodes( targets, ( target ) => {
				target.setAttribute( 'data-is-loaded', 'true' );
			} );
			return;
		}

		const isMobile = () => {
			const ua = window.navigator.userAgent;

			return 0 < ua.indexOf( 'iPad' ) ||
				0 < ua.indexOf( 'iPhone' ) ||
				0 < ua.indexOf( 'iPod' ) ||
				( 0 < ua.indexOf( 'Android' ) && 0 < ua.indexOf( 'Mobile' ) )
				? true
				: false;
		};

		const applyIsMobile = ( target ) => {
			target.setAttribute( 'data-is-mobile', 'true' );
			target.setAttribute( 'data-is-loaded', 'true' );
		};

		if ( isMobile() ) {
			forEachHtmlNodes( targets, applyIsMobile );
			return;
		}

		const apply = ( target ) => {
			const bgimage = target.querySelector(
				'.js-bg-parallax__bgimage > img'
			);

			if ( ! bgimage ) {
				target.setAttribute( 'data-is-loaded', 'true' );
				return;
			}

			const src = bgimage.getAttribute( 'src' );
			if ( ! src || ! src.match( /\.[^\.\/]+?$/ ) ) {
				target.setAttribute( 'data-is-loaded', 'true' );
				return;
			}

			target.setAttribute( 'data-is-loaded', 'true' );

			const resetImagePosition = () => {
				bgimage.style.transform = '';
			};

			const handleScroll = () => {
				const windowHeight = document.documentElement.clientHeight;
				const bgimageHeight = bgimage.offsetHeight;
				const targetHeight = target.offsetHeight;
				const targetTop = target.getBoundingClientRect().top;
				const parallax =
					( windowHeight - targetTop ) *
					( ( bgimageHeight - targetHeight ) / windowHeight );

				bgimage.style.transform = `translate3d(0, ${ parallax }px, 0)`;
			};

			const toggle = ( isIntersecting ) => {
				if ( ! isIntersecting ) {
					window.removeEventListener(
						'scroll',
						handleScroll,
						isPassiveSupported() ? { passive: true } : false
					);
					resetImagePosition();
					return;
				}

				window.addEventListener(
					'scroll',
					handleScroll,
					isPassiveSupported() ? { passive: true } : false
				);
			};

			const observer = new IntersectionObserver( // eslint-disable-line no-undef
				( entries ) =>
					entries.forEach( ( entry ) =>
						toggle( entry.isIntersecting )
					),
				{
					root: null,
					rootMargin: '0px',
					threshold: 0,
				}
			);

			const init = () => {
				if ( window.matchMedia( '(max-width: 1023px)' ).matches ) {
					observer.unobserve( target );
					window.removeEventListener(
						'scroll',
						handleScroll,
						isPassiveSupported() ? { passive: true } : false
					);
					return;
				}

				observer.observe( target );
			};

			init();
			window.addEventListener( 'resize', init, false );
		};

		forEachHtmlNodes( targets, apply );
	},
	false
);
