import $ from 'jquery';

export function apply( slider ) {
	const _config = slider.getAttribute( 'data-smb-thumbnail-gallery' );
	const config = !! _config ? JSON.parse( _config ) : {};

	config.slidesToShow = 1;
	config.slidesToScroll = 1;
	config.fade = true;
	config.dots = true;
	config.customPaging = ( thisSlider, i ) =>
		$( thisSlider.$slides[ i ] ).find( 'img' ).clone()[ 0 ];
	config.arrows = config.arrows || false;
	config.adaptiveHeight = true;
	config.rows = 0;

	config.autoplay = 0 < config.autoplaySpeed ? true : false;

	const init = () => {
		const slickList = $( slider ).find( '.slick-list' );
		slickList.prepend( $( slider ).find( '.slick-prev' ) );
		slickList.append( $( slider ).find( '.slick-next' ) );
	};

	$( slider ).on( 'init', init );
	$( slider ).slick( config );
}
