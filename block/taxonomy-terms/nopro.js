'use strict';

import forEachHtmlNodes from '@inc2734/for-each-html-nodes';

forEachHtmlNodes(
	document.getElementsByClassName( 'smb-taxonomy-terms' ),
	( target ) => target.parentNode.removeChild( target )
);
