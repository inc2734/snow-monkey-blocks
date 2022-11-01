import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { apply } from './thumbnail-gallery';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const slider = document.querySelectorAll(
			'.smb-thumbnail-gallery__canvas'
		);
		forEachHtmlNodes( slider, apply );
	},
	false
);
