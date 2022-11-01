import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { apply } from './slider';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const sliders = document.querySelectorAll( '[data-smb-slider]' );
		forEachHtmlNodes( sliders, apply );
	},
	false
);
