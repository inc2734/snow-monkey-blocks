'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

forEachHtmlNodes(
	document.getElementsByClassName( 'smb-like-me-box' ),
	( target ) => target.parentNode.removeChild( target )
);
