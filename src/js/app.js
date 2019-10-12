'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

import List from '../../block/list/list';
import Slider from '../../block/slider/slider';
import ThumbnailGallery from '../../block/thumbnail-gallery/thumbnail-gallery';
import CategoriesList from '../../block/categories-list/categories-list';
import BgVideo from '../../block/section-with-bgvideo/_bgvideo';
import Countdown from '../../block/countdown/countdown';

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
