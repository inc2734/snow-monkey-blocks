import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as thumbnailGallery from './';
import * as thumbnailGalleryItem from './item';

[
	thumbnailGallery,
	thumbnailGalleryItem,
].forEach( registerBlock );
