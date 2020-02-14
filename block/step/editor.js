import { registerBlock } from '../../src/js/helper/helper';

import * as step from './block';
import * as stepItemFree from './block/item/free';
import * as stepItemStandard from './block/item/standard';

registerBlock( step );
registerBlock( stepItemFree );
registerBlock( stepItemStandard );
