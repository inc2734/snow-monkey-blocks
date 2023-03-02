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
	__experimentalImageSizeControl as ImageSizeControl,
} from '@wordpress/block-editor';

import {
	PanelBody,
	Popover,
	SelectControl,
	ToolbarButton,
} from '@wordpress/components';

import { useMergeRefs } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

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

	const ref = useRef();
	const richTextRef = useRef();

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-step__item__summary',
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeImagePosition = ( value ) =>
		setAttributes( {
			imagePosition: value,
		} );

	const onChangeNumberColor = ( value ) =>
		setAttributes( {
			numberColor: value,
		} );

	const onChangeLinkColor = ( value ) =>
		setAttributes( {
			linkColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onSelectImage = ( media ) => {
		const newImageSizeSlug = !! media?.sizes[ imageSizeSlug ]
			? imageSizeSlug
			: DEFAULT_MEDIA_SIZE_SLUG;
		const newImageUrl = media?.sizes[ newImageSizeSlug ]?.url;
		const newImageWidth = media?.sizes[ newImageSizeSlug ]?.width;
		const newImageHeight = media?.sizes[ newImageSizeSlug ]?.height;

		setAttributes( {
			imageURL: newImageUrl,
			imageID: media.id,
			imageAlt: media.alt,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
			imageSizeSlug: newImageSizeSlug,
		} );
	};

	const onSelectImageURL = ( newURL ) => {
		if ( newURL !== imageURL ) {
			setAttributes( {
				imageURL: newURL,
				imageID: 0,
				mediaSizeSlug: DEFAULT_MEDIA_SIZE_SLUG,
			} );
		}
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
			imageID: 0,
		} );

	const onChangeLinkLabel = ( value ) =>
		setAttributes( {
			linkLabel: value,
		} );

	const onChangeLinkUrl = ( {
		url: newUrl,
		opensInNewTab: newOpensInNewTab,
	} ) =>
		setAttributes( {
			linkURL: newUrl,
			linkTarget: ! newOpensInNewTab ? '_self' : '_blank',
		} );

	const onChangeImageSizeSlug = ( value ) => {
		const newImageUrl = image?.media_details?.sizes?.[ value ]?.source_url;
		const newImageWidth = image?.media_details?.sizes?.[ value ]?.width;
		const newImageHeight = image?.media_details?.sizes?.[ value ]?.height;

		setAttributes( {
			imageURL: newImageUrl,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
			imageSizeSlug: value,
		} );
	};

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
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: numberColor,
							onColorChange: onChangeNumberColor,
							label: __( 'Number color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: linkColor,
							onColorChange: onChangeLinkColor,
							label: __( 'Link color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				></PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __( 'Image position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						onChange={ onChangeImagePosition }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'center',
								label: __( 'Center', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<ImageSizeControl
						onChangeImage={ onChangeImageSizeSlug }
						slug={ imageSizeSlug }
						imageSizeOptions={ imageSizeOptions }
						isResizable={ false }
						imageSizeHelp={ __(
							'Select which image size to load.'
						) }
					/>
				</PanelBody>
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
						onChange={ onChangeTitle }
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
								onSelect={ onSelectImage }
								onSelectURL={ onSelectImageURL }
								onRemove={ onRemoveImage }
								allowedTypes={ ALLOWED_TYPES }
							/>
						</div>
					) }

					<div { ...innerBlocksProps } />

					<span
						ref={ useMergeRefs( [ setPopoverAnchor, ref ] ) }
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
							onChange={ onChangeLinkLabel }
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
									value={ { ur: linkURL, opensInNewTab } }
									onChange={ onChangeLinkUrl }
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
