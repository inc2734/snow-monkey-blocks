import classnames from 'classnames';
import { times } from 'lodash';

import {
	BaseControl,
	Button,
	FocalPointPicker,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalImageURLInputUI as ImageURLInputUI,
	useInnerBlocksProps,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { pullLeft, pullRight } from '@wordpress/icons';

import { getColumnSize, getMediaType, isVideoType } from '@smb/helper';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

const ALLOWED_TYPES = [ 'image', 'video' ];
const LINK_DESTINATION_MEDIA = 'media';
const LINK_DESTINATION_ATTACHMENT = 'attachment';
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
		backgroundColor,
		backgroundGradientColor,
		textColor,
		titleTagName,
		title,
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		mediaSizeSlug,
		caption,
		mediaPosition,
		verticalAlignment,
		mediaColumnSize,
		mobileOrder,
		href,
		linkTarget,
		rel,
		linkClass,
		linkDestination,
		mediaType,
		imageFill,
		focalPoint,
		splitPoint,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const { imageSizes, image } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				image:
					mediaId && isSelected
						? select( 'core' ).getMedia( mediaId, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},

		[ isSelected, mediaId, clientId ]
	);

	const imageSizeOptions = imageSizes
		.filter(
			( { slug } ) => image?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const isFill = 'image' === mediaType && imageFill;

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
	const { textColumnWidth, mediaColumnWidth } =
		getColumnSize( mediaColumnSize );

	const classes = classnames( 'smb-media-text', className, {
		'smb-media-text--has-background':
			!! backgroundColor || !! backgroundGradientColor,
		[ `smb-media-text--mobile-${ mobileOrder }` ]: !! mobileOrder,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--reverse': 'left' === mediaPosition,
		'c-row--top': ! isFill && 'top' === verticalAlignment,
		'c-row--middle': ! isFill && 'center' === verticalAlignment,
		'c-row--bottom': ! isFill && 'bottom' === verticalAlignment,
		'c-row--fill': isFill,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--${ splitPoint }-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--${ splitPoint }-${ mediaColumnWidth }`,
	] );

	const blockProps = useBlockProps( {
		className: classes,
		style: {
			'--smb-media-text--background-color': backgroundColor,
			'--smb-media-text--background-image': backgroundGradientColor,
			'--smb-media-text--color': textColor,
			'--smb-media-text--image-position-x':
				isFill && !! focalPoint?.x
					? `${ focalPoint.x * 100 }%`
					: undefined,
			'--smb-media-text--image-position-y':
				isFill && !! focalPoint?.y
					? `${ focalPoint.y * 100 }%`
					: undefined,
			'--smb-media-text--gap':
				getGapCSSValue( attributes?.style?.spacing?.blockGap ) ||
				undefined,
		},
		'data-sm-split-point': splitPoint,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-media-text__body',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					settings={ [
						{
							colorValue: backgroundColor,
							resetAllFilter: () => ( {
								backgroundColor: metadata.backgroundColor,
								backgroundGradientColor:
									metadata.backgroundGradientColor,
							} ),
							onColorChange: ( value ) =>
								setAttributes( {
									backgroundColor: value,
								} ),
							gradientValue: backgroundGradientColor,
							onGradientChange: ( value ) =>
								setAttributes( {
									backgroundGradientColor: value,
								} ),
							label: __(
								'Background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: textColor,
							resetAllFilter: () => ( {
								textColor: metadata.textColor,
							} ),
							onColorChange: ( value ) =>
								setAttributes( {
									textColor: value,
								} ),
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							mediaColumnSize !==
							metadata.attributes.mediaColumnSize.default
						}
						isShownByDefault
						label={ __(
							'Image column size',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								mediaColumnSize:
									metadata.attributes.mediaColumnSize.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Image column size',
								'snow-monkey-blocks'
							) }
							value={ mediaColumnSize }
							options={ [
								{
									value: 66,
									label: __( '66%', 'snow-monkey-blocks' ),
								},
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									mediaColumnSize: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ 0 < imageSizeOptions.length && (
						<ResolutionTool
							defaultValue={
								metadata.attributes.mediaSizeSlug.default
							}
							value={ mediaSizeSlug }
							options={ imageSizeOptions }
							onChange={ ( value ) => {
								const newMediaUrl =
									image?.media_details?.sizes?.[ value ]
										?.source_url;
								const newMediaWidth =
									image?.media_details?.sizes?.[ value ]
										?.width;
								const newMediaHeight =
									image?.media_details?.sizes?.[ value ]
										?.height;

								setAttributes( {
									mediaUrl: newMediaUrl,
									mediaWidth: newMediaWidth,
									mediaHeight: newMediaHeight,
									mediaSizeSlug: value,
								} );
							} }
						/>
					) }

					{ 'image' === mediaType && (
						<ToolsPanelItem
							hasValue={ () =>
								imageFill !==
								metadata.attributes.imageFill.default
							}
							isShownByDefault
							label={ __(
								'Crop image to fill entire column',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									imageFill:
										metadata.attributes.imageFill.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Crop image to fill entire column',
									'snow-monkey-blocks'
								) }
								checked={ imageFill }
								onChange={ ( value ) =>
									setAttributes( {
										imageFill: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					{ isFill && (
						<ToolsPanelItem
							hasValue={ () =>
								focalPoint !==
								metadata.attributes.focalPoint.default
							}
							isShownByDefault
							label={ __(
								'Focal point picker',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									focalPoint:
										metadata.attributes.focalPoint.default,
								} )
							}
						>
							<FocalPointPicker
								label={ __(
									'Focal point picker',
									'snow-monkey-blocks'
								) }
								url={ mediaUrl }
								value={ focalPoint }
								onChange={ ( value ) => {
									setAttributes( {
										focalPoint: value,
									} );
								} }
								// onDragStart={ ( value ) => setAttributes }
								onDrag={ ( value ) =>
									setAttributes( { focalPoint: value } )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							mobileOrder !==
							metadata.attributes.mobileOrder.default
						}
						isShownByDefault
						label={ __( 'Sort by mobile', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								mobileOrder:
									metadata.attributes.mobileOrder.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Sort by mobile',
								'snow-monkey-blocks'
							) }
							value={ mobileOrder }
							options={ [
								{
									value: '',
									label: __(
										'Default',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'text',
									label: __(
										'Text > Image',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'image',
									label: __(
										'Image > Text',
										'snow-monkey-blocks'
									),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									mobileOrder:
										'' === value ? undefined : value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							splitPoint !==
							metadata.attributes.splitPoint.default
						}
						isShownByDefault
						label={ __(
							'When to divide columns',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								splitPoint:
									metadata.attributes.splitPoint.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'When to divide columns',
								'snow-monkey-blocks'
							) }
							value={ splitPoint }
							options={ [
								{
									value: 'lg',
									label: __( 'PC', 'snow-monkey-blocks' ),
								},
								{
									value: 'md',
									label: __( 'Tablet', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									splitPoint: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							titleTagName !==
							metadata.attributes.titleTagName.default
						}
						isShownByDefault
						label={ __( 'Title tag', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								titleTagName:
									metadata.attributes.titleTagName.default,
							} )
						}
					>
						<BaseControl
							label={ __( 'Title tag', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/media-text/title-tag-name"
						>
							<div className="smb-list-icon-selector">
								{ times( titleTagNames.length, ( index ) => {
									const onClickTitleTagName = () =>
										setAttributes( {
											titleTagName:
												titleTagNames[ index ],
										} );

									return (
										<Button
											variant={
												titleTagName ===
												titleTagNames[ index ]
													? 'primary'
													: 'secondary'
											}
											onClick={ onClickTitleTagName }
											key={ index }
										>
											{ titleTagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<BlockControls group="block">
				{ ! isFill && (
					<BlockVerticalAlignmentToolbar
						onChange={ ( value ) =>
							setAttributes( {
								verticalAlignment: value,
							} )
						}
						value={ verticalAlignment }
					/>
				) }

				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show media on left',
							'snow-monkey-blocks'
						) }
						isActive={ 'left' === mediaPosition }
						onClick={ () =>
							setAttributes( { mediaPosition: 'left' } )
						}
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show media on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === mediaPosition }
						onClick={ () =>
							setAttributes( { mediaPosition: 'right' } )
						}
					/>

					{ mediaUrl &&
						( 'image' === mediaType ||
							undefined === mediaType ) && (
							<ImageURLInputUI
								url={ href || '' }
								onChangeUrl={ ( props ) => {
									setAttributes( props );
								} }
								linkDestination={ linkDestination }
								mediaType={ mediaType }
								mediaUrl={ mediaUrl }
								mediaLink={ image && image.link }
								linkTarget={ linkTarget }
								linkClass={ linkClass }
								rel={ rel }
							/>
						) }
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<div className={ rowClasses }>
					<div className={ textColumnClasses }>
						<div className="smb-media-text__contents-wrapper">
							{ ( ! RichText.isEmpty( title ) || isSelected ) &&
								'none' !== titleTagName && (
									<RichText
										className="smb-media-text__title"
										tagName={ titleTagName }
										value={ title }
										onChange={ ( value ) =>
											setAttributes( {
												title: value,
											} )
										}
										placeholder={ __(
											'Write title…',
											'snow-monkey-blocks'
										) }
									/>
								) }

							<div { ...innerBlocksProps } />
						</div>
					</div>

					<div className={ imageColumnClasses }>
						<div
							className={ classnames( 'smb-media-text__figure', {
								'smb-media-text__figure--fill': isFill,
							} ) }
						>
							<Figure
								src={ mediaUrl }
								id={ mediaId }
								alt={ mediaAlt }
								url={ href }
								width={ mediaWidth }
								height={ mediaHeight }
								target={ linkTarget }
								onSelect={ ( media ) => {
									const newMediaSizeSlug = !! media?.sizes?.[
										mediaSizeSlug
									]
										? mediaSizeSlug
										: DEFAULT_MEDIA_SIZE_SLUG;
									const newMediaUrl =
										media?.sizes?.[ newMediaSizeSlug ]?.url;
									const newMediaWidth =
										media?.sizes?.[ newMediaSizeSlug ]
											?.width;
									const newMediaHeight =
										media?.sizes?.[ newMediaSizeSlug ]
											?.height;

									let newHref = href;
									if (
										linkDestination ===
										LINK_DESTINATION_MEDIA
									) {
										// Update the media link.
										newHref = media.url;
									}

									// Check if the image is linked to the attachment page.
									if (
										linkDestination ===
										LINK_DESTINATION_ATTACHMENT
									) {
										// Update the media link.
										newHref = media.link;
									}

									setAttributes( {
										mediaType: getMediaType( media ),
										mediaLink: media.link || undefined,
										mediaId: media.id,
										mediaUrl: newMediaUrl || media.url,
										mediaAlt: media.alt,
										mediaWidth:
											newMediaWidth || media.width,
										mediaHeight:
											newMediaHeight || media.height,
										mediaSizeSlug: newMediaSizeSlug,
										href: newHref,
									} );
								} }
								onSelectURL={ ( newMediaUrl ) => {
									if ( newMediaUrl !== mediaUrl ) {
										let newHref = href;
										if (
											linkDestination ===
											LINK_DESTINATION_MEDIA
										) {
											// Update the media link.
											newHref = newMediaUrl;
										}

										// Check if the image is linked to the attachment page.
										if (
											linkDestination ===
											LINK_DESTINATION_ATTACHMENT
										) {
											// Update the media link.
											newHref = '';
										}

										setAttributes( {
											mediaUrl: newMediaUrl,
											mediaId: 0,
											mediaSizeSlug:
												DEFAULT_MEDIA_SIZE_SLUG,
											mediaType: getMediaType( {
												media_type: isVideoType(
													newMediaUrl
												)
													? 'video'
													: 'image',
											} ),
											href: newHref,
										} );
									}
								} }
								onRemove={ () => {
									setAttributes( {
										mediaUrl:
											metadata.attributes.mediaUrl
												.default,
										mediaAlt:
											metadata.attributes.mediaAlt
												.default,
										mediaWidth:
											metadata.attributes.mediaWidth
												.default,
										mediaHeight:
											metadata.attributes.mediaHeight
												.default,
										mediaId:
											metadata.attributes.mediaId.default,
										mediaType:
											metadata.attributes.mediaType
												.default,
										href: metadata.attributes.href.default,
										linkDestination:
											metadata.attributes.linkDestination
												.default,
									} );
								} }
								mediaType={ mediaType }
								allowedTypes={ ALLOWED_TYPES }
								linkClass={ linkClass }
								rel={ rel }
							/>
						</div>

						{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
							<RichText
								className="smb-media-text__caption"
								placeholder={ __(
									'Write caption…',
									'snow-monkey-blocks'
								) }
								value={ caption }
								onChange={ ( value ) =>
									setAttributes( {
										caption: value,
									} )
								}
							/>
						) }
					</div>
				</div>
			</div>
		</>
	);
}
