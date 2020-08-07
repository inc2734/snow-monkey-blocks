export const getVideoId = ( videoURL ) => {
	const VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	const matches = videoURL.match( VIDEO_ID_REGEX );
	if ( !! matches ) {
		return matches[ 1 ];
	}
};
