'use strict';

import toNumber from '../../src/js/helper/to-number';
import buildTermsTree from '../../src/js/helper/build-terms-tree';

const { find } = lodash;
const { InspectorControls, InspectorAdvancedControls } = wp.editor;
const { PanelBody, SelectControl, RangeControl, ServerSideRender, ToggleControl, TextControl, TreeSelect } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

export const edit = ( props ) => {
	const { attributes, setAttributes, withSelect } = props;
	const { termId, postsPerPage, layout, ignoreStickyPosts, myAnchor } = attributes;
	const { taxonomiesTerms } = withSelect;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Taxonomy Posts Settings', 'snow-monkey-blocks' ) }>
					{ Object.keys( taxonomiesTerms ).map( ( taxnomyName, i ) => {
						return (
							<TreeSelect
								key={ i }
								label={ taxnomyName }
								noOptionLabel="-"
								onChange={ ( value ) => {
									const term = find( taxonomiesTerms[ taxnomyName ], ( _term ) => toNumber( value ) === toNumber( _term.id ) );
									setAttributes( {
										taxonomy: !! term ? term.taxonomy : null,
										termId: toNumber( value ),
									} );
								} }
								selectedId={ termId }
								tree={ buildTermsTree( taxonomiesTerms[ taxnomyName ] ) }
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

			<ServerSideRender
				block="snow-monkey-blocks/taxonomy-posts"
				attributes={ attributes }
			/>
		</Fragment>
	);
};
