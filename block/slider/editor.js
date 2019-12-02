import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as slider from './';
import * as sliderItem from './item';

[
	slider,
	sliderItem,
].forEach( registerBlock );
