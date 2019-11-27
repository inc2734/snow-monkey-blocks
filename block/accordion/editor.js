import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as accordion from './';
import * as accordionItem from './item';

[
	accordion,
	accordionItem,
].forEach( registerBlock );
