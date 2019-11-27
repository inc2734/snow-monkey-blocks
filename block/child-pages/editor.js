import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as childPages from './';

[
	childPages,
].forEach( registerBlock );
