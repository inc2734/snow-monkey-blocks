import classnames from 'classnames';
import { times } from 'lodash';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	RichText,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
	ToggleControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import WidthPicker from '@smb/component/width-picker';
import { getVideoId } from './utils';

const HORIZONTAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		titleTagName,
		title,
		subtitle,
		lede,
		videoURL,
		videoWidth,
		videoHeight,
		height,
		contentsAlignment,
		maskColor,
		maskGradientColor,
		maskOpacity,
		textColor,
		contentsMaxWidth,
		isSlim,
		contentJustification,
		itemsAlignment,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
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
			[ `is-content-justification-${ contentJustification }` ]: !! contentJustification,
			[ `is-items-alignment-${ itemsAlignment }` ]:
				!! itemsAlignment && isItemsAlignmentable,
		}
	);

	const bgvideoClasses = classnames( 'smb-section-with-bgimage__bgimage' );

	const containerClasses = classnames( 'c-container', {
		'u-slim-width': isSlim && ! contentsMaxWidth,
	} );

	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

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

	const innerStyles = {
		maxWidth:
			!! contentsMaxWidth && ! isSlim ? contentsMaxWidth : undefined,
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
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

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

	const onChangeHeight = ( value ) =>
		setAttributes( {
			height: value,
		} );

	const onChangeContentsAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
		} );

	const onChangeContentsMaxWidth = ( value ) =>
		setAttributes( {
			contentsMaxWidth: value,
		} );

	const onChangeIsSlim = ( value ) =>
		setAttributes( {
			isSlim: value,
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

	const onChangeContentJustification = ( value ) =>
		setAttributes( {
			contentJustification: value,
		} );

	const onChangeItemsAlignment = ( value ) =>
		setAttributes( {
			itemsAlignment: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-with-bgvideo/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								const isPrimary =
									titleTagName === titleTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickTitleTagName }
										key={ index }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

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

					<SelectControl
						label={ __( 'Height', 'snow-monkey-blocks' ) }
						value={ height }
						options={ [
							{
								value: 'fit',
								label: __( 'Fit', 'snow-monkey-blocks' ),
							},
							{
								value: 'wide',
								label: __( 'Wide', 'snow-monkey-blocks' ),
							},
							{
								value: 'full',
								label: __( 'Full', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeHeight }
					/>

					{ ! isSlim && (
						<BaseControl
							label={ __(
								'Max width of the contents',
								'snow-monkey-blocks'
							) }
							id="snow-monkey-blocks/section/contents-max-width"
						>
							<WidthPicker
								value={ contentsMaxWidth }
								onChange={ onChangeContentsMaxWidth }
							/>
						</BaseControl>
					) }

					{ ! contentsMaxWidth && (
						<ToggleControl
							label={ __(
								'Make the contents width slim',
								'snow-monkey-blocks'
							) }
							checked={ isSlim }
							onChange={ onChangeIsSlim }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Mask Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ maskColor }
						gradientValue={ maskGradientColor }
						onColorChange={ onChangeMaskColor }
						onGradientChange={ onChangeMaskGradientColor }
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

				<div className="smb-section__inner" style={ innerStyles }>
					<div className={ containerClasses }>
						{ hasTitle && ( hasSubTitle || isSelected ) && (
							<RichText
								className="smb-section__subtitle"
								value={ subtitle }
								onChange={ onChangeSubtitle }
								placeholder={ __(
									'Write subtitle…',
									'snow-monkey-blocks'
								) }
							/>
						) }

						{ ( hasTitle ||
							( isSelected && 'none' !== titleTagName ) ) && (
							<RichText
								className="smb-section__title"
								tagName={ titleTagName }
								value={ title }
								onChange={ onChangeTitle }
								placeholder={ __(
									'Write title…',
									'snow-monkey-blocks'
								) }
							/>
						) }

						{ hasTitle && ( hasLede || isSelected ) && (
							<div className="smb-section__lede-wrapper">
								<RichText
									className="smb-section__lede"
									value={ lede }
									onChange={ onChangeLede }
									placeholder={ __(
										'Write lede…',
										'snow-monkey-blocks'
									) }
								/>
							</div>
						) }

						<div { ...innerBlocksProps } />
					</div>
				</div>
			</TagName>
		</>
	);
}
