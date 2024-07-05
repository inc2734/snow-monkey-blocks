import classnames from 'classnames';
import { times } from 'lodash';

import {
	BaseControl,
	Button,
	Popover,
	SelectControl,
	ToolbarButton,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

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
		titleTagName,
		title,
		lede,
		summary,
		url,
		target,
		displayImage,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		displayBtn,
		btnLabel,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const colorProps = useColorProps( attributes );

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

	const multipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradients();

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const btnClasses = classnames( 'smb-items__item__btn', 'smb-btn', {
		[ `smb-btn--${ btnSize }` ]: !! btnSize,
		'smb-btn--wrap': btnWrap,
	} );

	const btnStyles = {
		'--smb-btn--background-color': btnBackgroundColor || undefined,
		'--smb-btn--background-image': btnBackgroundGradientColor || undefined,
		'--smb-btn--border-radius': String( btnBorderRadius ).match( /^\d+$/ )
			? `${ btnBorderRadius }px`
			: btnBorderRadius,
		'--smb-btn--color': btnTextColor || undefined,
	};

	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
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
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
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
							id="snow-monkey-blocks/items-item-standard/title-tag-name"
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

				<ToolsPanel
					label={ __( 'Image settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							displayImage !==
							metadata.attributes.displayImage.default
						}
						isShownByDefault
						label={ __( 'Display image', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								displayImage:
									metadata.attributes.displayImage.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display image',
								'snow-monkey-blocks'
							) }
							checked={ displayImage }
							onChange={ ( value ) =>
								setAttributes( {
									displayImage: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ displayImage && 0 < imageSizeOptions.length && (
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
				</ToolsPanel>

				<ToolsPanel
					label={ __( 'Button settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							displayBtn !==
							metadata.attributes.displayBtn.default
						}
						isShownByDefault
						label={ __( 'Display button', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								displayBtn:
									metadata.attributes.displayBtn.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Display button',
								'snow-monkey-blocks'
							) }
							checked={ displayBtn }
							onChange={ ( value ) =>
								setAttributes( {
									displayBtn: value,
								} )
							}
						/>
					</ToolsPanelItem>

					{ displayBtn && (
						<>
							<ToolsPanelItem
								hasValue={ () =>
									btnSize !==
									metadata.attributes.btnSize.default
								}
								isShownByDefault
								label={ __(
									'Button size',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										btnSize:
											metadata.attributes.btnSize.default,
									} )
								}
							>
								<SelectControl
									label={ __(
										'Button size',
										'snow-monkey-blocks'
									) }
									value={ btnSize }
									onChange={ ( value ) =>
										setAttributes( {
											btnSize: value,
										} )
									}
									options={ [
										{
											value: '',
											label: __(
												'Normal size',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'little-wider',
											label: __(
												'Litle wider',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'wider',
											label: __(
												'Wider',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'more-wider',
											label: __(
												'More wider',
												'snow-monkey-blocks'
											),
										},
										{
											value: 'full',
											label: __(
												'Full size',
												'snow-monkey-blocks'
											),
										},
									] }
								/>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									btnBorderRadius !==
									metadata.attributes.btnBorderRadius.default
								}
								isShownByDefault
								label={ __(
									'Button size',
									'snow-monkey-blocks'
								) }
								onDeselect={ () =>
									setAttributes( {
										btnBorderRadius:
											metadata.attributes.btnBorderRadius
												.default,
									} )
								}
							>
								<div className="smb-border-radius-control">
									<BorderRadiusControl
										values={ btnBorderRadius }
										onChange={ ( value ) => {
											setAttributes( {
												btnBorderRadius: value,
											} );
										} }
									/>
								</div>
							</ToolsPanelItem>

							<ToolsPanelItem
								hasValue={ () =>
									btnWrap !==
									metadata.attributes.btnWrap.default
								}
								isShownByDefault
								label={ __( 'Wrap', 'snow-monkey-blocks' ) }
								onDeselect={ () =>
									setAttributes( {
										btnWrap:
											metadata.attributes.btnWrap.default,
									} )
								}
							>
								<ToggleControl
									label={ __( 'Wrap', 'snow-monkey-blocks' ) }
									checked={ btnWrap }
									onChange={ ( value ) =>
										setAttributes( {
											btnWrap: value,
										} )
									}
								/>
							</ToolsPanelItem>

							<div className="smb-color-gradient-settings-dropdown">
								<ColorGradientSettingsDropdown
									settings={ [
										{
											label: __(
												'Background color',
												'snow-monkey-blocks'
											),
											colorValue: btnBackgroundColor,
											onColorChange: ( value ) =>
												setAttributes( {
													btnBackgroundColor: value,
												} ),
											gradientValue:
												btnBackgroundGradientColor,
											onGradientChange: ( value ) =>
												setAttributes( {
													btnBackgroundGradientColor:
														value,
												} ),
										},
										{
											label: __(
												'Text color',
												'snow-monkey-blocks'
											),
											colorValue: btnTextColor,
											onColorChange: ( value ) =>
												setAttributes( {
													btnTextColor: value,
												} ),
										},
									] }
									__experimentalIsRenderedInSidebar
									{ ...multipleOriginColorsAndGradients }
								/>
							</div>

							<ContrastChecker
								backgroundColor={ btnBackgroundColor }
								textColor={ btnTextColor }
							/>
						</>
					) }
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ classnames(
						'smb-items__item',
						colorProps?.className
					) }
					style={ { ...colorProps?.style } }
				>
					{ displayImage && (
						<div className="smb-items__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								width={ imageWidth }
								height={ imageHeight }
								onSelect={ ( media ) => {
									const newImageSizeSlug = !! media?.sizes?.[
										imageSizeSlug
									]
										? imageSizeSlug
										: DEFAULT_MEDIA_SIZE_SLUG;
									const newImageUrl =
										media?.sizes?.[ newImageSizeSlug ]?.url;
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
											metadata.attributes.imageID.default,
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
					) }

					<div className="smb-items__item__body">
						{ 'none' !== titleTagName && (
							<RichText
								tagName={ titleTagName }
								className="smb-items__item__title"
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
							/>
						) }

						{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
							<RichText
								className="smb-items__item__lede"
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

						{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
							<RichText
								className="smb-items__item__content"
								placeholder={ __(
									'Write content…',
									'snow-monkey-blocks'
								) }
								value={ summary }
								onChange={ ( value ) =>
									setAttributes( {
										summary: value,
									} )
								}
							/>
						) }

						{ displayBtn && (
							<div className="smb-items__item__action">
								<span
									ref={ setPopoverAnchor }
									className={ btnClasses }
									href={ url }
									style={ btnStyles }
									target={
										'_self' === target ? undefined : target
									}
									rel={
										'_self' === target
											? undefined
											: 'noopener noreferrer'
									}
								>
									<RichText
										className="smb-btn__label"
										value={ btnLabel }
										placeholder={ __(
											'Button',
											'snow-monkey-blocks'
										) }
										onChange={ ( value ) =>
											setAttributes( {
												btnLabel: value,
											} )
										}
										withoutInteractiveFormatting={ true }
										ref={ richTextRef }
									/>
								</span>
							</div>
						) }
					</div>
				</div>
			</div>

			{ displayBtn && (
				<BlockControls group="block">
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
			) }

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
						} ) =>
							setAttributes( {
								url: newUrl,
								target: ! newOpensInNewTab ? '_self' : '_blank',
							} )
						}
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
