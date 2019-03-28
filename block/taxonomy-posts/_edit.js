'use strict';

import toNumber from '../../src/js/helper/to-number';
import buildTermsTree from '../../src/js/helper/build-terms-tree';

const { find } = lodash;
const { InspectorControls, InspectorAdvancedControls } = wp.editor;
const { PanelBody, SelectControl, RangeControl, ServerSideRender, ToggleControl, TextControl, TreeSelect, Dashicon } = wp.components;
const { Fragment, Component } = wp.element;
const { __ } = wp.i18n;

export class edit extends Component {
	shouldComponentUpdate( nextProps ) {
		const nextTaxonomies = nextProps.withSelect.taxonomies || {};
		const currentTaxonomies = this.props.withSelect.taxonomies || {};
		const nextTaxonomiesTerms = nextProps.withSelect.taxonomiesTerms || {};
		const currentTaxonomiesTerms = this.props.withSelect.taxonomiesTerms || {};

		return (
			Object.keys( nextTaxonomies ).length !== Object.keys( currentTaxonomies ).length ||
			Object.keys( nextTaxonomiesTerms ).length !== Object.keys( currentTaxonomiesTerms ).length ||
			nextProps.attributes !== this.props.attributes
		);
	}

	render() {
		const { attributes, setAttributes, withSelect } = this.props;
		const { taxonomy, termId, postsPerPage, layout, ignoreStickyPosts, myAnchor } = attributes;
		const { taxonomiesTerms, taxonomies } = withSelect;

		const View = () => {
			const selectedTerm = find( taxonomiesTerms[ taxonomy ], [ 'id', toNumber( termId ) ] );
			if ( ! selectedTerm || ! selectedTerm.count ) {
				return (
					<div className="components-placeholder">
						<div className="components-placeholder__label">
							<Dashicon icon="editor-ul" />
							{ __( 'Taxonomy posts', 'snow-monkey-blocks' ) }
						</div>
						<div className="components-placeholder__instructions">
							{ __( 'Loading posts or No posts.', 'snow-monkey-blocks' ) }
						</div>
					</div>
				);
			}

			return (
				<ServerSideRender
					block="snow-monkey-blocks/taxonomy-posts"
					attributes={ attributes }
				/>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Taxonomy Posts Settings', 'snow-monkey-blocks' ) }>
						{ Object.keys( taxonomiesTerms ).map( ( taxnomySlug ) => {
							const _taxonomy = find( taxonomies, [ 'slug', taxnomySlug ] );
							return !! _taxonomy && (
								<TreeSelect
									key={ `${ taxnomySlug }-${ termId }` }
									label={ _taxonomy.name }
									noOptionLabel="-"
									onChange={ ( value ) => setAttributes( { taxonomy: taxnomySlug, termId: toNumber( value ) } ) }
									selectedId={ termId }
									tree={ buildTermsTree( taxonomiesTerms[ taxnomySlug ] ) }
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

				<View />
			</Fragment>
		);
	}
}
