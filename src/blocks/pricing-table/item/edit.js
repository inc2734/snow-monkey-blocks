import classnames from 'classnames';

import {
	BlockControls,
	ContrastChecker,
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	Popover,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';
const ALLOWED_BLOCKS = [ 'core/list-item' ];
const TEMPLATE = [
	[
		'core/list-item',
		{ placeholder: __( 'Write a description…', 'snow-monkey-blocks' ) },
	],
];

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
		displayImage,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		displayBtn,
		btnLabel,
		btnURL,
		btnTarget,
		btnBackgroundColor,
		btnBackgroundGradientColor,
		btnTextColor,
		btnSize,
		btnBorderRadius,
		btnWrap,
		templateLock,
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

	const multipleOriginColorsAndGradients = {
		...useMultipleOriginColorsAndGradients(),
	};

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

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
		}
	);

	return (
		<>
			<InspectorControls>
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
									'Border radius',
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
											gradientValue:
												btnBackgroundGradientColor,
											onColorChange: ( value ) =>
												setAttributes( {
													btnBackgroundColor: value,
												} ),
											onGradientChange: ( value ) =>
												setAttributes( {
													btnBackgroundGradientColor:
														value,
												} ),
										},
									] }
									__experimentalIsRenderedInSidebar
									{ ...multipleOriginColorsAndGradients }
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
									__experimentalIsRenderedInSidebar
									{ ...multipleOriginColorsAndGradients }
								/>

								<ContrastChecker
									backgroundColor={ btnBackgroundColor }
									textColor={ btnTextColor }
								/>
							</div>
						</>
					) }
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-pricing-table__item">
					{ displayImage && (
						<div className="smb-pricing-table__item__figure">
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

					<ul { ...innerBlocksProps } />

					{ displayBtn && (
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
							</span>
						</div>
					) }
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
								btnTarget: ! newOpensInNewTab
									? '_self'
									: '_blank',
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
