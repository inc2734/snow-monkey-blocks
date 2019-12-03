import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as testimonial from './';
import * as testimonialItem from './item';

[
	testimonial,
	testimonialItem,
].forEach( registerBlock );
