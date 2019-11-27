import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as items from './';
import * as itemsItem from './item';
import * as itemsItemStandard from './item/standard';
import * as itemsItemBlockLink from './item/block-link';
import * as itemsItemBanner from './item/banner';

[
	items,
	itemsItem,
	itemsItemStandard,
	itemsItemBlockLink,
	itemsItemBanner,
].forEach( registerBlock );
