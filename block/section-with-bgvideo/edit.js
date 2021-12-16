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
	BaseControl,
	PanelBody,
	RangeControl,
	TextControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import { useMultipleOriginColorsAndGradients } from '@smb/hooks';
import { getVideoId } from './utils';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionBackgroundTextSettings,
	SectionBackground,
} from '../section/components/background';

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

		videoURL,
		videoWidth,
		videoHeight,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

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

	const TagName = 'div';

	const isItemsAlignmentable = 'fit' !== height;

	const classes = classnames(
		'smb-section',
		'smb-section-with-bgimage',
		'smb-section-with-bgvideo',
		className,
		{
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ `smb-section--${ height }` ]: !! height,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const bgvideoClasses = classnames( 'smb-section-with-bgimage__bgimage' );

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

	const sectionStyles = {
		color: textColor || undefined,
	};

	const maskStyles = {};
	if ( maskColor || maskGradientColor ) {
		maskStyles.backgroundColor = maskColor;
		maskStyles.backgroundImage = maskGradientColor;
	}

	const bgvideoStyles = {
		opacity: maskOpacity,
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

	const onChangeVideoUrl = ( value ) =>
		setAttributes( {
			videoURL: value,
		} );

	const onChangeVideoWidth = ( value ) =>
		setAttributes( {
			videoWidth: toNumber( value, 1, 960 ),
		} );

	const onChangeVideoHeight = ( value ) =>
		setAttributes( {
			videoHeight: toNumber( value, 1, 960 ),
		} );

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
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
					title={ __( 'Video settings', 'snow-monkey-blocks' ) }
					initialOpen={ true }
				>
					<BaseControl
						label={ __( 'YouTube URL', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgvideo/video-url"
					>
						<TextControl
							value={ videoURL }
							onChange={ onChangeVideoUrl }
						/>
					</BaseControl>

					<RangeControl
						label={ __( 'Video width', 'snow-monkey-blocks' ) }
						value={ videoWidth }
						onChange={ onChangeVideoWidth }
						min="1"
						max="960"
					/>

					<RangeControl
						label={ __( 'Video height', 'snow-monkey-blocks' ) }
						value={ videoHeight }
						onChange={ onChangeVideoHeight }
						min="1"
						max="960"
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
				<div
					className="smb-section-with-bgimage__mask"
					style={ maskStyles }
				/>
				<div className={ bgvideoClasses } style={ bgvideoStyles }>
					{ videoURL && (
						<img
							src={ `https://i.ytimg.com/vi/${ getVideoId(
								videoURL
							) }/maxresdefault.jpg` }
							alt=""
						/>
					) }
				</div>

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
