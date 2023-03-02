import classnames from 'classnames';

import {
	BaseControl,
	PanelBody,
	Popover,
	RangeControl,
	SelectControl,
	ToggleControl,
	ToolbarButton,
} from '@wordpress/components';

import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalLinkControl as LinkControl,
	__experimentalImageSizeControl as ImageSizeControl,
} from '@wordpress/block-editor';

import { useMergeRefs } from '@wordpress/compose';
import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import { toNumber } from '@smb/helper';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

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

	const onChangeImageSize = ( value ) =>
		setAttributes( {
			imageSize: value,
		} );

	const onChangeBlur = ( value ) =>
		setAttributes( {
			blur: value,
		} );

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( ( 1 - value ).toFixed( 1 ), 0, 1 ),
		} );

	const onChangeMaskColor = ( value ) =>
		setAttributes( {
			maskColor: value,
		} );

	const onChangeMaskGradientColor = ( value ) =>
		setAttributes( {
			maskGradientColor: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const onChangeUrl = ( {
		url: newUrl,
		opensInNewTab: newOpensInNewTab,
	} ) => {
		setAttributes( {
			url: newUrl,
			target: ! newOpensInNewTab ? '_self' : '_blank',
		} );
	};

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

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
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
							onColorChange: onChangeTextColor,
							label: __( 'Text color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				></PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Image', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/items-banner/image"
					>
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
					</BaseControl>

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
						onChange={ onChangeImageSize }
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

					<ToggleControl
						label={ __( 'Shade off', 'snow-monkey-blocks' ) }
						checked={ blur }
						onChange={ onChangeBlur }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Mask', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						className="smb-inpanel-color-gradient-control"
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ maskColor }
						onColorChange={ onChangeMaskColor }
						gradientValue={ maskGradientColor }
						onGradientChange={ onChangeMaskGradientColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
					/>

					<RangeControl
						label={ __( 'Opacity', 'snow-monkey-blocks' ) }
						value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
						onChange={ onChangeMaskOpacity }
						min={ 0 }
						max={ 1 }
						step={ 0.1 }
					/>
				</PanelBody>
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
										onChange={ onChangeTitle }
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
										onChange={ onChangeLede }
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
					onChange={ onChangeContentsAlignment }
				/>

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
						value={ { url, opensInNewTab } }
						onChange={ onChangeUrl }
						onRemove={ () => {
							unlink();
							richTextRef.current?.focus();
						} }
						forceIsEditingLink={ isEditingURL }
					/>
				</Popover>
			) }
		</>
	);
}
