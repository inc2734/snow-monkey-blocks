import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as panels from './';
import * as panelsItemVertical from './item/vertical';
import * as panelsItemHorizontal from './item/horizontal';

[
	panels,
	panelsItemVertical,
	panelsItemHorizontal,
].forEach( registerBlock );
