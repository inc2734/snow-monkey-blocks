'use strict';

import List from '../../block/list/_list.js';
import Slider from '../../block/slider/_slider.js';
import ThumbnailGallery from '../../block/thumbnail-gallery/_thumbnail-gallery.js';
import CategoriesList from '../../block/categories-list/_categories-list.js';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		new List();
		new Slider();
		new ThumbnailGallery();
		new CategoriesList();
	},
	false
);

window.addEventListener(
	'load',
	() => {
		new CategoriesList();
	},
	false
);

window.addEventListener(
	'resize',
	() => {
		new CategoriesList();
	},
	false
);
