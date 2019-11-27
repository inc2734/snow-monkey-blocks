import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as categoryList from './';

[
	categoryList,
].forEach( registerBlock );
