import classnames from 'classnames';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
	__experimentalImageSizeControl as ImageSizeControl,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	CheckboxControl,
	Popover,
	SelectControl,
	ToolbarButton,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

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
		price,
		lede,
		list,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! btnURL;
	const opensInNewTab = btnTarget === '_blank';

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

	const btnClasses = classnames( 'smb-btn', 'smb-pricing-table__item__btn', {
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
			btnURL: undefined,
			btnTarget: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<InspectorControls>
				{ 0 < imageSizeOptions.length && (
					<ToolsPanel
						label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					>
						<ToolsPanelItem
							hasValue={ () =>
								imageSizeSlug !==
								metadata.attributes.imageSizeSlug.default
							}
							isShownByDefault
							label={ __( 'Image size', 'snow-monkey-blocks' ) }
							onDeselect={ () =>
								setAttributes( {
									imageSizeSlug:
										metadata.attributes.imageSizeSlug
											.default,
								} )
							}
						>
							<ImageSizeControl
								slug={ imageSizeSlug }
								imageSizeOptions={ imageSizeOptions }
								isResizable={ false }
								imageSizeHelp={ __(
									'Select which image size to load.'
								) }
								onChangeImage={ ( value ) => {
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
						</ToolsPanelItem>
					</ToolsPanel>
				) }

				<ToolsPanel
					label={ __( 'Button settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							btnSize !== metadata.attributes.btnSize.default
						}
						isShownByDefault
						label={ __( 'Button size', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								btnSize: metadata.attributes.btnSize.default,
							} )
						}
					>
						<SelectControl
							label={ __( 'Button size', 'snow-monkey-blocks' ) }
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
									label: __( 'Wider', 'snow-monkey-blocks' ),
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
						label={ __( 'Border radius', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								btnBorderRadius:
									metadata.attributes.btnBorderRadius.default,
							} )
						}
					>
						<div className="smb-border-radius-control">
							<BorderRadiusControl
								values={ btnBorderRadius }
								onChange={ ( value ) =>
									setAttributes( {
										btnBorderRadius: value,
									} )
								}
							/>
						</div>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							btnWrap !== metadata.attributes.btnWrap.default
						}
						isShownByDefault
						label={ __( 'Wrap', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								btnWrap: metadata.attributes.btnWrap.default,
							} )
						}
					>
						<CheckboxControl
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
									gradientValue: btnBackgroundGradientColor,
									onColorChange: ( value ) =>
										setAttributes( {
											btnBackgroundColor: value,
										} ),
									onGradientChange: ( value ) =>
										setAttributes( {
											btnBackgroundGradientColor: value,
										} ),
								},
							] }
							__experimentalIsItemGroup={ false }
							__experimentalHasMultipleOrigins
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>

						<ColorGradientSettingsDropdown
							settings={ [
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
							__experimentalIsItemGroup={ false }
							__experimentalHasMultipleOrigins
							__experimentalIsRenderedInSidebar
							{ ...useMultipleOriginColorsAndGradients() }
						/>

						<ContrastChecker
							backgroundColor={ btnBackgroundColor }
							textColor={ btnTextColor }
						/>
					</div>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-pricing-table__item">
					{ ( !! imageURL || isSelected ) && (
						<div className="smb-pricing-table__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								width={ imageWidth }
								height={ imageHeight }
								onSelect={ ( media ) => {
									const newImageSizeSlug = !! media?.sizes[
										imageSizeSlug
									]
										? imageSizeSlug
										: DEFAULT_MEDIA_SIZE_SLUG;
									const newImageUrl =
										media?.sizes[ newImageSizeSlug ]?.url;
									const newImageWidth =
										media?.sizes[ newImageSizeSlug ]?.width;
									const newImageHeight =
										media?.sizes[ newImageSizeSlug ]
											?.height;

									setAttributes( {
										imageURL: newImageUrl,
										imageID: media.id,
										imageAlt: media.alt,
										imageWidth: newImageWidth,
										imageHeight: newImageHeight,
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
										imageID:
											metadata.attributes.imageID.default,
									} )
								}
								allowedTypes={ ALLOWED_TYPES }
							/>
						</div>
					) }

					<RichText
						className="smb-pricing-table__item__title"
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

					{ ( ! RichText.isEmpty( price ) || isSelected ) && (
						<RichText
							className="smb-pricing-table__item__price"
							placeholder={ __(
								'Write price…',
								'snow-monkey-blocks'
							) }
							value={ price }
							onChange={ ( value ) =>
								setAttributes( {
									price: value,
								} )
							}
						/>
					) }

					{ ( ! RichText.isEmpty( lede ) || isSelected ) && (
						<RichText
							className="smb-pricing-table__item__lede"
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

					<RichText
						tagName="ul"
						multiline="li"
						value={ list }
						onChange={ ( value ) =>
							setAttributes( {
								list: value,
							} )
						}
					/>

					{ ( ! RichText.isEmpty( btnLabel ) || isSelected ) && (
						<div className="smb-pricing-table__item__action">
							<span
								ref={ setPopoverAnchor }
								className={ btnClasses }
								href={ btnURL }
								style={ btnStyles }
								target={
									'_self' === btnTarget
										? undefined
										: btnTarget
								}
								rel={
									'_self' === btnTarget
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

								{ isSelected && ( isEditingURL || isURLSet ) && (
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
											value={ {
												url: btnURL,
												opensInNewTab,
											} }
											onChange={ ( {
												url: newUrl,
												opensInNewTab: newOpensInNewTab,
											} ) =>
												setAttributes( {
													btnURL: newUrl,
													btnTarget:
														! newOpensInNewTab
															? '_self'
															: '_blank',
												} )
											}
											onRemove={ () => {
												unlink();
												richTextRef.current?.focus();
											} }
											forceIsEditingLink={ isEditingURL }
										/>
									</Popover>
								) }
							</span>
						</div>
					) }
				</div>
			</div>

			<BlockControls group="block">
				{ ! isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkIcon }
						title={ __( 'Link', 'snow-monkey-blocks' ) }
						onClick={ ( event ) => {
							event.preventDefault();
							setIsEditingURL( true );
						} }
					/>
				) }
				{ isURLSet && (
					<ToolbarButton
						name="link"
						icon={ linkOffIcon }
						title={ __( 'Unlink', 'snow-monkey-blocks' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>
		</>
	);
}
