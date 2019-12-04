'use strict';

import {
	registerFormat,
	registerSidebar,
} from './helper/helper';

import * as badge from '../../format/badge';
import * as highlighter from '../../format/highlighter';
import * as removeFormatting from '../../format/remove-fomatting';

[
	badge,
	highlighter,
	removeFormatting,
].forEach( registerFormat );

import * as menu from '../../plugin/menu';

[
	menu,
].forEach( registerSidebar );
