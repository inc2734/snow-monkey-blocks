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

	const categories = allBlockCategories.map( ( category ) => {
		if ( Object.values( smbConfigCategories ).some( ( slug ) => slug === category.slug ) ) {
			return category;
		}
	} );

	const resultCategories = categories.filter( ( category ) => category ).map( ( category ) => {
		return (
			<PanelBody
				key={ category.slug }
				title={ category.title }
			>
				<BlockPanel
					setupResultDetail={ setupResultDetail }
					slug={ category.slug }
				/>
			</PanelBody>
		);
	} );

	if ( resultCategories ) {
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
