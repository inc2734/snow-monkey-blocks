import { find, times } from 'lodash';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

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
	TextareaControl,
	TreeSelect,
	Placeholder,
	Spinner,
	Button,
} from '@wordpress/components';

import { toNumber, buildTermsTree } from '../../../src/js/helper/helper';

export default function( { attributes, setAttributes } ) {
	const {
		taxonomy,
		termId,
		postsPerPage,
		layout,
		ignoreStickyPosts,
		noPostsText,
		itemTitleTagName,
		itemThumbnailSizeSlug,
		myAnchor,
	} = attributes;

	const { taxonomiesTerms, taxonomies } = useSelect( ( select ) => {
		const { getTaxonomies, getEntityRecords } = select( 'core' );
		const allTaxonomies = getTaxonomies( { per_page: -1 } ) || [];
		const shownTaxonomies = allTaxonomies.filter(
			( _taxonomy ) => _taxonomy.visibility.show_ui
		);

		const _taxonomiesTerms = shownTaxonomies
			.map( ( _taxonomy ) => {
				const terms =
					getEntityRecords( 'taxonomy', _taxonomy.slug, {
						per_page: -1,
					} ) || [];
				if ( 0 < terms.length ) {
					return {
						taxonomy: _taxonomy.slug,
						terms,
					};
				}
				return {};
			} )
			.filter( ( taxonomyTerms ) => taxonomyTerms );

		return {
			taxonomiesTerms: _taxonomiesTerms,
			taxonomies: shownTaxonomies,
		};
	}, [] );

	const itemThumbnailSizeSlugOption = useSelect( ( select ) => {
		const { getSettings } = select( 'core/block-editor' );
		const { imageSizes } = getSettings();

		return imageSizes.map( ( imageSize ) => {
			return {
				value: imageSize.slug,
				label: imageSize.name,
			};
		} );
	}, [] );

	const terms = find( taxonomiesTerms, { taxonomy } );
	const selectedTerm = !! terms
		? find( terms.terms, [ 'id', toNumber( termId ) ] )
		: [];

	const itemTitleTagNames = [ 'h2', 'h3', 'h4' ];

	const onChangePostsPerPage = ( value ) =>
		setAttributes( {
			postsPerPage: toNumber( value, 1, 12 ),
		} );

	const onChangeLayout = ( value ) =>
		setAttributes( {
			layout: value,
		} );

	const onChangeIgnoreStickyPosts = ( value ) =>
		setAttributes( {
			ignoreStickyPosts: value,
		} );

	const onChangeItemThumbnailSizeSlug = ( value ) =>
		setAttributes( {
			itemThumbnailSizeSlug: value,
		} );

	const onChangeNoPostsText = ( value ) =>
		setAttributes( {
			noPostsText: value,
		} );

	const onChangeMyAnchor = ( value ) =>
		setAttributes( {
			myAnchor: value.replace( /[\s#]/g, '-' ),
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					{ ! taxonomiesTerms.length && (
						<BaseControl
							label={ __(
								'Loading taxonomies…',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/taxonomy-posts/taxonomies"
						>
							<Spinner />
						</BaseControl>
					) }
					{ taxonomiesTerms.map( ( taxonomyTerms ) => {
						const _taxonomy = find( taxonomies, [
							'slug',
							taxonomyTerms.taxonomy,
						] );

						const onChangeTaxonomyTermId = ( value ) => {
							setAttributes( {
								taxonomy: _taxonomy.slug,
								termId: toNumber( value ),
							} );
						};

						return (
							!! _taxonomy && (
								<TreeSelect
									key={ `${ _taxonomy.slug }-${ termId }` }
									label={ _taxonomy.name }
									noOptionLabel="-"
									onChange={ onChangeTaxonomyTermId }
									selectedId={ termId }
									tree={ buildTermsTree(
										taxonomyTerms.terms
									) }
								/>
							)
						);
					} ) }

					<RangeControl
						label={ __( 'Number of posts', 'snow-monkey-blocks' ) }
						value={ postsPerPage }
						onChange={ onChangePostsPerPage }
						min="1"
						max="12"
					/>

					<SelectControl
						label={ __( 'Layout', 'snow-monkey-blocks' ) }
						value={ layout }
						onChange={ onChangeLayout }
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

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/taxonomy-posts/item-title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( itemTitleTagNames.length, ( index ) => {
								const onClickItemTitleTagName = () =>
									setAttributes( {
										itemTitleTagName:
											itemTitleTagNames[ index ],
									} );

								const isPrimary =
									itemTitleTagName ===
									itemTitleTagNames[ index ];
								return (
									<Button
										isDefault={ ! isPrimary }
										isPrimary={ isPrimary }
										onClick={ onClickItemTitleTagName }
									>
										{ itemTitleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						value={ itemThumbnailSizeSlug }
						options={ itemThumbnailSizeSlugOption }
						onChange={ onChangeItemThumbnailSizeSlug }
					/>

					<ToggleControl
						label={ __(
							'Ignore sticky posts',
							'snow-monkey-blocks'
						) }
						checked={ ignoreStickyPosts }
						onChange={ onChangeIgnoreStickyPosts }
					/>

					<TextareaControl
						label={ __(
							'Text if no posts matched',
							'snow-monkey-blocks'
						) }
						help={ __( 'Allow HTML', 'snow-monkey-blocks' ) }
						value={ noPostsText || '' }
						onChange={ onChangeNoPostsText }
					/>
				</PanelBody>
			</InspectorControls>

			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor', 'snow-monkey-blocks' ) }
					help={ __(
						'Anchors lets you link directly to a section on a page.',
						'snow-monkey-blocks'
					) }
					value={ myAnchor || '' }
					onChange={ onChangeMyAnchor }
				/>
			</InspectorAdvancedControls>

			{ ! selectedTerm || ! terms ? (
				<Placeholder
					icon="editor-ul"
					label={ __( 'Taxonomy posts', 'snow-monkey-blocks' ) }
				>
					<Spinner />
				</Placeholder>
			) : (
				<ServerSideRender
					block="snow-monkey-blocks/taxonomy-posts"
					attributes={ attributes }
					className="components-disabled"
				/>
			) }
		</>
	);
}
