'use strict';

import blockConfig from '../../src/js/config/block';
import BlockPanel from './block-panel';

import {
	getCategories,
} from '@wordpress/blocks';

import {
	PanelBody,
	Spinner,
} from '@wordpress/components';

import {
	Fragment,
} from '@wordpress/element';

export default function( { setupResultDetail } ) {
	const allBlockCategories = getCategories();
	const smbConfigCategories = blockConfig.blockCategories;

	const categories = [];
	allBlockCategories.map( ( category ) => {
		Object.keys( smbConfigCategories ).map( ( name ) => {
			if ( category.slug === smbConfigCategories[ name ] ) {
				categories.push( category );
			}
		} );
	} );

	const resultCategories = [];
	categories.map( ( category ) => {
		resultCategories.push(
			<PanelBody
				title={ category.title }
			>
				<BlockPanel
					setupResultDetail={ setupResultDetail }
					slug={ category.slug }
				/>
			</PanelBody>
		);
	} );

	if ( null !== resultCategories ) {
		return (
			<Fragment>
				{ resultCategories }
			</Fragment>
		);
	}

	return (
		<Spinner />
	);
}
