'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

forEachHtmlNodes(
	document.getElementsByClassName( 'smb-contents-outline' ),
	( target ) => target.parentNode.removeChild( target )
);
