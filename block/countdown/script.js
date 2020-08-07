import forEachHtmlNodes from '@inc2734/for-each-html-nodes';
import { apply } from './countdown';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		const countdownNodes = document.querySelectorAll(
			'.smb-countdown__list'
		);
		forEachHtmlNodes( countdownNodes, apply );
	},
	false
);
