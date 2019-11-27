'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

import List from '../../block/list/list';
import Slider from '../../block/slider/slider';
import ThumbnailGallery from '../../block/thumbnail-gallery/thumbnail-gallery';
import BgVideo from '../../block/section-with-bgvideo/_bgvideo';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		new List();
		new Slider();
		new ThumbnailGallery();

		forEachHtmlNodes(
			document.querySelectorAll( '.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe' ),
			( video ) => new BgVideo( video )
		);
	},
	false
);

window.addEventListener(
	'load',
	() => {
		forEachHtmlNodes(
			document.querySelectorAll( '.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe' ),
			( video ) => new BgVideo( video )
		);
	},
	false
);

window.addEventListener(
	'resize',
	() => {
		forEachHtmlNodes(
			document.querySelectorAll( '.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe' ),
			( video ) => new BgVideo( video )
		);
	},
	false
);
