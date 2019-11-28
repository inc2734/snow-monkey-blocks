'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

forEachHtmlNodes(
	document.getElementsByClassName( 'smb-recent-posts' ),
	( target ) => target.parentNode.removeChild( target )
);
