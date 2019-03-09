'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

import List from '../../block/list/_list.js';
import Slider from '../../block/slider/_slider.js';
import ThumbnailGallery from '../../block/thumbnail-gallery/_thumbnail-gallery.js';
import CategoriesList from '../../block/categories-list/_categories-list.js';
import BgVideo from '../../block/section-with-bgvideo/_bgvideo.js';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		new List();
		new Slider();
		new ThumbnailGallery();
		new CategoriesList();

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
		new CategoriesList();

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
		new CategoriesList();

		forEachHtmlNodes(
			document.querySelectorAll( '.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe' ),
			( video ) => new BgVideo( video )
		);
	},
	false
);
