import classnames from 'classnames';
import { times } from 'lodash';

import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	LinkControl,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	Popover,
	ToolbarButton,
	ToolbarGroup,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useMergeRefs } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState, useMemo, useRef } from '@wordpress/element';
import { link, linkOff, pullLeft, pullRight } from '@wordpress/icons';
import { displayShortcut } from '@wordpress/keycodes';
import { prependHTTP } from '@wordpress/url';
import { __ } from '@wordpress/i18n';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';
import { stringToInnerText } from '@smb/helper';

import metadata from './block.json';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

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
		linkURL: prependHTTP( url ),
		linkLabel: title,
		linkTarget: newLinkTarget,
		rel: updatedRel || undefined,
	};
}

export default function ( { attributes, setAttributes, isSelected } ) {
	const {
		titleTagName,
		title,
		summary,
		displayLink,
		rel,
		linkLabel,
		linkURL,
		linkTarget,
		displayImage,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
	} = attributes;

	const colorProps = useColorProps( {
		style: {
			color: {
				...attributes?.style?.color,
			},
		},
		backgroundColor: attributes?.backgroundColor || undefined,
		textColor: attributes?.textColor || undefined,
		gradient: attributes?.gradient || undefined,
	} );

	const ref = useRef();
	const [ popoverAnchor, setPopoverAnchor ] = useState();
	const [ isEditingHref, setIsEditingHref ] = useState( false );
	const isHrefSet = !! linkURL;
	const opensInNewTab = linkTarget === NEW_TAB_TARGET;
	const nofollow = !! rel?.includes( NOFOLLOW_REL );

	// Memoize link value to avoid overriding the LinkControl's internal state.
	// This is a temporary fix. See https://github.com/WordPress/gutenberg/issues/51256.
	const linkValue = useMemo(
		() => ( { url: linkURL, title: linkLabel, opensInNewTab, nofollow } ),
		[ linkURL, linkLabel, opensInNewTab, nofollow ]
	);

	function startEditing( event ) {
		event.preventDefault();
		setIsEditingHref( true );
	}

	function unlink() {
		setAttributes( {
			linkURL: undefined,
			linkTarget: undefined,
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

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = 'c-row__col';

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--horizontal',
		colorProps?.className,
		{
			'smb-panels__item--reverse': 'right' === imagePosition,
		}
	);

	const itemStyles = colorProps?.style;

	const actionClasses = classnames( 'smb-panels__item__action', {
		'smb-panels__item__action--nolabel': ! linkLabel && ! isSelected,
	} );

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
							id="snow-monkey-blocks/panels-item-horizontal/title-tag-name"
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
					label={ __( 'Link settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							displayLink !==
							metadata.attributes.displayLink.default
						}
						isShownByDefault
						label={ __( 'Display link', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								displayLink:
									metadata.attributes.displayLink.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __( 'Display link', 'snow-monkey-blocks' ) }
							checked={ displayLink }
							onChange={ ( value ) =>
								setAttributes( {
									displayLink: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<BlockControls group="block">
				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __( 'Image position', 'snow-monkey-blocks' ) }
						isActive={ 'left' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'left' } )
						}
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show avatar on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'right' } )
						}
					/>
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
				<div className={ itemClasses } style={ itemStyles }>
					{ displayImage && (
						<div className="smb-panels__item__figure">
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

					<div className="smb-panels__item__body">
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									tagName={ titleTagName }
									className="smb-panels__item__title"
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

						{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
							<RichText
								className="smb-panels__item__content"
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

						{ ( isHrefSet || displayLink ) && (
							<div className={ actionClasses }>
								<span
									href={ linkURL }
									target={ linkTarget }
									rel={ rel }
								>
									{ displayLink ? (
										<RichText
											className="smb-panels__item__link"
											value={ linkLabel }
											placeholder={ __(
												'Link',
												'snow-monkey-blocks'
											) }
											onChange={ ( value ) =>
												setAttributes( {
													linkLabel:
														stringToInnerText(
															value
														),
												} )
											}
										/>
									) : (
										<div className="smb-panels__item__link screen-reader-text">
											{ linkLabel ||
												__(
													'Learn more',
													'snow-monkey-blocks'
												) }
										</div>
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
						hasTextControl={ ! displayLink }
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
