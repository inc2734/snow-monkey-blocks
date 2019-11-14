'use strict';

import { toNumber, buildTermsTree } from '../../src/js/helper/helper';

import {
	find,
	filter,
} from 'lodash';

import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TextControl,
	TreeSelect,
	Placeholder,
	Spinner,
} from '@wordpress/components';

import ServerSideRender from '@wordpress/server-side-render';

import {
	Fragment,
	Component,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default class TaxonomyPosts extends Component {
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

			const getSelectedTermCount = ( term, count = 0 ) => {
				count += term.count;
				const childTerms = filter( taxonomiesTerms[ taxonomy ], [ 'parent', toNumber( term.id ) ] );
				const reducer = ( currentValue, childTerm ) => currentValue + getSelectedTermCount( childTerm, count );
				return childTerms.reduce( reducer, count );
			};

			const selectedTermCount = ( !! selectedTerm ) ? getSelectedTermCount( selectedTerm ) : 0;

			if ( ! selectedTerm || ! selectedTermCount ) {
				return (
					<Placeholder
						icon="editor-ul"
						label={ __( 'Taxonomy posts', 'snow-monkey-blocks' ) }
					>
						{ ! selectedTerm &&
							<Spinner />
						}
						{ !! selectedTerm && ! selectedTermCount &&
							__( 'No posts found.' )
						}
					</Placeholder>
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
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
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
