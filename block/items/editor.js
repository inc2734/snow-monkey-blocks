import { registerBlock } from '../../src/js/helper/helper';

import * as items from './block/';
import * as itemsItem from './block/item';
import * as itemsItemStandard from './block/item/standard';
import * as itemsItemBlockLink from './block/item/block-link';
import * as itemsItemBanner from './block/item/banner';

registerBlock( items );
registerBlock( itemsItem );
registerBlock( itemsItemStandard );
registerBlock( itemsItemBlockLink );
registerBlock( itemsItemBanner );
