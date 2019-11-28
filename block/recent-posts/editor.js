import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as recentPosts from './';

[
	recentPosts,
].forEach( registerBlock );
