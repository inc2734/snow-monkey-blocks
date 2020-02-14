'use strict';

import {
	toNumber,
	buildTermsTree,
} from '../../../src/js/helper/helper';

import {
	find,
} from 'lodash';

import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	BaseControl,
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TextControl,
	TreeSelect,
	Placeholder,
	Spinner,
} from '@wordpress/components';

import {
	useSelect,
} from '@wordpress/data';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

import ServerSideRender from '@wordpress/server-side-render';

export default function( { attributes, setAttributes } ) {
	const { taxonomy, termId, postsPerPage, layout, ignoreStickyPosts, myAnchor } = attributes;

	const { taxonomiesTerms, taxonomies } = useSelect( ( select ) => {
		const { getTaxonomies, getEntityRecords } = select( 'core' );
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		const shownTaxonomies = allTaxonomies.filter( ( _taxonomy ) => _taxonomy.visibility.show_ui );

		const _taxonomiesTerms = shownTaxonomies.map( ( _taxonomy ) => {
			const terms = getEntityRecords( 'taxonomy', _taxonomy.slug, { per_page: -1 } ) || [];
			if ( 0 < terms.length ) {
				return {
					taxonomy: _taxonomy.slug,
					terms,
				};
			}
			return {};
		} ).filter( ( taxonomyTerms ) => taxonomyTerms );

		return {
			taxonomiesTerms: _taxonomiesTerms,
			taxonomies: shownTaxonomies,
		};
	}, [] );

	const terms = find( taxonomiesTerms, { taxonomy } );
	const selectedTerm = !! terms ? find( terms.terms, [ 'id', toNumber( termId ) ] ) : [];

	const Loading = () => {
		return (
			<Placeholder
				icon="editor-ul"
				label={ __( 'Taxonomy posts', 'snow-monkey-blocks' ) }
			>
				<Spinner />
			</Placeholder>
		);
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					{ ! taxonomiesTerms.length && (
						<BaseControl label={ __( 'Loading taxonomies...', 'snow-monkey-blocks' ) } id="snow-monkey-blocks/taxonomy-posts/taxonomies">
							<Spinner />
						</BaseControl>
					) }
					{ taxonomiesTerms.map( ( taxonomyTerms ) => {
						const _taxonomy = find( taxonomies, [ 'slug', taxonomyTerms.taxonomy ] );
						return !! _taxonomy && (
							<TreeSelect
								key={ `${ _taxonomy.slug }-${ termId }` }
								label={ _taxonomy.name }
								noOptionLabel="-"
								onChange={ ( value ) => setAttributes( { taxonomy: _taxonomy.slug, termId: toNumber( value ) } ) }
								selectedId={ termId }
								tree={ buildTermsTree( taxonomyTerms.terms ) }
							/>
						);
					} ) }

					<RangeControl
						label={ __( 'Number of posts', 'snow-monkey-blocks' ) }
						value={ postsPerPage }
						onChange={ ( value ) => setAttributes( { postsPerPage: toNumber( value, 1, 12 ) } ) }
						min="1"
						max="12"
					/>

					<SelectControl
						label={ __( 'Layout', 'snow-monkey-blocks' ) }
						value={ layout }
						onChange={ ( value ) => setAttributes( { layout: value } ) }
						options={ [
							{
								value: 'rich-media',
								label: __( 'Rich media', 'snow-monkey-blocks' ),
							},
							{
								value: 'simple',
								label: __( 'Simple', 'snow-monkey-blocks' ),
							},
							{
								value: 'text',
								label: __( 'Text', 'snow-monkey-blocks' ),
							},
							{
								value: 'panel',
								label: __( 'Panels', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<ToggleControl
						label={ __( 'Ignore sticky posts', 'snow-monkey-blocks' ) }
						checked={ ignoreStickyPosts }
						onChange={ ( value ) => setAttributes( { ignoreStickyPosts: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor', 'snow-monkey-blocks' ) }
					help={ __( 'Anchors lets you link directly to a section on a page.', 'snow-monkey-blocks' ) }
					value={ myAnchor || '' }
					onChange={ ( value ) => setAttributes( { myAnchor: value.replace( /[\s#]/g, '-' ) } ) }
				/>
			</InspectorAdvancedControls>

			{ ! selectedTerm || ! terms ? (
				<Loading />
			) : (
				<ServerSideRender
					block="snow-monkey-blocks/taxonomy-posts"
					attributes={ attributes }
				/>
			) }
		</Fragment>
	);
}
