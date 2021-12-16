import classnames from 'classnames';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { pullLeft, pullRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { toNumber, getColumnSize } from '@smb/helper';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionMovableBackgroundSettings,
	PanelSectionFixedBackgroundSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
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

		textColor,
		headingPosition,
		headingColumnSize,
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
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize
	);

	const isItemsAlignmentable = 'fit' !== height;

	const TagName = wrapperTagName;

	const classes = classnames(
		'smb-section',
		'smb-section-side-heading',
		className,
		{
			[ `smb-section--${ height }` ]: !! height,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const innerClasses = classnames( 'smb-section__inner', {
		[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
	} );

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign && 'full' === align,
		alignwide: 'wide' === containerAlign && 'full' === align,
	} );

	const contentsWrapperClasses = classnames(
		'smb-section__contents-wrapper',
		{
			'u-slim-width': isSlim && ! contentsMaxWidth,
		}
	);

	const rowClasses = classnames( 'c-row', 'c-row--md-margin', {
		'c-row--reverse': 'right' === headingPosition,
	} );

	const headingColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ imageColumnWidth }`
	);

	const contentColClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		`c-row__col--md-${ textColumnWidth }`
	);

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-side-heading__body'
	);

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}

	const contentsWrapperStyles = {
		width: !! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: bodyClasses,
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeHeadingColumnSize = ( value ) =>
		setAttributes( {
			headingColumnSize: value,
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

	const onChangeSubtitle = ( value ) =>
		setAttributes( {
			subtitle: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
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

	const onChangeBackgroundColor = ( value ) =>
		setAttributes( {
			backgroundColor: value,
		} );

	const onChangeBackgroundGradientColor = ( value ) =>
		setAttributes( {
			backgroundGradientColor: value,
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

				<PanelBody
					title={ __( 'Columns settings', 'snow-monkey-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __(
							'Heading column size',
							'snow-monkey-blocks'
						) }
						value={ headingColumnSize }
						onChange={ onChangeHeadingColumnSize }
						options={ [
							{
								value: 50,
								label: __( '50%', 'snow-monkey-blocks' ),
							},
							{
								value: 33,
								label: __( '33%', 'snow-monkey-blocks' ),
							},
							{
								value: 25,
								label: __( '25%', 'snow-monkey-blocks' ),
							},
						] }
					/>
				</PanelBody>

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

				<ToolbarGroup>
					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show heading on left',
							'snow-monkey-blocks'
						) }
						isActive={ 'left' === headingPosition }
						onClick={ () =>
							setAttributes( { headingPosition: 'left' } )
						}
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show heading on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === headingPosition }
						onClick={ () =>
							setAttributes( { headingPosition: 'right' } )
						}
					/>
				</ToolbarGroup>
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
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									<Header
										isSelected={ isSelected }
										className="smb-section-side-heading"
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
								</div>
								<div className={ contentColClasses }>
									<div { ...innerBlocksProps } />
								</div>
							</div>
						</div>
					</div>
				</div>
			</TagName>
		</>
	);
}
