'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

import BgVideo from './bgvideo';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		forEachHtmlNodes(
			document.querySelectorAll(
				'.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe'
			),
			( video ) => new BgVideo( video )
		);
	},
	false
);

window.addEventListener(
	'load',
	() => {
		forEachHtmlNodes(
			document.querySelectorAll(
				'.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe'
			),
			( video ) => new BgVideo( video )
		);
	},
	false
);

window.addEventListener(
	'resize',
	() => {
		forEachHtmlNodes(
			document.querySelectorAll(
				'.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe'
			),
			( video ) => new BgVideo( video )
		);
	},
	false
);
