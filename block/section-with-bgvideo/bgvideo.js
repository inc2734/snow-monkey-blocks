export function apply( video ) {
	const wrapper = video.parentNode;
	const aspectRatio = video.height / video.width; // e.g. 0.5625
	const wrapperAspectRatio = wrapper.offsetHeight / wrapper.offsetWidth;

	video.style.height = '';
	video.style.width = '';

	if ( wrapperAspectRatio > aspectRatio ) {
		video.style.width = `${ wrapper.offsetHeight / aspectRatio }px`;
	} else {
		video.style.height = `${ wrapper.offsetWidth * aspectRatio }px`;
	}
}
