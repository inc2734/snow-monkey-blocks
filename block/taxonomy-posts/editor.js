import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as taxonomyPosts from './';

[
	taxonomyPosts,
].forEach( registerBlock );
