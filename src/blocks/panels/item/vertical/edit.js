import classnames from 'classnames';
import { times } from 'lodash';

import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalLinkControl as LinkControl,
	__experimentalUseColorProps as useColorProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	Popover,
	ToolbarButton,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';
import { stringToInnerText } from '@smb/helper';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	clientId,
} ) {
	const {
		titleTagName,
		title,
		summary,
		displayLink,
		linkLabel,
		linkURL,
		linkTarget,
		displayImage,
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

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! linkURL;
	const opensInNewTab = linkTarget === '_blank';

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

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = 'c-row__col';

	const itemClasses = classnames( 'smb-panels__item', colorProps?.className );
	const itemStyles = colorProps?.style;

	const actionClasses = classnames( 'smb-panels__item__action', {
		'smb-panels__item__action--nolabel': ! linkLabel && ! isSelected,
	} );

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

	const unlink = () => {
		setAttributes( {
			linkURL: undefined,
			linkTarget: undefined,
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

						{ ( isURLSet || displayLink ) && (
							<div className={ actionClasses }>
								{ displayLink && (
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
													stringToInnerText( value ),
											} )
										}
										ref={ richTextRef }
									/>
								) }
							</div>
						) }
					</div>
				</div>
			</div>

			<BlockControls>
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
						value={ { url: linkURL, opensInNewTab } }
						onChange={ ( {
							url: newUrl,
							opensInNewTab: newOpensInNewTab,
						} ) =>
							setAttributes( {
								linkURL: newUrl,
								linkTarget: ! newOpensInNewTab
									? '_self'
									: '_blank',
							} )
						}
						onRemove={ () => {
							unlink();
						} }
						forceIsEditingLink={ ! isURLSet }
					/>
				</Popover>
			) }
		</>
	);
}
