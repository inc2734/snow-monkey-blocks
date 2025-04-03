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
	LinkControl,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalBorderRadiusControl as BorderRadiusControl,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState, useMemo, useRef } from '@wordpress/element';
import { link, linkOff } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { prependHTTP } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

import metadata from './block.json';

const NEW_TAB_REL = 'noreferrer noopener';
const NEW_TAB_TARGET = '_blank';
const NOFOLLOW_REL = 'nofollow';

const LINK_SETTINGS = [
	...LinkControl.DEFAULT_LINK_SETTINGS,
	{
		id: 'nofollow',
		title: __( 'Mark as nofollow', 'snow-monkey-blocks' ),
	},
];

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

/**
 * Updates the link attributes.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/button/get-updated-link-attributes.js
 *
 * @param {Object}  attributes               The current block attributes.
 * @param {string}  attributes.rel           The current link rel attribute.
 * @param {string}  attributes.url           The current link url.
 * @param {string}  attributes.title         The current link text.
 * @param {boolean} attributes.opensInNewTab Whether the link should open in a new window.
 * @param {boolean} attributes.nofollow      Whether the link should be marked as nofollow.
 */
export function getUpdatedLinkAttributes( {
	rel = '',
	url = '',
	title,
	opensInNewTab,
	nofollow,
} ) {
	let newLinkTarget;
	// Since `rel` is editable attribute, we need to check for existing values and proceed accordingly.
	let updatedRel = rel;

	if ( opensInNewTab ) {
		newLinkTarget = NEW_TAB_TARGET;
		updatedRel = updatedRel?.includes( NEW_TAB_REL )
			? updatedRel
			: updatedRel + ` ${ NEW_TAB_REL }`;
	} else {
		const relRegex = new RegExp( `\\b${ NEW_TAB_REL }\\s*`, 'g' );
		updatedRel = updatedRel?.replace( relRegex, '' ).trim();
	}

	if ( nofollow ) {
		updatedRel = updatedRel?.includes( NOFOLLOW_REL )
			? updatedRel
			: ( updatedRel + ` ${ NOFOLLOW_REL }` ).trim();
	} else {
		const relRegex = new RegExp( `\\b${ NOFOLLOW_REL }\\s*`, 'g' );
		updatedRel = updatedRel?.replace( relRegex, '' ).trim();
	}

	return {
		url: prependHTTP( url ),
		btnLabel: title,
		target: newLinkTarget,
		rel: updatedRel || undefined,
	};
}

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		lede,
		summary,
		url,
		rel,
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

	const ref = useRef();
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isEditingHref, setIsEditingHref ] = useState( false );
	const isHrefSet = !! url;
	const opensInNewTab = target === NEW_TAB_TARGET;
	const nofollow = !! rel?.includes( NOFOLLOW_REL );

	// Memoize link value to avoid overriding the LinkControl's internal state.
	// This is a temporary fix. See https://github.com/WordPress/gutenberg/issues/51256.
	const linkValue = useMemo(
		() => ( { url, title: btnLabel, opensInNewTab, nofollow } ),
		[ url, btnLabel, opensInNewTab, nofollow ]
	);

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingHref( true );
	}

	function unlink() {
		setAttributes( {
			url: undefined,
			target: undefined,
			rel: undefined,
		} );
		setIsEditingHref( false );
	}

	const imageSizes = useSelect(
		( select ) => select( 'core/block-editor' ).getSettings()?.imageSizes,
		[]
	);

	const image = useSelect(
		( select ) =>
			imageID
				? select( 'core' ).getMedia( imageID, { context: 'view' } )
				: null,
		[ imageID ]
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

	const blockProps = useBlockProps( {
		className: classes,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

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
							__nextHasNoMarginBottom
							label={ __( 'Title tag', 'snow-monkey-blocks' ) }
							id="snow-monkey-blocks/items-item-block-link/title-tag-name"
						>
							<div className="smb-list-icon-selector">
								{ times( titleTagNames.length, ( index ) => {
									const onClickTitleTagName = () => {
										setAttributes( {
											titleTagName:
												titleTagNames[ index ],
										} );
									};

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
							__nextHasNoMarginBottom
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
							__nextHasNoMarginBottom
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
									__next40pxDefaultSize
									__nextHasNoMarginBottom
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
									__nextHasNoMarginBottom
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
						'smb-items__item--block-link',
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

						{ ( isHrefSet || displayBtn ) && (
							<div className="smb-items__item__action">
								<span
									className={
										displayBtn ? btnClasses : undefined
									}
									style={ displayBtn ? btnStyles : undefined }
									href={ url }
									target={ target }
									rel={ rel }
								>
									{ displayBtn ? (
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
											withoutInteractiveFormatting={
												true
											}
										/>
									) : (
										<span className="screen-reader-text">
											{ btnLabel ||
												__(
													'Learn more',
													'snow-monkey-blocks'
												) }
										</span>
									) }
								</span>
							</div>
						) }
					</div>
				</div>
			</div>

			<BlockControls group="block">
				{ ! isHrefSet && (
					<ToolbarButton
						name="link"
						icon={ link }
						title={ __( 'Link' ) }
						shortcut={ displayShortcut.primary( 'k' ) }
						onClick={ startEditing }
					/>
				) }
				{ isHrefSet && (
					<ToolbarButton
						name="link"
						icon={ linkOff }
						title={ __( 'Unlink' ) }
						shortcut={ displayShortcut.primaryShift( 'k' ) }
						onClick={ unlink }
						isActive={ true }
					/>
				) }
			</BlockControls>

			{ isSelected && ( isEditingHref || isHrefSet ) && (
				<Popover
					position="bottom center"
					onClose={ () => {
						setIsEditingHref( false );
					} }
					anchor={ popoverAnchor }
					focusOnMount={ isEditingHref ? 'firstElement' : false }
				>
					<LinkControl
						className="wp-block-navigation-link__inline-link-input"
						value={ linkValue }
						onChange={ ( {
							url: newHref = '',
							title: newLinkText,
							opensInNewTab: newOpensInNewTab,
							nofollow: newNofollow,
						} ) => {
							setAttributes(
								getUpdatedLinkAttributes( {
									rel,
									url: newHref,
									title: newLinkText,
									opensInNewTab: newOpensInNewTab,
									nofollow: newNofollow,
								} )
							);
						} }
						onRemove={ () => {
							unlink();
						} }
						forceIsEditingLink={ isEditingHref }
						hasRichPreviews
						hasTextControl={ ! displayBtn }
						settings={ LINK_SETTINGS }
						showInitialSuggestions
						suggestionsQuery={ {
							// always show Pages as initial suggestions
							initialSuggestionsSearchOptions: {
								type: 'post',
								subtype: 'page',
								perPage: 20,
							},
						} }
					/>
				</Popover>
			) }
		</>
	);
}
