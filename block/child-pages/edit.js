import { times } from 'lodash';

import {
	BaseControl,
	Button,
	Disabled,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import ServerSideRender from '@wordpress/server-side-render';

import { toNumber } from '@smb/helper';

export default function ( { attributes, setAttributes } ) {
	const {
		title,
		layout,
		smCols,
		itemTitleTagName,
		itemThumbnailSizeSlug,
		arrows,
		dots,
		interval,
	} = attributes;

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

	const itemTitleTagNames = [ 'h2', 'h3', 'h4' ];

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLayout = ( value ) =>
		setAttributes( {
			layout: value,
		} );

	const onChangeSmCols = ( value ) =>
		setAttributes( {
			smCols: toNumber( value ),
		} );

	const onChangeItemThumbnailSizeSlug = ( value ) =>
		setAttributes( {
			itemThumbnailSizeSlug: value,
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
					<TextControl
						label={ __( 'Title', 'snow-monkey-blocks' ) }
						value={ title }
						placeholder={ __(
							'Child pages',
							'snow-monkey-blocks'
						) }
						onChange={ onChangeTitle }
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
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/child-pages/item-title-tag-name"
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
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						value={ itemThumbnailSizeSlug }
						options={ itemThumbnailSizeSlugOption }
						onChange={ onChangeItemThumbnailSizeSlug }
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
				</PanelBody>
			</InspectorControls>

			<Disabled>
				<ServerSideRender
					block="snow-monkey-blocks/child-pages"
					attributes={ attributes }
				/>
			</Disabled>
		</>
	);
}
