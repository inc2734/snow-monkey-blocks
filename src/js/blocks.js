'use strict';

import { registerFormat, registerSidebar } from './helper/helper';

import * as badge from '../../format/badge';
import * as highlighter from '../../format/highlighter';
import * as removeFormatting from '../../format/remove-fomatting';

registerFormat( badge );
registerFormat( highlighter );
registerFormat( removeFormatting );

import * as menu from '../../plugin/menu';

registerSidebar( menu );
