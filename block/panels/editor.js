import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as panels from './block';
import * as panelsItemVertical from './block/item/vertical';
import * as panelsItemHorizontal from './block/item/horizontal';

registerBlock( panels );
registerBlock( panelsItemVertical );
registerBlock( panelsItemHorizontal );
