'use strict';

import BlockTemplatePanel from './block-template-panel';

import apiFetch from '@wordpress/api-fetch';

import {
	PanelBody,
	Spinner,
} from '@wordpress/components';

import {
	Fragment,
	useState,
} from '@wordpress/element';

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

		const newResultCategories = [];
		categories.map( ( category ) => {
			if ( ! smb.isPro && category.isPro ) {
				return;
			}

			newResultCategories.push(
				<PanelBody
					title={ category.title }
				>
					<BlockTemplatePanel
						slug={ category.slug }
					/>
				</PanelBody>
			);
		} );

		setResultCategories( newResultCategories );
	};

	setupResultCategories();

	if ( resultCategories ) {
		return (
			<Fragment>
				{ resultCategories }
			</Fragment>
		);
	}

	return (
		<div className="smb-menu__template-part__loading">
			<Spinner />
		</div>
	);
}
