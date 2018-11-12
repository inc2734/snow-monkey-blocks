'use strict';

const { get } = lodash;

export default function generateUpdatedAttribute( parent, index, attribute, value ) {
	const newParent = [ ...parent ];
	newParent[ index ] = get( newParent, index, {} );
	if ( null === newParent[ index ] ) {
		newParent[ index ] = {};
	}
	newParent[ index ][ attribute ] = value;
	return newParent;
}
