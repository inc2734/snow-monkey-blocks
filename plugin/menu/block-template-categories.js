'use strict';

import apiFetch from '@wordpress/api-fetch';
import { PanelBody, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';

import BlockTemplatePanel from './block-template-panel';

export default function() {
	const [ categories, setCategories ] = useState( null );
	const [ resultCategories, setResultCategories ] = useState( null );

	const setupCategories = () => {
		if ( categories ) {
			return;
		}

		apiFetch( {
			path: '/snow-monkey-blocks/v5/block-template-categories/',
			method: 'GET',
			parse: true,
		} ).then( ( result ) => {
			setCategories( result );
		} );
	};

	const setupResultCategories = () => {
		if ( resultCategories ) {
			return resultCategories;
		}

		setupCategories();
		if ( ! categories ) {
			return;
		}

		const newResultCategories = categories
			.map( ( category ) => {
				if ( smb.isPro || ! category.isPro ) {
					return (
						<PanelBody title={ category.title }>
							<BlockTemplatePanel slug={ category.slug } />
						</PanelBody>
					);
				}
				return null;
			} )
			.filter( ( category ) => category );

		setResultCategories(
			newResultCategories.filter( ( resultCategory ) => resultCategory )
		);
	};

	setupResultCategories();

	if ( resultCategories ) {
		return <>{ resultCategories }</>;
	}

	return (
		<div className="smb-menu__template-part__loading">
			<Spinner />
		</div>
	);
}
