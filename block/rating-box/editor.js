import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as ratingBox from './';
import * as ratingBoxItem from './item';

[
	ratingBox,
	ratingBoxItem,
].forEach( registerBlock );
