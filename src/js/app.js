'use strict';

import Slider from '../../block/slider/slider';
import ThumbnailGallery from '../../block/thumbnail-gallery/thumbnail-gallery';

document.addEventListener(
	'DOMContentLoaded',
	() => {
		new Slider();
		new ThumbnailGallery();
	},
	false
);
