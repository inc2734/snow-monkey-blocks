import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	useInnerBlocksProps,
	useBlockProps,
	useSetting,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalImageSizeControl as ImageSizeControl,
} from '@wordpress/block-editor';

import {
	FocalPointPicker,
	PanelBody,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';
import Figure from '@smb/component/figure';

import { toNumber, getMediaType, isVideoType } from '@smb/helper';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionBackgroundTextSettings,
	generateStylesForSectionBackground,
	SectionBackground,
} from '../section/components/background';

// @todo For WordPress 6.0
import { useMultipleOriginColorsAndGradientsFallback } from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

const ALLOWED_TYPES = [ 'image', 'video' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';
const HORIZONTAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		align,

		lgImageID,
		lgImageURL,
		lgImageAlt,
		lgImageWidth,
		lgImageHeight,
		lgImageMediaType,
		lgImageRepeat,
		lgFocalPoint,
		lgImageSizeSlug,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageWidth,
		mdImageHeight,
		mdImageMediaType,
		mdImageRepeat,
		mdFocalPoint,
		mdImageSizeSlug,
		smImageID,
		smImageURL,
		smImageAlt,
		smImageWidth,
		smImageHeight,
		smImageMediaType,
		smImageRepeat,
		smFocalPoint,
		smImageSizeSlug,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		parallax,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
		containerAlign,
		disableContainerPadding,
		contentsMaxWidth,
		isSlim,

		backgroundText,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const { imageSizes, lgImage, mdImage, smImage } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				lgImage:
					lgImageID && isSelected
						? select( 'core' ).getMedia( lgImageID, {
								context: 'view',
						  } )
						: null,
				mdImage:
					mdImageID && isSelected
						? select( 'core' ).getMedia( mdImageID, {
								context: 'view',
						  } )
						: null,
				smImage:
					smImageID && isSelected
						? select( 'core' ).getMedia( smImageID, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},
		[ isSelected, lgImageID, mdImageID, smImageID, clientId ]
	);

	const lgImageSizeOptions = imageSizes
		.filter(
			( { slug } ) => lgImage?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const mdImageSizeOptions = imageSizes
		.filter(
			( { slug } ) => mdImage?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const smImageSizeOptions = imageSizes
		.filter(
			( { slug } ) => smImage?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const TagName = wrapperTagName;

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
			'js-bg-parallax': !! parallax,
		}
	);

	const bgimageClasses = classnames( 'smb-section-with-bgimage__bgimage', {
		'js-bg-parallax__bgimage': !! parallax,
	} );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]:
			!! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull:
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
		alignwide:
			'wide' === containerAlign ||
			( 'contents-wide' === containerAlign && 'full' === align ),
		'c-container--no-padding':
			disableContainerPadding &&
			( 'full' === containerAlign ||
				'contents-full' === containerAlign ) &&
			'full' === align,
	} );

	let headerContainerClasses = containerClasses
		.replace( 'c-container--no-padding', '' )
		.trim();
	if (
		'contents-wide' === containerAlign ||
		'contents-full' === containerAlign
	) {
		headerContainerClasses = headerContainerClasses
			.replace( 'alignfull', '' )
			.replace( 'alignwide', '' )
			.trim();
	}

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]:
				!! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const hasMask = 0 < Number( ( 1 - maskOpacity ).toFixed( 1 ) );

	const isLgVideo = 'video' === lgImageMediaType;
	const isLgImage =
		'image' === lgImageMediaType || undefined === lgImageMediaType;
	const hasLgBackground = !! lgImageURL;
	const showLgFocalPointPicker =
		isLgVideo || ( isLgImage && hasLgBackground && ! parallax );
	const lgPointValue =
		lgFocalPoint && ! parallax
			? `${ lgFocalPoint.x * 100 }% ${ lgFocalPoint.y * 100 }%`
			: undefined;

	const isMdVideo = 'video' === mdImageMediaType;
	const isMdImage =
		'image' === mdImageMediaType || undefined === mdImageMediaType;
	const hasMdBackground = !! mdImageURL;
	const showMdFocalPointPicker =
		isMdVideo || ( isMdImage && hasMdBackground && ! parallax );
	const mdPointValue =
		mdFocalPoint && ! parallax
			? `${ mdFocalPoint.x * 100 }% ${ mdFocalPoint.y * 100 }%`
			: undefined;

	const isSmVideo = 'video' === smImageMediaType;
	const isSmImage =
		'image' === smImageMediaType || undefined === smImageMediaType;
	const hasSmBackground = !! smImageURL;
	const showSmFocalPointPicker =
		isSmVideo || ( isSmImage && hasSmBackground && ! parallax );
	const smPointValue =
		smFocalPoint && ! parallax
			? `${ smFocalPoint.x * 100 }% ${ smFocalPoint.y * 100 }%`
			: undefined;

	const styles = {
		'--smb-section--color': textColor || undefined,
		'--smb-section--contents-wrapper-width':
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
		'--smb-section-with-bgimage--mask-color': maskColor || undefined,
		'--smb-section-with-bgimage--mask-image':
			maskGradientColor || undefined,
		'--smb-section-with-bgimage--mask-opacity': String( maskOpacity ),
		'--smb-section-with-bgimage--lg-media-position': lgPointValue,
		'--smb-section-with-bgimage--lg-repeatable-image':
			lgImageRepeat && !! lgImageURL ? `url(${ lgImageURL })` : undefined,
		'--smb-section-with-bgimage--md-media-position': mdPointValue,
		'--smb-section-with-bgimage--md-repeatable-image':
			mdImageRepeat && !! mdImageURL ? `url(${ mdImageURL })` : undefined,
		'--smb-section-with-bgimage--sm-media-position': smPointValue,
		'--smb-section-with-bgimage--sm-repeatable-image':
			smImageRepeat && !! smImageURL ? `url(${ smImageURL })` : undefined,
		...generateStylesForSectionBackground( {
			backgroundText,
		} ),
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [ 'smb-section__body' ],
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const fontSizes = useSetting( 'typography.fontSizes' ) || [];

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

	const onChangeParallax = ( value ) =>
		setAttributes( {
			parallax: value,
		} );

	const onSelectLgImage = ( media ) => {
		const newLgImageSizeSlug = !! media?.sizes[ lgImageSizeSlug ]
			? lgImageSizeSlug
			: DEFAULT_MEDIA_SIZE_SLUG;
		const newLgImageURL = media?.sizes[ newLgImageSizeSlug ]?.url;
		const newLgImageWidth = media?.sizes[ newLgImageSizeSlug ]?.width;
		const newLgImageHeight = media?.sizes[ newLgImageSizeSlug ]?.height;

		setAttributes( {
			lgImageURL: newLgImageURL,
			lgImageID: media.id,
			lgImageAlt: media.alt,
			lgImageWidth: newLgImageWidth,
			lgImageHeight: newLgImageHeight,
			lgImageMediaType: getMediaType( media ),
			lgImageSizeSlug: newLgImageSizeSlug,
		} );
	};

	const onSelectLgImageURL = ( newLgImageURL ) => {
		if ( newLgImageURL !== lgImageURL ) {
			setAttributes( {
				lgImageURL: newLgImageURL,
				lgImageID: 0,
				lgImageSizeSlug: DEFAULT_MEDIA_SIZE_SLUG,
				lgImageMediaType: getMediaType( {
					media_type: isVideoType( newLgImageURL )
						? 'video'
						: 'image',
				} ),
			} );
		}
	};

	const onChangeLgImageSizeSlug = ( value ) => {
		const newLgImageURL =
			lgImage?.media_details?.sizes?.[ value ]?.source_url;
		const newLgImageWidth = lgImage?.media_details?.sizes?.[ value ]?.width;
		const newLgImageHeight =
			lgImage?.media_details?.sizes?.[ value ]?.height;

		setAttributes( {
			lgImageURL: newLgImageURL,
			lgImageWidth: newLgImageWidth,
			lgImageHeight: newLgImageHeight,
			lgImageSizeSlug: value,
		} );
	};

	const onRemoveLgImage = () =>
		setAttributes( {
			lgImageURL: '',
			lgImageAlt: '',
			lgImageWidth: '',
			lgImageHeight: '',
			lgImageID: 0,
			lgImageMediaType: undefined,
		} );

	const onChangeLgImageRepeat = ( value ) =>
		setAttributes( {
			lgImageRepeat: value,
		} );

	const onChangeLgFocalPoint = ( value ) => {
		setAttributes( {
			lgFocalPoint: value,
		} );
	};

	const onSelectMdImage = ( media ) => {
		const newMdImageSizeSlug = !! media?.sizes[ mdImageSizeSlug ]
			? mdImageSizeSlug
			: DEFAULT_MEDIA_SIZE_SLUG;
		const newMdImageURL = media?.sizes[ newMdImageSizeSlug ]?.url;
		const newMdImageWidth = media?.sizes[ newMdImageSizeSlug ]?.width;
		const newMdImageHeight = media?.sizes[ newMdImageSizeSlug ]?.height;

		setAttributes( {
			mdImageURL: newMdImageURL,
			mdImageID: media.id,
			mdImageAlt: media.alt,
			mdImageWidth: newMdImageWidth,
			mdImageHeight: newMdImageHeight,
			mdImageMediaType: getMediaType( media ),
			mdImageSizeSlug: newMdImageSizeSlug,
		} );
	};

	const onSelectMdImageURL = ( newMdImageURL ) => {
		if ( newMdImageURL !== mdImageURL ) {
			setAttributes( {
				mdImageURL: newMdImageURL,
				mdImageID: 0,
				mdImageSizeSlug: DEFAULT_MEDIA_SIZE_SLUG,
				mdImageMediaType: getMediaType( {
					media_type: isVideoType( newMdImageURL )
						? 'video'
						: 'image',
				} ),
			} );
		}
	};

	const onChangeMdImageSizeSlug = ( value ) => {
		const newMdImageURL =
			mdImage?.media_details?.sizes?.[ value ]?.source_url;
		const newMdImageWidth = mdImage?.media_details?.sizes?.[ value ]?.width;
		const newMdImageHeight =
			mdImage?.media_details?.sizes?.[ value ]?.height;

		setAttributes( {
			mdImageURL: newMdImageURL,
			mdImageWidth: newMdImageWidth,
			mdImageHeight: newMdImageHeight,
			mdImageSizeSlug: value,
		} );
	};

	const onRemoveMdImage = () =>
		setAttributes( {
			mdImageURL: '',
			mdImageAlt: '',
			mdImageWidth: '',
			mdImageHeight: '',
			mdImageID: 0,
			mdImageMediaType: undefined,
		} );

	const onChangeMdImageRepeat = ( value ) =>
		setAttributes( {
			mdImageRepeat: value,
		} );

	const onChangeMdFocalPoint = ( value ) => {
		setAttributes( {
			lgFocalPoint: value,
		} );
	};

	const onSelectSmImage = ( media ) => {
		const newSmImageSizeSlug = !! media?.sizes[ smImageSizeSlug ]
			? smImageSizeSlug
			: DEFAULT_MEDIA_SIZE_SLUG;
		const newSmImageURL = media?.sizes[ newSmImageSizeSlug ]?.url;
		const newSmImageWidth = media?.sizes[ newSmImageSizeSlug ]?.width;
		const newSmImageHeight = media?.sizes[ newSmImageSizeSlug ]?.height;

		setAttributes( {
			smImageURL: newSmImageURL,
			smImageID: media.id,
			smImageAlt: media.alt,
			smImageWidth: newSmImageWidth,
			smImageHeight: newSmImageHeight,
			smImageMediaType: getMediaType( media ),
			smImageSizeSlug: newSmImageSizeSlug,
		} );
	};

	const onSelectSmImageURL = ( newSmImageURL ) => {
		if ( newSmImageURL !== smImageURL ) {
			setAttributes( {
				smImageURL: newSmImageURL,
				smImageID: 0,
				smImageSizeSlug: DEFAULT_MEDIA_SIZE_SLUG,
				smImageMediaType: getMediaType( {
					media_type: isVideoType( newSmImageURL )
						? 'video'
						: 'image',
				} ),
			} );
		}
	};

	const onChangeSmImageSizeSlug = ( value ) => {
		const newSmImageURL =
			smImage?.media_details?.sizes?.[ value ]?.source_url;
		const newSmImageWidth = smImage?.media_details?.sizes?.[ value ]?.width;
		const newSmImageHeight =
			smImage?.media_details?.sizes?.[ value ]?.height;

		setAttributes( {
			smImageURL: newSmImageURL,
			smImageWidth: newSmImageWidth,
			smImageHeight: newSmImageHeight,
			smImageSizeSlug: value,
		} );
	};

	const onRemoveSmImage = () =>
		setAttributes( {
			smImageURL: '',
			smImageAlt: '',
			smImageWidth: '',
			smImageHeight: '',
			smImageID: 0,
			smImageMediaType: undefined,
		} );

	const onChangeSmImageRepeat = ( value ) =>
		setAttributes( {
			smImageRepeat: value,
		} );

	const onChangeSmFocalPoint = ( value ) => {
		setAttributes( {
			lgFocalPoint: value,
		} );
	};

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

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( ( 1 - value ).toFixed( 1 ), 0, 1 ),
		} );

	const onChangeContentJustification = ( value ) =>
		setAttributes( {
			contentJustification: value,
		} );

	const onChangeItemsAlignment = ( value ) =>
		setAttributes( {
			itemsAlignment: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
		} );

	const onChangeSubtitle = ( value ) =>
		setAttributes( {
			subtitle: value,
		} );

	const onChangeWrapperTagName = ( value ) =>
		setAttributes( {
			wrapperTagName: value,
		} );

	const onChangeTitleTagName = ( value ) =>
		setAttributes( {
			titleTagName: value,
		} );

	const onChangeHeight = ( value ) =>
		setAttributes( {
			height: value,
		} );

	const onChangeContainerAlign = ( value ) =>
		setAttributes( {
			containerAlign: value,
		} );

	const onChangeDisableContainerPadding = ( value ) =>
		setAttributes( {
			disableContainerPadding: value,
		} );

	const onChangeContentsMaxWidth = ( value ) =>
		setAttributes( {
			contentsMaxWidth: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
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

				<PanelBasicSettings
					disableIsSlim={ !! contentsMaxWidth }
					disableContentsMaxWidth={ isSlim }
					disableContainerAlign={ 'full' !== align }
					disableDisableContainerPadding={
						( 'full' !== containerAlign &&
							'contents-full' !== containerAlign ) ||
						'full' !== align
					}
					settings={ [
						{
							wrapperTagNameValue: wrapperTagName,
							onWrapperTagNameChange: onChangeWrapperTagName,
						},
						{
							titleTagNameValue: titleTagName,
							onTitleTagNameChange: onChangeTitleTagName,
						},
						{
							heightValue: height,
							onHeightChange: onChangeHeight,
						},
						{
							contentsContainerControl: true,
							containerAlignValue: containerAlign,
							onContainerAlignChange: onChangeContainerAlign,
						},
						{
							disableContainerPaddingValue:
								disableContainerPadding,
							onDisableContainerPaddingChange:
								onChangeDisableContainerPadding,
						},
						{
							contentsMaxWidthValue: contentsMaxWidth,
							onContentsMaxWidthChange: onChangeContentsMaxWidth,
						},
						{
							isSlimValue: isSlim,
							onIsSlimChange: onChangeIsSlim,
						},
					] }
				/>

				<PanelBody
					title={ __( 'Media settings', 'snow-monkey-blocks' ) }
					initialOpen={ true }
				>
					{ ( hasLgBackground ||
						hasMdBackground ||
						hasSmBackground ) && (
						<ToggleControl
							label={ __(
								'Parallax (Deprecated)',
								'snow-monkey-blocks'
							) }
							checked={ parallax }
							onChange={ onChangeParallax }
							help={ __(
								'This setting is being retained for backwards compatibility and is not recommended for use. Its use may slow down the page display.',
								'snow-monkey-blocks'
							) }
						/>
					) }

					<ResponsiveTabPanel
						desktop={ () => (
							<>
								<Figure
									src={ lgImageURL }
									id={ lgImageID }
									alt={ lgImageAlt }
									width={ lgImageWidth }
									height={ lgImageHeight }
									onSelect={ onSelectLgImage }
									onSelectURL={ onSelectLgImageURL }
									onRemove={ onRemoveLgImage }
									mediaType={ lgImageMediaType }
									allowedTypes={ ALLOWED_TYPES }
								/>

								{ hasLgBackground && isLgImage && (
									<>
										<ToggleControl
											label={ __(
												'Repeat images',
												'snow-monkey-blocks'
											) }
											checked={ lgImageRepeat }
											onChange={ onChangeLgImageRepeat }
										/>

										<ImageSizeControl
											onChangeImage={
												onChangeLgImageSizeSlug
											}
											slug={ lgImageSizeSlug }
											imageSizeOptions={
												lgImageSizeOptions
											}
											isResizable={ false }
											imageSizeHelp={ __(
												'Select which image size to load.'
											) }
										/>
									</>
								) }

								{ showLgFocalPointPicker && (
									<FocalPointPicker
										label={ __(
											'Focal point picker',
											'snow-monkey-blocks'
										) }
										url={ lgImageURL }
										value={ lgFocalPoint }
										onChange={ onChangeLgFocalPoint }
									/>
								) }
							</>
						) }
						tablet={ () => (
							<>
								<Figure
									src={ mdImageURL }
									id={ mdImageID }
									alt={ mdImageAlt }
									width={ mdImageWidth }
									height={ mdImageHeight }
									onSelect={ onSelectMdImage }
									onSelectURL={ onSelectMdImageURL }
									onRemove={ onRemoveMdImage }
									mediaType={ mdImageMediaType }
									allowedTypes={ ALLOWED_TYPES }
								/>

								{ hasMdBackground && isMdImage && (
									<>
										<ToggleControl
											label={ __(
												'Repeat images',
												'snow-monkey-blocks'
											) }
											checked={ mdImageRepeat }
											onChange={ onChangeMdImageRepeat }
										/>

										<ImageSizeControl
											onChangeImage={
												onChangeMdImageSizeSlug
											}
											slug={ mdImageSizeSlug }
											imageSizeOptions={
												mdImageSizeOptions
											}
											isResizable={ false }
											imageSizeHelp={ __(
												'Select which image size to load.'
											) }
										/>
									</>
								) }

								{ showMdFocalPointPicker && (
									<FocalPointPicker
										label={ __(
											'Focal point picker',
											'snow-monkey-blocks'
										) }
										url={ mdImageURL }
										value={ mdFocalPoint }
										onChange={ onChangeMdFocalPoint }
									/>
								) }
							</>
						) }
						mobile={ () => (
							<>
								<Figure
									src={ smImageURL }
									id={ smImageID }
									alt={ smImageAlt }
									width={ smImageWidth }
									height={ smImageHeight }
									onSelect={ onSelectSmImage }
									onSelectURL={ onSelectSmImageURL }
									onRemove={ onRemoveSmImage }
									mediaType={ smImageMediaType }
									allowedTypes={ ALLOWED_TYPES }
								/>

								{ hasSmBackground && isSmImage && (
									<>
										<ToggleControl
											label={ __(
												'Repeat images',
												'snow-monkey-blocks'
											) }
											checked={ smImageRepeat }
											onChange={ onChangeSmImageRepeat }
										/>

										<ImageSizeControl
											onChangeImage={
												onChangeSmImageSizeSlug
											}
											slug={ smImageSizeSlug }
											imageSizeOptions={
												smImageSizeOptions
											}
											isResizable={ false }
											imageSizeHelp={ __(
												'Select which image size to load.'
											) }
										/>
									</>
								) }

								{ showSmFocalPointPicker && (
									<FocalPointPicker
										label={ __(
											'Focal point picker',
											'snow-monkey-blocks'
										) }
										url={ smImageURL }
										value={ smFocalPoint }
										onChange={ onChangeSmFocalPoint }
									/>
								) }
							</>
						) }
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
						gradientValue={ maskGradientColor }
						onColorChange={ onChangeMaskColor }
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

				<PanelSectionBackgroundTextSettings
					settings={ [
						{
							textValue: backgroundText.text,
							onTextChange: ( value ) => {
								setAttributes( {
									backgroundText: {
										...backgroundText,
										...{ text: value },
									},
								} );
							},
						},
						{
							fontSizeValue: backgroundText.fontSize,
							onFontSizeChange: ( value ) => {
								const filteredFontSizes = fontSizes.filter(
									( _fontSize ) => {
										return (
											!! _fontSize?.size &&
											value === _fontSize?.size
										);
									}
								);

								setAttributes( {
									backgroundText: {
										...backgroundText,
										...{
											fontSize: value,
											fontSizeSlug:
												0 < filteredFontSizes.length &&
												!! filteredFontSizes[ 0 ]?.slug
													? filteredFontSizes[ 0 ]
															.slug
													: '',
										},
									},
								} );
							},
						},
						{
							lineHeightValue: backgroundText.lineHeight,
							onLineHeightChange: ( value ) => {
								setAttributes( {
									backgroundText: {
										...backgroundText,
										...{ lineHeight: value },
									},
								} );
							},
						},
						{
							colorValue: backgroundText.color,
							onColorChange: ( value ) => {
								setAttributes( {
									backgroundText: {
										...backgroundText,
										...{ color: value },
									},
								} );
							},
						},
						{
							opacityValue: backgroundText.opacity,
							onOpacityChange: ( value ) => {
								setAttributes( {
									backgroundText: {
										...backgroundText,
										...{ opacity: value },
									},
								} );
							},
						},
						{
							positionValue: backgroundText.position,
							onPositionChange: ( value ) => {
								setAttributes( {
									backgroundText: {
										...backgroundText,
										...{ position: value },
									},
								} );
							},
						},
					] }
				/>
			</InspectorControls>

			<BlockControls gruop="block">
				{ isItemsAlignmentable && (
					<BlockVerticalAlignmentToolbar
						onChange={ onChangeItemsAlignment }
						value={ itemsAlignment }
					/>
				) }

				<JustifyToolbar
					allowedControls={ HORIZONTAL_JUSTIFY_CONTROLS }
					onChange={ onChangeContentJustification }
					value={ contentJustification }
				/>

				<AlignmentToolbar
					value={ contentsAlignment }
					onChange={ onChangeContentsAlignment }
				/>
			</BlockControls>

			<TagName { ...blockProps }>
				{ hasLgBackground && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--lg'
						) }
					>
						{ hasMask && (
							<div className="smb-section-with-bgimage__mask" />
						) }

						{ isLgImage &&
							( lgImageRepeat ? (
								<div className="smb-section-with-bgimage__repeatable-image">
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										width={ lgImageWidth }
										height={ lgImageHeight }
										className={ `wp-image-${ lgImageID }` }
									/>
								</div>
							) : (
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									width={ lgImageWidth }
									height={ lgImageHeight }
									className={ `wp-image-${ lgImageID }` }
								/>
							) ) }

						{ isLgVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ lgImageURL }
								width={ lgImageWidth }
								height={ lgImageHeight }
							/>
						) }
					</div>
				) }

				{ hasMdBackground && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--md'
						) }
					>
						{ hasMask && (
							<div className="smb-section-with-bgimage__mask" />
						) }

						{ isMdImage &&
							( mdImageRepeat ? (
								<div className="smb-section-with-bgimage__repeatable-image">
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										width={ mdImageWidth }
										height={ mdImageHeight }
										className={ `wp-image-${ mdImageID }` }
									/>
								</div>
							) : (
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									width={ mdImageWidth }
									height={ mdImageHeight }
									className={ `wp-image-${ mdImageID }` }
								/>
							) ) }

						{ isMdVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ mdImageURL }
								width={ mdImageWidth }
								height={ mdImageHeight }
							/>
						) }
					</div>
				) }

				{ hasSmBackground && (
					<div
						className={ classnames(
							bgimageClasses,
							'smb-section-with-bgimage__bgimage--sm'
						) }
					>
						{ hasMask && (
							<div className="smb-section-with-bgimage__mask" />
						) }

						{ isSmImage &&
							( smImageRepeat ? (
								<div className="smb-section-with-bgimage__repeatable-image">
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										width={ smImageWidth }
										height={ smImageHeight }
										className={ `wp-image-${ smImageID }` }
									/>
								</div>
							) : (
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									width={ smImageWidth }
									height={ smImageHeight }
									className={ `wp-image-${ smImageID }` }
								/>
							) ) }

						{ isSmVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ smImageURL }
								width={ smImageWidth }
								height={ smImageHeight }
							/>
						) }
					</div>
				) }

				<SectionBackground
					{ ...{
						backgroundText,
						containerClasses,
					} }
				/>

				<div className={ innerClasses }>
					<div className={ containerClasses }>
						<div className={ contentsWrapperClasses }>
							<Header
								isSelected={ isSelected }
								hasContainer={
									( disableContainerPadding &&
										'full' === containerAlign &&
										'full' === align ) ||
									'contents-wide' === containerAlign ||
									'contents-full' === containerAlign
								}
								containerClassName={ headerContainerClasses }
								settings={ [
									{
										subtitleValue: subtitle,
										onSubtitleChange: onChangeSubtitle,
									},
									{
										titleTagNameValue: titleTagName,
										titleValue: title,
										onTitleChange: onChangeTitle,
									},
									{
										ledeValue: lede,
										onLedeChange: onChangeLede,
									},
								] }
							/>

							<div { ...innerBlocksProps } />
						</div>
					</div>
				</div>
			</TagName>
		</>
	);
}
