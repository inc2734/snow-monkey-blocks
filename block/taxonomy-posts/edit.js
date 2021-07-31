import { find, times } from 'lodash';

import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import { InspectorControls } from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	Spinner,
	TextareaControl,
	ToggleControl,
	TreeSelect,
} from '@wordpress/components';

import { toNumber, buildTermsTree } from '@smb/helper';

export default function ( { attributes, setAttributes } ) {
	const {
		taxonomy,
		termId,
		postsPerPage,
		layout,
		ignoreStickyPosts,
		smCols,
		noPostsText,
		itemTitleTagName,
		itemThumbnailSizeSlug,
		forceDisplayItemMeta,
		forceDisplayItemTerms,
		arrows,
		dots,
		interval,
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

	const onChangeSmCols = ( value ) =>
		setAttributes( {
			smCols: toNumber( value ),
		} );

	const onChangeItemThumbnailSizeSlug = ( value ) =>
		setAttributes( {
			itemThumbnailSizeSlug: value,
		} );

	const onChangeForceDisplayItemMeta = ( value ) =>
		setAttributes( {
			forceDisplayItemMeta: value,
		} );

	const onChangeForceDisplayItemTerms = ( value ) =>
		setAttributes( {
			forceDisplayItemTerms: value,
		} );

	const onChangeNoPostsText = ( value ) =>
		setAttributes( {
			noPostsText: value,
		} );

	const onChangeArrows = ( value ) =>
		setAttributes( {
			arrows: value,
		} );

	const onChangeDots = ( value ) =>
		setAttributes( {
			dots: value,
		} );

	const onChangeInterval = ( value ) =>
		setAttributes( {
			interval: toNumber( value, 0, 10 ),
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
								value: 'text2',
								label: __( 'Text 2', 'snow-monkey-blocks' ),
							},
							{
								value: 'panel',
								label: __( 'Panels', 'snow-monkey-blocks' ),
							},
							{
								value: 'carousel',
								label: sprintf(
									// translators: %1$s: Layout
									__(
										'Carousel (%1$s)',
										'snow-monkey-blocks'
									),
									__( 'Rich media', 'snow-monkey-blocks' )
								),
							},
						] }
					/>

					{ 'carousel' === layout && (
						<>
							<ToggleControl
								label={ __(
									'Display arrows',
									'snow-monkey-blocks'
								) }
								checked={ arrows }
								onChange={ onChangeArrows }
							/>

							<ToggleControl
								label={ __(
									'Display dots',
									'snow-monkey-blocks'
								) }
								checked={ dots }
								onChange={ onChangeDots }
							/>

							<RangeControl
								label={ __(
									'Autoplay Speed in seconds',
									'snow-monkey-blocks'
								) }
								help={ __(
									'If "0", no scroll.',
									'snow-monkey-blocks'
								) }
								value={ interval }
								onChange={ onChangeInterval }
								min="0"
								max="10"
							/>
						</>
					) }

					<BaseControl
						label={ __(
							'Title Tag of each items',
							'snow-monkey-blocks'
						) }
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
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickItemTitleTagName }
										key={ index }
									>
										{ itemTitleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __(
							'Images size of each items',
							'snow-monkey-blocks'
						) }
						value={ itemThumbnailSizeSlug }
						options={ itemThumbnailSizeSlugOption }
						onChange={ onChangeItemThumbnailSizeSlug }
					/>

					<ToggleControl
						label={ __(
							'Force display meta of each items',
							'snow-monkey-blocks'
						) }
						help={ __(
							"If it's already displayed, this setting will be ignored.",
							'snow-monkey-blocks'
						) }
						checked={ forceDisplayItemMeta }
						onChange={ onChangeForceDisplayItemMeta }
					/>

					<ToggleControl
						label={ __(
							'Force display category label of each items',
							'snow-monkey-blocks'
						) }
						help={ __(
							"If it's already displayed, this setting will be ignored.",
							'snow-monkey-blocks'
						) }
						checked={ forceDisplayItemTerms }
						onChange={ onChangeForceDisplayItemTerms }
					/>

					{ ( 'rich-media' === layout || 'panel' === layout ) && (
						<SelectControl
							label={ __(
								'Number of columns displayed on mobile device',
								'snow-monkey-blocks'
							) }
							value={ smCols }
							onChange={ onChangeSmCols }
							options={ [
								{
									value: 0,
									label: __(
										'Default',
										'snow-monkey-blocks'
									),
								},
								{
									value: 1,
									label: __(
										'1 column',
										'snow-monkey-blocks'
									),
								},
								{
									value: 2,
									label: __(
										'2 columns',
										'snow-monkey-blocks'
									),
								},
							] }
						/>
					) }

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

			{ ! selectedTerm || ! terms ? (
				<Placeholder
					icon="editor-ul"
					label={ __( 'Taxonomy posts', 'snow-monkey-blocks' ) }
				>
					<Spinner />
				</Placeholder>
			) : (
				<Disabled>
					<ServerSideRender
						block="snow-monkey-blocks/taxonomy-posts"
						attributes={ attributes }
					/>
				</Disabled>
			) }
		</>
	);
}
