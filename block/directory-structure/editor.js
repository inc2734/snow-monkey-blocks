import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as directoryStructure from './block';
import * as directoryStructureItemDirectory from './block/item/directory';
import * as directoryStructureItemFile from './block/item/file';

registerBlock( directoryStructure );
registerBlock( directoryStructureItemDirectory );
registerBlock( directoryStructureItemFile );
