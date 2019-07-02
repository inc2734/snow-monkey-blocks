'use strict';

export default function getColumnSize( imageColumnSize ) {
	let textColumnWidth = '1-3';
	let imageColumnWidth = '2-3';

	if ( 75 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-4';
		imageColumnWidth = '3-4';
	} else if ( 66 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-3';
		imageColumnWidth = '2-3';
	} else if ( 50 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-2';
		imageColumnWidth = '1-2';
	} else if ( 33 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '2-3';
		imageColumnWidth = '1-3';
	} else if ( 25 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '3-4';
		imageColumnWidth = '1-4';
	}

	return {
		textColumnWidth: textColumnWidth,
		imageColumnWidth: imageColumnWidth,
	};
}
