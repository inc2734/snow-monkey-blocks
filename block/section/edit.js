import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import { PanelBasicSettings } from './components/basic';
import { Edit as Header } from './components/header';

import {
	PanelSectionMovableBackgroundSettings,
	PanelSectionFixedBackgroundSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
	SectionBackground,
} from './components/background';

const HORIZONTAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		textColor,
		contentsAlignment,
		contentJustification,
		itemsAlignment,

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		height,
		containerAlign,
		contentsMaxWidth,
		isSlim,

		backgroundHorizontalPosition,
		backgroundVerticalPosition,
		isBackgroundNoOver,
		backgroundColor,
		backgroundGradientColor,
		backgroundTexture,
		backgroundTextureOpacity,
		fixedBackgroundColor,
		fixedBackgroundGradientColor,
		fixedBackgroundTexture,
		fixedBackgroundTextureOpacity,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const isItemsAlignmentable = 'fit' !== height;

	const TagName = wrapperTagName;
	const classes = classnames( 'smb-section', className, {
		[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
		[ `smb-section--${ height }` ]: !! height,
		[ `is-items-alignment-${ itemsAlignment }` ]:
			!! itemsAlignment && isItemsAlignmentable,
	} );

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign,
		alignwide: 'wide' === containerAlign,
	} );

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			[ `smb-section__contents-wrapper--${ contentsAlignment }` ]: !! contentsAlignment,
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}

	const contentsWrapperStyles = {
		maxWidth:
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-section__body',
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
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

	const onChangeSubtitle = ( value ) =>
		setAttributes( {
			subtitle: value,
		} );

	const onChangeLede = ( value ) =>
		setAttributes( {
			lede: value,
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

	const onChangeContentsMaxWidth = ( value ) =>
		setAttributes( {
			contentsMaxWidth: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
		} );

	const onChangeBackgroundHorizontalPosition = ( value ) =>
		setAttributes( {
			backgroundHorizontalPosition: toNumber( value, -90, 90 ),
		} );

	const onChangeBackgroundVerticalPosition = ( value ) =>
		setAttributes( {
			backgroundVerticalPosition: toNumber( value, -90, 90 ),
		} );

	const onChangeIsBackgroundNoOver = ( value ) =>
		setAttributes( {
			isBackgroundNoOver: value,
		} );

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeBackgroundGradientColor = ( value ) =>
		setAttributes( {
			backgroundGradientColor: value,
		} );

	const onChangeBackgroundTexture = ( value ) =>
		setAttributes( {
			backgroundTexture: value,
		} );

	const onChangeBackgroundTextureOpacity = ( value ) =>
		setAttributes( {
			backgroundTextureOpacity: toNumber( value, 0.1, 1 ),
		} );

	const onChangeFixedBackgroundColor = ( value ) =>
		setAttributes( {
			fixedBackgroundColor: value,
		} );

	const onChangeFixedBackgroundGradientColor = ( value ) =>
		setAttributes( {
			fixedBackgroundGradientColor: value,
		} );

	const onChangeFixedBackgroundTexture = ( value ) =>
		setAttributes( {
			fixedBackgroundTexture: value,
		} );

	const onChangeFixedBackgroundTextureOpacity = ( value ) =>
		setAttributes( {
			fixedBackgroundTextureOpacity: toNumber( value, 0.1, 1 ),
		} );

	const onChangeTopDividerType = ( value ) =>
		setAttributes( {
			topDividerType: value,
		} );

	const onChangeTopDividerLevel = ( value ) =>
		setAttributes( {
			topDividerLevel: toNumber( value, -100, 100 ),
		} );

	const onChangeTopDividerColor = ( value ) =>
		setAttributes( {
			topDividerColor: value,
		} );

	const onChangeTopDividerVerticalPosition = ( value ) =>
		setAttributes( {
			topDividerVerticalPosition: value,
		} );

	const onChangeBottomDividerType = ( value ) =>
		setAttributes( {
			bottomDividerType: value,
		} );

	const onChangeBottomDividerLevel = ( value ) =>
		setAttributes( {
			bottomDividerLevel: toNumber( value, -100, 100 ),
		} );

	const onChangeBottomDividerColor = ( value ) =>
		setAttributes( {
			bottomDividerColor: value,
		} );

	const onChangeBottomDividerVerticalPosition = ( value ) =>
		setAttributes( {
			bottomDividerVerticalPosition: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBasicSettings
					disableIsSlim={ !! contentsMaxWidth }
					disableContentsMaxWidth={ isSlim }
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
							containerAlignValue: containerAlign,
							onContainerAlignChange: onChangeContainerAlign,
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

				<PanelSectionMovableBackgroundSettings
					hasColor={ backgroundColor || backgroundGradientColor }
					disableNoOver={
						0 === backgroundHorizontalPosition &&
						0 === backgroundVerticalPosition
					}
					hasTexture={ !! backgroundTexture }
					settings={ [
						{
							colorValue: backgroundColor,
							gradientValue: backgroundGradientColor,
							onColorChange: onChangeBackgroundColor,
							onGradientChange: onChangeBackgroundGradientColor,
						},
						{
							horizontalPositionValue: backgroundHorizontalPosition,
							onHorizontalPositionChange: onChangeBackgroundHorizontalPosition,
						},
						{
							verticalPositionValue: backgroundVerticalPosition,
							onVerticalPositionChange: onChangeBackgroundVerticalPosition,
						},
						{
							isNoOverValue: isBackgroundNoOver,
							onIsNoOverChange: onChangeIsBackgroundNoOver,
						},
						{
							textureValue: backgroundTexture,
							onTextureChange: onChangeBackgroundTexture,
						},
						{
							textureOpacityValue: backgroundTextureOpacity,
							onTextureOpacityChange: onChangeBackgroundTextureOpacity,
						},
					] }
				/>

				<PanelSectionFixedBackgroundSettings
					hasTexture={ !! fixedBackgroundTexture }
					settings={ [
						{
							colorValue: fixedBackgroundColor,
							gradientValue: fixedBackgroundGradientColor,
							onColorChange: onChangeFixedBackgroundColor,
							onGradientChange: onChangeFixedBackgroundGradientColor,
						},
						{
							textureValue: fixedBackgroundTexture,
							onTextureChange: onChangeFixedBackgroundTexture,
						},
						{
							textureOpacityValue: fixedBackgroundTextureOpacity,
							onTextureOpacityChange: onChangeFixedBackgroundTextureOpacity,
						},
					] }
				/>

				<PanelSectionTopDividerSettings
					settings={ [
						{
							typeValue: topDividerType,
							onTypeChange: onChangeTopDividerType,
						},
						{
							levelValue: topDividerLevel,
							onLevelChange: onChangeTopDividerLevel,
						},
						{
							colorValue: topDividerColor,
							onColorChange: onChangeTopDividerColor,
						},
						{
							verticalPosition: topDividerVerticalPosition,
							onVerticalPositionChange: onChangeTopDividerVerticalPosition,
						},
					] }
				/>

				<PanelSectionBottomDividerSettings
					settings={ [
						{
							typeValue: bottomDividerType,
							onTypeChange: onChangeBottomDividerType,
						},
						{
							levelValue: bottomDividerLevel,
							onLevelChange: onChangeBottomDividerLevel,
						},
						{
							colorValue: bottomDividerColor,
							onColorChange: onChangeBottomDividerColor,
						},
						{
							verticalPosition: bottomDividerVerticalPosition,
							onVerticalPositionChange: onChangeBottomDividerVerticalPosition,
						},
					] }
				/>

				<PanelColorGradientSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: textColor,
							onColorChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorGradientSettings>
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
				<SectionBackground
					{ ...{
						backgroundHorizontalPosition,
						backgroundVerticalPosition,
						isBackgroundNoOver,
						backgroundColor,
						backgroundGradientColor,
						backgroundTexture,
						backgroundTextureOpacity,
						fixedBackgroundColor,
						fixedBackgroundGradientColor,
						fixedBackgroundTexture,
						fixedBackgroundTextureOpacity,
						topDividerType,
						topDividerLevel,
						topDividerColor,
						topDividerVerticalPosition,
						bottomDividerType,
						bottomDividerLevel,
						bottomDividerColor,
						bottomDividerVerticalPosition,
					} }
				/>

				<div className={ innerClasses }>
					<div className={ containerClasses }>
						<div
							className={ contentsWrapperClasses }
							style={ contentsWrapperStyles }
						>
							<Header
								isSelected={ isSelected }
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
