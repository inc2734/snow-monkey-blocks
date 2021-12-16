import classnames from 'classnames';

import { useState, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

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
	__experimentalBlockAlignmentMatrixControl as BlockAlignmentMatrixControl,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import { link as linkIcon, linkOff as linkOffIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import LinkControl from '@smb/component/link-control';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';
import { toNumber, getResizedImages } from '@smb/helper';
import { useMultipleOriginColorsAndGradients } from '@smb/hooks';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		title,
		lede,
		url,
		target,
		blur,
		textColor,
		maskColor,
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

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const toggleLinkUI = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUI = () => setIsLinkUIOpen( false );

	const { resizedImages } = useSelect(
		( select ) => {
			if ( ! imageID ) {
				return {
					resizedImages: {},
				};
			}

			const { getMedia } = select( 'core' );
			const media = getMedia( imageID );
			if ( ! media ) {
				return {
					resizedImages: {},
				};
			}

			const { getSettings } = select( 'core/block-editor' );
			const { imageSizes } = getSettings();

			return {
				resizedImages: getResizedImages( imageSizes, media ),
			};
		},
		[ imageID ]
	);

	const classes = classnames( 'c-row__col', className );
	const bannerClasses = classnames(
		'smb-items__banner',
		`smb-items__banner--${ imageSize }`,
		{
			'smb-items__banner--blur': blur,
			[ `smb-items__banner--${ contentsAlignment }` ]: !! contentsAlignment,
		}
	);

	const styles = {
		color: textColor || undefined,
	};

	const imgStyles = {
		opacity: maskOpacity,
	};

	const maskStyles = {
		backgroundColor: maskColor || undefined,
	};

	const ref = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref,
	} );

	const onSelectImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes[ imageSizeSlug ]
				? media.sizes[ imageSizeSlug ].url
				: media.url;

		const newImageWidth =
			!! media.sizes && !! media.sizes[ imageSizeSlug ]
				? media.sizes[ imageSizeSlug ].width
				: media.width;

		const newImageHeight =
			!! media.sizes && !! media.sizes[ imageSizeSlug ]
				? media.sizes[ imageSizeSlug ].height
				: media.height;

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
		} );
	};

	const onSelectImageURL = ( newURL ) => {
		if ( newURL !== imageURL ) {
			setAttributes( {
				imageURL: newURL,
				imageID: 0,
				imageSizeSlug: 'large',
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

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			url: newUrl,
			target: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	const onChangeImageSizeSlug = ( value ) => {
		let newImageURL = imageURL;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].url ) {
			newImageURL = resizedImages[ value ].url;
		}

		let newImageWidth = imageWidth;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].width ) {
			newImageWidth = resizedImages[ value ].width;
		}

		let newImageHeight = imageHeight;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].height ) {
			newImageHeight = resizedImages[ value ].height;
		}

		setAttributes( {
			imageURL: newImageURL,
			imageWidth: newImageWidth,
			imageHeight: newImageHeight,
			imageSizeSlug: value,
		} );
	};

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

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
							onSelect={ onSelectImage }
							onSelectURL={ onSelectImageURL }
							onRemove={ onRemoveImage }
							isSelected={ isSelected }
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

					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ imageID }
						slug={ imageSizeSlug }
						onChange={ onChangeImageSizeSlug }
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
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ maskColor }
						onColorChange={ onChangeMaskColor }
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
							<div
								className="smb-items__banner__figure__mask"
								style={ maskStyles }
							/>
						) }
						{ !! imageURL ? (
							<img
								src={ imageURL }
								alt={ imageAlt }
								className={ `wp-image-${ imageID }` }
								style={ imgStyles }
							/>
						) : (
							<div
								className="smb-items__banner__figure__dummy"
								style={ imgStyles }
							/>
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

				{ ! urlIsSet && (
					<ToolbarButton
						icon={ linkIcon }
						label={ __( 'Link', 'snow-monkey-blocks' ) }
						aria-expanded={ isLinkUIOpen }
						onClick={ toggleLinkUI }
					/>
				) }
				{ urlIsSetandSelected && (
					<ToolbarButton
						isPressed
						icon={ linkOffIcon }
						label={ __( 'Unlink', 'snow-monkey-blocks' ) }
						onClick={ () => onChangeUrl( '', false ) }
					/>
				) }
			</BlockControls>

			{ ( isLinkUIOpen || urlIsSetandSelected ) && (
				<Popover
					position="bottom center"
					anchorRef={ ref.current }
					onClose={ closeLinkUI }
				>
					<LinkControl
						url={ url }
						target={ target }
						onChange={ onChangeUrl }
					/>
				</Popover>
			) }
		</>
	);
}
