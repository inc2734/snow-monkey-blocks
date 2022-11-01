import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { apply } from './bgvideo';

const videos = document.querySelectorAll(
	'.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe'
);

const init = () => {
	forEachHtmlNodes( videos, ( video ) => apply( video ) );
};

document.addEventListener( 'DOMContentLoaded', init, false );
document.addEventListener( 'load', init, false );
document.addEventListener( 'resize', init, false );
