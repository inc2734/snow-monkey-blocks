import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as faq from './';
import * as faqItem from './item';

[
	faq,
	faqItem,
].forEach( registerBlock );
