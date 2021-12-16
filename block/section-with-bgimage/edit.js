import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useInnerBlocksProps,
	useBlockProps,
	useSetting,
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
import ImageSizeSelectControl from '@smb/component/image-size-select-control';

import { useMultipleOriginColorsAndGradients } from '@smb/hooks';

import {
	toNumber,
	getMediaType,
	getResizedImages,
	isVideoType,
} from '@smb/helper';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionBackgroundTextSettings,
	SectionBackground,
} from '../section/components/background';

const IMAGE_ALLOWED_TYPES = [ 'image', 'video' ];
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
		lgImageMediaType,
		lgImageRepeat,
		lgFocalPoint,
		lgImageSizeSlug,
		mdImageID,
		mdImageURL,
		mdImageAlt,
		mdImageMediaType,
		mdImageRepeat,
		mdFocalPoint,
		mdImageSizeSlug,
		smImageID,
		smImageURL,
		smImageAlt,
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

	const { lgResizedImages, mdResizedImages, smResizedImages } = useSelect(
		( select ) => {
			let _lgResizedImages = {};
			let _mdResizedImages = {};
			let _smResizedImages = {};

			const { getMedia } = select( 'core' );
			const { getSettings } = select( 'core/block-editor' );
			const { imageSizes } = getSettings();

			if ( !! lgImageID ) {
				const media = getMedia( lgImageID );
				if ( !! media ) {
					_lgResizedImages = getResizedImages( imageSizes, media );
				}
			}

			if ( !! mdImageID ) {
				const media = getMedia( mdImageID );
				if ( !! media ) {
					_mdResizedImages = getResizedImages( imageSizes, media );
				}
			}

			if ( !! smImageID ) {
				const media = getMedia( smImageID );
				if ( !! media ) {
					_smResizedImages = getResizedImages( imageSizes, media );
				}
			}

			return {
				lgResizedImages: _lgResizedImages,
				mdResizedImages: _mdResizedImages,
				smResizedImages: _smResizedImages,
			};
		},
		[ lgImageID, mdImageID, smImageID ]
	);

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
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
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
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]: !! contentsAlignment,
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

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor || maskGradientColor ) {
		maskStyles.backgroundColor = maskColor;
		maskStyles.backgroundImage = maskGradientColor;
	}

	const lgVideoStyles = {
		opacity: maskOpacity,
		objectPosition: lgPointValue,
	};

	const norepeatableLgImageStyles = {
		opacity: maskOpacity,
		objectPosition: lgPointValue,
	};

	const repeatableLgImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ lgImageURL } )`,
		backgroundPosition: lgPointValue,
	};

	const mdVideoStyles = {
		opacity: maskOpacity,
		objectPosition: mdPointValue,
	};

	const norepeatableMdImageStyles = {
		opacity: maskOpacity,
		objectPosition: mdPointValue,
	};

	const repeatableMdImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ mdImageURL } )`,
		backgroundPosition: mdPointValue,
	};

	const smVideoStyles = {
		opacity: maskOpacity,
		objectPosition: smPointValue,
	};

	const norepeatableSmImageStyles = {
		opacity: maskOpacity,
		objectPosition: smPointValue,
	};

	const repeatableSmImageStyles = {
		opacity: maskOpacity,
		backgroundImage: `url( ${ smImageURL } )`,
		backgroundPosition: smPointValue,
	};

	const innerStyles = {};

	const contentsWrapperStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
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
		const newImageURL =
			!! media.sizes && !! media.sizes[ lgImageSizeSlug ]
				? media.sizes[ lgImageSizeSlug ].url
				: media.url;

		setAttributes( {
			lgImageURL: newImageURL,
			lgImageID: media.id,
			lgImageAlt: media.alt,
			lgImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectLgImageURL = ( newURL ) => {
		if ( newURL !== lgImageURL ) {
			setAttributes( {
				lgImageURL: newURL,
				lgImageID: 0,
				lgImageSizeSlug: 'large',
				lgImageMediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
			} );
		}
	};

	const onChangeLgImageSizeSlug = ( value ) => {
		let newImageURL = lgImageURL;
		if ( !! lgResizedImages[ value ] && !! lgResizedImages[ value ].url ) {
			newImageURL = lgResizedImages[ value ].url;
		}

		setAttributes( {
			lgImageURL: newImageURL,
			lgImageSizeSlug: value,
		} );
	};

	const onRemoveLgImage = () =>
		setAttributes( {
			lgImageURL: '',
			lgImageAlt: '',
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
		const newImageURL =
			!! media.sizes && !! media.sizes[ mdImageSizeSlug ]
				? media.sizes[ mdImageSizeSlug ].url
				: media.url;

		setAttributes( {
			mdImageURL: newImageURL,
			mdImageID: media.id,
			mdImageAlt: media.alt,
			mdImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectMdImageURL = ( newURL ) => {
		if ( newURL !== mdImageURL ) {
			setAttributes( {
				mdImageURL: newURL,
				mdImageID: 0,
				lgImageSizeSlug: 'large',
				mdImageMediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
			} );
		}
	};

	const onChangeMdImageSizeSlug = ( value ) => {
		let newImageURL = mdImageURL;
		if ( !! mdResizedImages[ value ] && !! mdResizedImages[ value ].url ) {
			newImageURL = mdResizedImages[ value ].url;
		}

		setAttributes( {
			mdImageURL: newImageURL,
			mdImageSizeSlug: value,
		} );
	};

	const onRemoveMdImage = () =>
		setAttributes( {
			mdImageURL: '',
			mdImageAlt: '',
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
		const newImageURL =
			!! media.sizes && !! media.sizes[ smImageSizeSlug ]
				? media.sizes[ smImageSizeSlug ].url
				: media.url;

		setAttributes( {
			smImageURL: newImageURL,
			smImageID: media.id,
			smImageAlt: media.alt,
			smImageMediaType: getMediaType( media ),
		} );
	};

	const onSelectSmImageURL = ( newURL ) => {
		if ( newURL !== smImageURL ) {
			setAttributes( {
				smImageURL: newURL,
				smImageID: 0,
				smImageSizeSlug: 'large',
				smImageMediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
			} );
		}
	};

	const onChangeSmImageSizeSlug = ( value ) => {
		let newImageURL = smImageURL;
		if ( !! smResizedImages[ value ] && !! smResizedImages[ value ].url ) {
			newImageURL = smResizedImages[ value ].url;
		}

		setAttributes( {
			smImageURL: newImageURL,
			smImageSizeSlug: value,
		} );
	};

	const onRemoveSmImage = () =>
		setAttributes( {
			smImageURL: '',
			smImageAlt: '',
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
							disableContainerPaddingValue: disableContainerPadding,
							onDisableContainerPaddingChange: onChangeDisableContainerPadding,
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
									onSelect={ onSelectLgImage }
									onSelectURL={ onSelectLgImageURL }
									onRemove={ onRemoveLgImage }
									mediaType={ lgImageMediaType }
									allowedTypes={ IMAGE_ALLOWED_TYPES }
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

										<ImageSizeSelectControl
											label={ __(
												'Images size',
												'snow-monkey-blocks'
											) }
											id={ lgImageID }
											slug={ lgImageSizeSlug }
											onChange={ onChangeLgImageSizeSlug }
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
									onSelect={ onSelectMdImage }
									onSelectURL={ onSelectMdImageURL }
									onRemove={ onRemoveMdImage }
									mediaType={ mdImageMediaType }
									allowedTypes={ IMAGE_ALLOWED_TYPES }
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

										<ImageSizeSelectControl
											label={ __(
												'Images size',
												'snow-monkey-blocks'
											) }
											id={ mdImageID }
											slug={ mdImageSizeSlug }
											onChange={ onChangeMdImageSizeSlug }
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
									onSelect={ onSelectSmImage }
									onSelectURL={ onSelectSmImageURL }
									onRemove={ onRemoveSmImage }
									mediaType={ smImageMediaType }
									allowedTypes={ IMAGE_ALLOWED_TYPES }
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

										<ImageSizeSelectControl
											label={ __(
												'Images size',
												'snow-monkey-blocks'
											) }
											id={ smImageID }
											slug={ smImageSizeSlug }
											onChange={ onChangeSmImageSizeSlug }
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
							<div
								className="smb-section-with-bgimage__mask"
								style={ maskStyles }
							/>
						) }

						{ isLgImage &&
							( lgImageRepeat ? (
								<div
									className="smb-section-with-bgimage__repeatable-image"
									style={ repeatableLgImageStyles }
								>
									<img
										src={ lgImageURL }
										alt={ lgImageAlt }
										className={ `wp-image-${ lgImageID }` }
										style={ norepeatableLgImageStyles }
									/>
								</div>
							) : (
								<img
									src={ lgImageURL }
									alt={ lgImageAlt }
									className={ `wp-image-${ lgImageID }` }
									style={ norepeatableLgImageStyles }
								/>
							) ) }

						{ isLgVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ lgImageURL }
								style={ lgVideoStyles }
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
							<div
								className="smb-section-with-bgimage__mask"
								style={ maskStyles }
							/>
						) }

						{ isMdImage &&
							( mdImageRepeat ? (
								<div
									className="smb-section-with-bgimage__repeatable-image"
									style={ repeatableMdImageStyles }
								>
									<img
										src={ mdImageURL }
										alt={ mdImageAlt }
										className={ `wp-image-${ mdImageID }` }
										style={ norepeatableMdImageStyles }
									/>
								</div>
							) : (
								<img
									src={ mdImageURL }
									alt={ mdImageAlt }
									className={ `wp-image-${ mdImageID }` }
									style={ norepeatableMdImageStyles }
								/>
							) ) }

						{ isMdVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ mdImageURL }
								style={ mdVideoStyles }
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
							<div
								className="smb-section-with-bgimage__mask"
								style={ maskStyles }
							/>
						) }

						{ isSmImage &&
							( smImageRepeat ? (
								<div
									className="smb-section-with-bgimage__repeatable-image"
									style={ repeatableSmImageStyles }
								>
									<img
										src={ smImageURL }
										alt={ smImageAlt }
										className={ `wp-image-${ smImageID }` }
										style={ norepeatableSmImageStyles }
									/>
								</div>
							) : (
								<img
									src={ smImageURL }
									alt={ smImageAlt }
									className={ `wp-image-${ smImageID }` }
									style={ norepeatableSmImageStyles }
								/>
							) ) }

						{ isSmVideo && (
							<video
								playsInline
								loop
								autoPlay
								muted
								src={ smImageURL }
								style={ smVideoStyles }
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

				<div className={ innerClasses } style={ innerStyles }>
					<div className={ containerClasses }>
						<div
							className={ contentsWrapperClasses }
							style={ contentsWrapperStyles }
						>
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
