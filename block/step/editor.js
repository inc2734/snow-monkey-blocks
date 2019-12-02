import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as step from './';
import * as stepItemFree from './item/free';
import * as stepItemStandard from './item/standard';

[
	step,
	stepItemFree,
	stepItemStandard,
].forEach( registerBlock );
