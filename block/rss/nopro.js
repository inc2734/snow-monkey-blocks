'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

forEachHtmlNodes( document.getElementsByClassName( 'smb-rss' ), ( target ) =>
	target.parentNode.removeChild( target )
);
