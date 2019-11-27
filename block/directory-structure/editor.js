import {
	registerBlock,
} from '../../src/js/helper/helper';

import * as directoryStructure from './';
import * as directoryStructureItemDirectory from './item/directory';
import * as directoryStructureItemFile from './item/file';

[
	directoryStructure,
	directoryStructureItemDirectory,
	directoryStructureItemFile,
].forEach( registerBlock );
