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

			const init = () => {
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

				observer.observe( target );

				const toggle = ( isIntersecting ) => {
					let lastParallax = 0;
					let lastTargetTop = target.getBoundingClientRect().top;

					if ( window.matchMedia( '(max-width: 1023px)' ).matches ) {
						observer.unobserve( target );
						window.removeEventListener(
							'scroll',
							handleScroll,
							isPassiveSupported() ? { passive: true } : false
						);
						return;
					}

					const handleScroll = () => {
						const targetTop = target.getBoundingClientRect().top;
						const diffTargetTop = lastTargetTop - targetTop;
						let parallax = lastParallax + diffTargetTop / 5;
						if (
							30 < Math.abs( diffTargetTop ) ||
							Math.abs( parallax ) >=
								( bgimage.offsetHeight - target.offsetHeight ) /
									2
						) {
							parallax = lastParallax;
						}

						lastParallax = parallax;
						lastTargetTop = targetTop;
						bgimage.style.transform = `translateY(calc(-50% + ${ parallax }px))`;
					};

					if ( ! isIntersecting ) {
						window.removeEventListener(
							'scroll',
							handleScroll,
							isPassiveSupported() ? { passive: true } : false
						);
						return;
					}

					handleScroll();

					window.addEventListener(
						'scroll',
						handleScroll,
						isPassiveSupported() ? { passive: true } : false
					);
				};
			};

			init();
			window.addEventListener( 'resize', init, false );
		};

		forEachHtmlNodes( targets, apply );
	},
	false
);
