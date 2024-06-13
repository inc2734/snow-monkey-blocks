import classnames from 'classnames';

import {
	BaseControl,
	Popover,
	RangeControl,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';
import { toNumber } from '@smb/helper';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		title,
		lede,
		url,
		target,
		blur,
		textColor,
		maskColor,
		maskGradientColor,
		maskOpacity,
		imageSize,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		contentsAlignment,
		contentPosition,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = target === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const { imageSizes, image } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				image:
					imageID && isSelected
						? select( 'core' ).getMedia( imageID, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},

		[ isSelected, imageID, clientId ]
	);

	const imageSizeOptions = imageSizes
		.filter(
			( { slug } ) => image?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const classes = classnames( 'c-row__col', className );
	const bannerClasses = classnames(
		'smb-items__banner',
		`smb-items__banner--${ imageSize }`,
		{
			'smb-items__banner--blur': blur,
			[ `smb-items__banner--${ contentsAlignment }` ]:
				!! contentsAlignment,
		}
	);

	const styles = {
		'--smb-items--banner--color': textColor || undefined,
		'--smb-items--banner--mask-color': maskColor || undefined,
		'--smb-items--banner--mask-image': maskGradientColor || undefined,
		'--smb-items--banner--mask-opacity': String( maskOpacity ),
	};

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

	const unlink = () => {
		setAttributes( {
			url: undefined,
			target: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>

				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							imageURL !== metadata.attributes.imageURL.default
						}
						isShownByDefault
						label={ __( 'Image', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								imageID: metadata.attributes.imageID.default,
								imageURL: metadata.attributes.imageURL.default,
								imageAlt: metadata.attributes.imageAlt.default,
								imageWidth:
									metadata.attributes.imageWidth.default,
								imageHeight:
									metadata.attributes.imageHeight.default,
							} )
						}
					>
						<BaseControl
							label={ __( 'Image', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/items-banner/image"
						>
							<div className="smb-image-size-control">
								<Figure
									src={ imageURL }
									id={ imageID }
									alt={ imageAlt }
									width={ imageWidth }
									height={ imageHeight }
									onSelect={ ( media ) => {
										const newImageSizeSlug = !! media
											?.sizes?.[ imageSizeSlug ]
											? imageSizeSlug
											: DEFAULT_MEDIA_SIZE_SLUG;
										const newImageUrl =
											media?.sizes?.[ newImageSizeSlug ]
												?.url;
										const newImageWidth =
											media?.sizes?.[ newImageSizeSlug ]
												?.width;
										const newImageHeight =
											media?.sizes?.[ newImageSizeSlug ]
												?.height;

										setAttributes( {
											imageURL: newImageUrl || media.url,
											imageID: media.id,
											imageAlt: media.alt,
											imageWidth:
												newImageWidth || media.width,
											imageHeight:
												newImageHeight || media.height,
											imageSizeSlug: newImageSizeSlug,
										} );
									} }
									onSelectURL={ ( newURL ) => {
										if ( newURL !== imageURL ) {
											setAttributes( {
												imageURL: newURL,
												imageID: 0,
												mediaSizeSlug:
													DEFAULT_MEDIA_SIZE_SLUG,
											} );
										}
									} }
									onRemove={ () =>
										setAttributes( {
											imageID:
												metadata.attributes.imageID
													.default,
											imageURL:
												metadata.attributes.imageURL
													.default,
											imageAlt:
												metadata.attributes.imageAlt
													.default,
											imageWidth:
												metadata.attributes.imageWidth
													.default,
											imageHeight:
												metadata.attributes.imageHeight
													.default,
										} )
									}
									allowedTypes={ ALLOWED_TYPES }
								/>
							</div>
						</BaseControl>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							imageSize !== metadata.attributes.imageSize.default
						}
						isShownByDefault
						label={ __(
							'Image aspect ratio',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								imageSize:
									metadata.attributes.imageSize.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Image aspect ratio',
								'snow-monkey-blocks'
							) }
							value={ imageSize }
							options={ [
								{
									value: 'default',
									label: __(
										'Fit to the image',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'contents',
									label: __(
										'Fit to the contents',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'standard',
									label: __( '4:3', 'snow-monkey-blocks' ),
								},
								{
									value: 'wide',
									label: __( '16:9', 'snow-monkey-blocks' ),
								},
								{
									value: 'vstandard',
									label: __( '3:4', 'snow-monkey-blocks' ),
								},
								{
									value: 'vwide',
									label: __( '9:16', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									imageSize: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ 0 < imageSizeOptions.length && (
						<ResolutionTool
							defaultValue={
								metadata.attributes.imageSizeSlug.default
							}
							value={ imageSizeSlug }
							options={ imageSizeOptions }
							onChange={ ( value ) => {
								const newImageUrl =
									image?.media_details?.sizes?.[ value ]
										?.source_url;
								const newImageWidth =
									image?.media_details?.sizes?.[ value ]
										?.width;
								const newImageHeight =
									image?.media_details?.sizes?.[ value ]
										?.height;

								setAttributes( {
									imageURL: newImageUrl,
									imageWidth: newImageWidth,
									imageHeight: newImageHeight,
									imageSizeSlug: value,
								} );
							} }
						/>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							blur !== metadata.attributes.blur.default
						}
						isShownByDefault
						label={ __(
							'Image aspect ratio',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								blur: metadata.attributes.blur.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Shade off', 'snow-monkey-blocks' ) }
							checked={ blur }
							onChange={ ( value ) =>
								setAttributes( {
									blur: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel label={ __( 'Overlay', 'snow-monkey-blocks' ) }>
					<div className="smb-color-gradient-settings-dropdown">
						<ColorGradientSettingsDropdown
							settings={ [
								{
									label: __( 'Color', 'snow-monkey-blocks' ),
									colorValue: maskColor,
									onColorChange: ( value ) =>
										setAttributes( {
											maskColor: value,
										} ),
									gradientValue: maskGradientColor,
									onGradientChange: ( value ) =>
										setAttributes( {
											maskGradientColor: value,
										} ),
								},
							] }
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>
					</div>

					<ToolsPanelItem
						hasValue={ () =>
							maskOpacity !==
							metadata.attributes.maskOpacity.default
						}
						isShownByDefault
						label={ __(
							'Image aspect ratio',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								maskOpacity:
									metadata.attributes.maskOpacity.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
							onChange={ ( value ) =>
								setAttributes( {
									maskOpacity: toNumber(
										( 1 - value ).toFixed( 1 ),
										0,
										1
									),
								} )
							}
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className={ bannerClasses } style={ styles }>
					<div className="smb-items__banner__figure">
						{ 1 > maskOpacity && (
							<div className="smb-items__banner__figure__mask" />
						) }
						{ !! imageURL ? (
							<img
								src={ imageURL }
								alt={ imageAlt }
								width={ imageWidth }
								height={ imageHeight }
								className={ `wp-image-${ imageID }` }
							/>
						) : (
							<div className="smb-items__banner__figure__dummy" />
						) }
					</div>

					{ ( ! RichText.isEmpty( title ) ||
						! RichText.isEmpty( lede ) ||
						isSelected ) && (
						<div
							className="smb-items__banner__body"
							data-content-position={
								( 'contents' !== imageSize &&
									contentPosition?.replace( ' ', '-' ) ) ||
								undefined
							}
						>
							<div className="smb-items__banner__body-inner">
								{ ( ! RichText.isEmpty( title ) ||
									isSelected ) && (
									<RichText
										className="smb-items__banner__title"
										placeholder={ __(
											'Write title…',
											'snow-monkey-blocks'
										) }
										value={ title }
										onChange={ ( value ) =>
											setAttributes( {
												title: value,
											} )
										}
										ref={ richTextRef }
									/>
								) }

								{ ( ! RichText.isEmpty( lede ) ||
									isSelected ) && (
									<RichText
										className="smb-items__banner__lede"
										placeholder={ __(
											'Write lede…',
											'snow-monkey-blocks'
										) }
										value={ lede }
										onChange={ ( value ) =>
											setAttributes( {
												lede: value,
											} )
										}
									/>
								) }
							</div>
						</div>
					) }
				</div>
			</div>

			{ 'contents' !== imageSize && (
				<BlockControls group="block">
					<BlockAlignmentMatrixControl
						label={ __(
							'Change content position',
							'snow-monkey-blocks'
						) }
						value={ contentPosition }
						onChange={ ( nextPosition ) => {
							setAttributes( {
								contentPosition: nextPosition,
							} );
						} }
					/>
				</BlockControls>
			) }

			<BlockControls group="block">
				<AlignmentToolbar
					value={ contentsAlignment }
					onChange={ ( value ) =>
						setAttributes( {
							contentsAlignment: value,
						} )
					}
				/>

				<ToolbarButton
					name="link"
					icon={ linkIcon }
					title={ __( 'Link', 'snow-monkey-blocks' ) }
					onClick={ ( event ) => {
						event.preventDefault();
						setIsEditingURL( true );
					} }
					isActive={ isURLSet }
				/>
			</BlockControls>

			{ isSelected && isEditingURL && (
				<Popover
					placement="bottom"
					anchor={ popoverAnchor }
					onClose={ () => {
						setIsEditingURL( false );
						richTextRef.current?.focus();
					} }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ { url, opensInNewTab } }
						onChange={ ( {
							url: newUrl,
							opensInNewTab: newOpensInNewTab,
						} ) => {
							setAttributes( {
								url: newUrl,
								target: ! newOpensInNewTab ? '_self' : '_blank',
							} );
						} }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ ! isURLSet }
					/>
				</Popover>
			) }
		</>
	);
}
