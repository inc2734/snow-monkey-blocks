export const generateConfig = ( config ) => {
	return {
		slidesToShow: config.slidesToShow,
		slidesToScroll: config.slidesToScroll,
		mdSlidesToShow: config.mdSlidesToShow,
		mdSlidesToScroll: config.mdSlidesToScroll,
		smSlidesToShow: config.smSlidesToShow,
		smSlidesToScroll: config.smSlidesToScroll,
		dots: config.dots,
		arrows: config.arrows,
		speed: config.speed,
		autoplay: config.autoplay,
		autoplaySpeed: config.autoplaySpeed,
		fade: config.fade,
		rtl: config.rtl,
	};
};
