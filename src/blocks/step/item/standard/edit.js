import classnames from 'classnames';

import {
	BlockControls,
	InnerBlocks,
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import {
	Popover,
	SelectControl,
	ToolbarButton,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { useState, useRef } from '@wordpress/element';
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
		title,
		numberColor,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		linkLabel,
		linkURL,
		linkTarget,
		linkColor,
		templateLock,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! linkURL;
	const opensInNewTab = linkTarget === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

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

	const classes = classnames(
		'smb-step__item',
		`smb-step__item--image-${ imagePosition }`,
		className
	);

	const itemNumberStyles = {
		backgroundColor: numberColor || undefined,
	};

	const itemLinkStyles = {
		color: linkColor || undefined,
	};

	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__item__summary',
		},
		{
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const unlink = () => {
		setAttributes( {
			linkURL: undefined,
			linkTarget: undefined,
		} );
		setIsEditingURL( false );
	};

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: numberColor,
							onColorChange: ( value ) =>
								setAttributes( {
									numberColor: value,
								} ),
							label: __( 'Number color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: linkColor,
							onColorChange: ( value ) =>
								setAttributes( {
									linkColor: value,
								} ),
							label: __( 'Link color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							imagePosition !==
							metadata.attributes.imagePosition.default
						}
						isShownByDefault
						label={ __( 'Image position', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								imagePosition:
									metadata.attributes.imagePosition.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Image position',
								'snow-monkey-blocks'
							) }
							value={ imagePosition }
							onChange={ ( value ) =>
								setAttributes( {
									imagePosition: value,
								} )
							}
							options={ [
								{
									value: 'left',
									label: __(
										'Left side',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'center',
									label: __( 'Center', 'snow-monkey-blocks' ),
								},
								{
									value: 'right',
									label: __(
										'Right side',
										'snow-monkey-blocks'
									),
								},
							] }
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
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-step__item__title">
					<div
						className="smb-step__item__number"
						style={ itemNumberStyles }
					/>

					<RichText
						tagName="span"
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
					/>
				</div>

				<div className="smb-step__item__body">
					{ ( !! imageURL || isSelected ) && (
						<div className="smb-step__item__figure">
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

					<div { ...innerBlocksProps } />

					<span
						ref={ setPopoverAnchor }
						className="smb-step__item__link"
						href={ linkURL }
						style={ itemLinkStyles }
						target={
							'_self' === linkTarget ? undefined : linkTarget
						}
						rel={
							'_self' === linkTarget
								? undefined
								: 'noopener noreferrer'
						}
					>
						<i className="fas fa-circle-arrow-right" />
						<RichText
							className="smb-step__item__link__label"
							placeholder={ __(
								'Link text',
								'snow-monkey-blocks'
							) }
							value={ linkLabel }
							multiline={ false }
							onChange={ ( value ) =>
								setAttributes( {
									linkLabel: value,
								} )
							}
							withoutInteractiveFormatting={ true }
							ref={ richTextRef }
						/>
					</span>
				</div>
			</div>

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
						value={ { ur: linkURL, opensInNewTab } }
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
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ ! isURLSet }
					/>
				</Popover>
			) }
		</>
	);
}
