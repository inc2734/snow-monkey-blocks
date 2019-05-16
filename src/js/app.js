'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

import List from '../../block/list/_list.js';
import Slider from '../../block/slider/_slider.js';
import ThumbnailGallery from '../../block/thumbnail-gallery/_thumbnail-gallery.js';
import CategoriesList from '../../block/categories-list/_categories-list.js';
import BgVideo from '../../block/section-with-bgvideo/_bgvideo.js';
import Countdown from '../../block/countdown/_countdown.js';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		new List();
		new Slider();
		new ThumbnailGallery();
		new Countdown();

		forEachHtmlNodes(
			document.querySelectorAll( '.smb-categories-list__list' ),
			( categoryList ) => new CategoriesList( categoryList )
		);

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
			document.querySelectorAll( '.smb-categories-list__list' ),
			( categoryList ) => new CategoriesList( categoryList )
		);

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
			document.querySelectorAll( '.smb-categories-list__list' ),
			( categoryList ) => new CategoriesList( categoryList )
		);

		forEachHtmlNodes(
			document.querySelectorAll( '.smb-section-with-bgimage > .smb-section-with-bgimage__bgimage > iframe' ),
			( video ) => new BgVideo( video )
		);
	},
	false
);
