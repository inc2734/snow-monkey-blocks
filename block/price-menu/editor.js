import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as priceMenu from './';
import * as priceMenuItem from './item';

[
	priceMenu,
	priceMenuItem,
].forEach( registerBlock );
