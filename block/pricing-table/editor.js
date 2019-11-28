import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as pricingTable from './';
import * as pricingTableItem from './item';

[
	pricingTable,
	pricingTableItem,
].forEach( registerBlock );
