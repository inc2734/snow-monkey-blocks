import classnames from 'classnames';
import { times } from 'lodash';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	BaseControl,
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { pullLeft, pullRight } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import WidthPicker from '@smb/component/width-picker';
import { toNumber, getColumnSize, divider } from '@smb/helper';

const HORIZONTAL_JUSTIFY_CONTROLS = [ 'left', 'center', 'right' ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		wrapperTagName,
		titleTagName,
		title,
		subtitle,
		lede,
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
		textColor,
		headingPosition,
		headingColumnSize,
		contentsMaxWidth,
		isSlim,
		topDividerType,
		topDividerLevel,
		topDividerColor,
		topDividerVerticalPosition,
		bottomDividerType,
		bottomDividerLevel,
		bottomDividerColor,
		bottomDividerVerticalPosition,
		height,
		contentJustification,
		itemsAlignment,
		containerAlign,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		headingColumnSize
	);

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

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

	const topDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--top',
		`smb-section__divider--${ topDividerType }`
	);

	const bottomDividerClasses = classnames(
		'smb-section__divider',
		'smb-section__divider--bottom',
		`smb-section__divider--${ bottomDividerType }`
	);

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

	const hasBackgroundColor = backgroundColor || backgroundGradientColor;
	const hasFixedBackgroundColor =
		fixedBackgroundColor || fixedBackgroundGradientColor;
	const hasBackgroundTexture = backgroundTexture;
	const hasFixedBackgroundTexture = fixedBackgroundTexture;
	const hasTopDivider = !! topDividerLevel;
	const hasBottomDivider = !! bottomDividerLevel;
	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

	const sectionStyles = {};
	if ( textColor ) {
		sectionStyles.color = textColor;
	}

	const fixedBackgroundStyles = {
		paddingTop: Math.abs( topDividerLevel ),
		paddingBottom: Math.abs( bottomDividerLevel ),
		backgroundColor: fixedBackgroundColor,
		backgroundImage: fixedBackgroundGradientColor,
	};

	const fixedBackgroundTextureStyles = {
		backgroundImage: hasFixedBackgroundTexture
			? `url(${ smb.pluginUrl }/dist/block/section/img/${ fixedBackgroundTexture }.png)`
			: undefined,
		opacity: !! fixedBackgroundTextureOpacity
			? fixedBackgroundTextureOpacity
			: undefined,
	};

	const dividersStyles = {};
	if ( topDividerVerticalPosition ) {
		dividersStyles.top = `${ topDividerVerticalPosition }%`;
	}
	if ( bottomDividerVerticalPosition ) {
		dividersStyles.bottom = `${ bottomDividerVerticalPosition }%`;
	}

	const backgroundStyles = {};
	if ( hasBackgroundColor ) {
		backgroundStyles.backgroundColor = backgroundColor;
		backgroundStyles.backgroundImage = backgroundGradientColor;

		if ( ! isBackgroundNoOver ) {
			if ( backgroundHorizontalPosition || backgroundVerticalPosition ) {
				backgroundStyles.transform = `translate(${
					backgroundHorizontalPosition || 0
				}%, ${ backgroundVerticalPosition || 0 }%)`;
			}
		} else {
			if ( 0 < backgroundHorizontalPosition ) {
				backgroundStyles.left = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			} else if ( 0 > backgroundHorizontalPosition ) {
				backgroundStyles.right = `${ Math.abs(
					backgroundHorizontalPosition
				) }%`;
			}

			if ( 0 < backgroundVerticalPosition ) {
				backgroundStyles.top = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			} else if ( 0 > backgroundVerticalPosition ) {
				backgroundStyles.bottom = `${ Math.abs(
					backgroundVerticalPosition
				) }%`;
			}
		}
	}

	const backgroundTextureStyles = {
		backgroundImage: hasBackgroundTexture
			? `url(${ smb.pluginUrl }/dist/block/section/img/${ backgroundTexture }.png)`
			: undefined,
		opacity: !! backgroundTextureOpacity
			? backgroundTextureOpacity
			: undefined,
	};

	const innerStyles = {};

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
			className: [
				'smb-section__body',
				'smb-section-side-heading__body',
			],
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeHeight = ( value ) =>
		setAttributes( {
			height: value,
		} );

	const onChangeHeadingColumnSize = ( value ) =>
		setAttributes( {
			headingColumnSize: value,
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

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
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

	const onChangeContainerAlign = ( value ) =>
		setAttributes( {
			containerAlign: value,
		} );

	const textureOptions = [
		{
			value: '',
			label: __( 'None', 'snow-monkey-blocks' ),
		},
		{
			value: 'stripe',
			label: __( 'Stripe', 'snow-monkey-blocks' ),
		},
		{
			value: 'noise',
			label: __( 'Noise', 'snow-monkey-blocks' ),
		},
		{
			value: 'dots',
			label: __( 'Dots', 'snow-monkey-blocks' ),
		},
		{
			value: 'dots2',
			label: __( 'Dots 2', 'snow-monkey-blocks' ),
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Wrapper Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-side-heading/wrapper-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( wrapperTagNames.length, ( index ) => {
								const onClickWrapperTagName = () =>
									setAttributes( {
										wrapperTagName:
											wrapperTagNames[ index ],
									} );

								const isPrimary =
									wrapperTagName === wrapperTagNames[ index ];
								return (
									<Button
										isPrimary={ isPrimary }
										isSecondary={ ! isPrimary }
										onClick={ onClickWrapperTagName }
										key={ index }
									>
										{ wrapperTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-side-heading/title-tag"
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

					<SelectControl
						label={ __(
							'Container alignment',
							'snow-monkey-blocks'
						) }
						value={ containerAlign }
						onChange={ onChangeContainerAlign }
						options={ [
							{
								value: '',
								label: __( 'Default', 'snow-monkey-blocks' ),
							},
							{
								value: 'wide',
								label: __( 'Wide width', 'snow-monkey-blocks' ),
							},
							{
								value: 'full',
								label: __( 'Full width', 'snow-monkey-blocks' ),
							},
						] }
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
					title={ __(
						'Background (Movable) Settings',
						'snow-monkey-blocks'
					) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ backgroundColor }
						gradientValue={ backgroundGradientColor }
						onColorChange={ onChangeBackgroundColor }
						onGradientChange={ onChangeBackgroundGradientColor }
					/>

					{ hasBackgroundColor && (
						<>
							<RangeControl
								label={ __(
									'Background Position (Left / Right)',
									'snow-monkey-blocks'
								) }
								value={ backgroundHorizontalPosition }
								onChange={
									onChangeBackgroundHorizontalPosition
								}
								min="-90"
								max="90"
							/>

							<RangeControl
								label={ __(
									'Background Position (Top / Bottom)',
									'snow-monkey-blocks'
								) }
								value={ backgroundVerticalPosition }
								onChange={ onChangeBackgroundVerticalPosition }
								min="-90"
								max="90"
							/>

							{ ( 0 !== backgroundHorizontalPosition ||
								0 !== backgroundVerticalPosition ) && (
								<ToggleControl
									label={ __(
										"Make sure the background doesn't overflow to the outside",
										'snow-monkey-blocks'
									) }
									checked={ isBackgroundNoOver }
									onChange={ onChangeIsBackgroundNoOver }
								/>
							) }
						</>
					) }

					<SelectControl
						label={ __( 'Texture', 'snow-monkey-blocks' ) }
						value={ backgroundTexture }
						onChange={ onChangeBackgroundTexture }
						options={ textureOptions }
					/>

					{ hasBackgroundTexture && (
						<RangeControl
							label={ __(
								'Texture Opacity',
								'snow-monkey-blocks'
							) }
							value={ Number(
								backgroundTextureOpacity.toFixed( 1 )
							) }
							onChange={ onChangeBackgroundTextureOpacity }
							min={ 0.1 }
							max={ 1 }
							step={ 0.1 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __(
						'Background (Fixed) Settings',
						'snow-monkey-blocks'
					) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ fixedBackgroundColor }
						gradientValue={ fixedBackgroundGradientColor }
						onColorChange={ onChangeFixedBackgroundColor }
						onGradientChange={
							onChangeFixedBackgroundGradientColor
						}
					/>

					<SelectControl
						label={ __( 'Texture', 'snow-monkey-blocks' ) }
						value={ fixedBackgroundTexture }
						onChange={ onChangeFixedBackgroundTexture }
						options={ textureOptions }
					/>

					{ hasFixedBackgroundTexture && (
						<RangeControl
							label={ __(
								'Texture Opacity',
								'snow-monkey-blocks'
							) }
							value={ Number(
								fixedBackgroundTextureOpacity.toFixed( 1 )
							) }
							onChange={ onChangeFixedBackgroundTextureOpacity }
							min={ 0.1 }
							max={ 1 }
							step={ 0.1 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Top divider Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ topDividerType }
						onChange={ onChangeTopDividerType }
						options={ [
							{
								value: 'tilt',
								label: __( 'Tilt', 'snow-monkey-blocks' ),
							},
							{
								value: 'curve',
								label: __( 'Curve', 'snow-monkey-blocks' ),
							},
							{
								value: 'wave',
								label: __( 'Wave', 'snow-monkey-blocks' ),
							},
							{
								value: 'triangle',
								label: __( 'Triangle', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<RangeControl
						label={ __( 'Level', 'snow-monkey-blocks' ) }
						value={ topDividerLevel }
						onChange={ onChangeTopDividerLevel }
						min="-100"
						max="100"
					/>

					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ topDividerColor }
						onColorChange={ onChangeTopDividerColor }
					/>

					<RangeControl
						label={ __(
							'Position (Top / Bottom)',
							'snow-monkey-blocks'
						) }
						value={ topDividerVerticalPosition }
						onChange={ onChangeTopDividerVerticalPosition }
						min="-90"
						max="90"
					/>
				</PanelBody>

				<PanelBody
					title={ __(
						'Bottom divider Settings',
						'snow-monkey-blocks'
					) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __( 'Type', 'snow-monkey-blocks' ) }
						value={ bottomDividerType }
						onChange={ onChangeBottomDividerType }
						options={ [
							{
								value: 'tilt',
								label: __( 'Tilt', 'snow-monkey-blocks' ),
							},
							{
								value: 'curve',
								label: __( 'Curve', 'snow-monkey-blocks' ),
							},
							{
								value: 'wave',
								label: __( 'Wave', 'snow-monkey-blocks' ),
							},
							{
								value: 'triangle',
								label: __( 'Triangle', 'snow-monkey-blocks' ),
							},
						] }
					/>

					<RangeControl
						label={ __( 'Level', 'snow-monkey-blocks' ) }
						value={ bottomDividerLevel }
						onChange={ onChangeBottomDividerLevel }
						min="-100"
						max="100"
					/>

					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ bottomDividerColor }
						onColorChange={ onChangeBottomDividerColor }
					/>

					<RangeControl
						label={ __(
							'Position (Top / Bottom)',
							'snow-monkey-blocks'
						) }
						value={ bottomDividerVerticalPosition }
						onChange={ onChangeBottomDividerVerticalPosition }
						min="-90"
						max="90"
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
				{ ( hasFixedBackgroundColor ||
					hasFixedBackgroundTexture ||
					hasBackgroundColor ||
					hasBackgroundTexture ||
					hasTopDivider ||
					hasBottomDivider ) && (
					<div
						className="smb-section__fixed-background"
						style={ fixedBackgroundStyles }
					>
						{ hasFixedBackgroundTexture && (
							<div
								className="smb-section__fixed-background__texture"
								style={ fixedBackgroundTextureStyles }
							/>
						) }

						{ ( hasBackgroundColor || hasBackgroundTexture ) && (
							<div
								className="smb-section__background"
								style={ backgroundStyles }
							>
								{ hasBackgroundTexture && (
									<div
										className="smb-section__background__texture"
										style={ backgroundTextureStyles }
									/>
								) }
							</div>
						) }

						{ ( hasTopDivider || hasBottomDivider ) && (
							<div
								className="smb-section__dividers"
								style={ dividersStyles }
							>
								{ hasTopDivider && (
									<div className={ topDividerClasses }>
										{ divider(
											topDividerType,
											topDividerLevel,
											topDividerColor
										) }
									</div>
								) }

								{ hasBottomDivider && (
									<div className={ bottomDividerClasses }>
										{ divider(
											bottomDividerType,
											bottomDividerLevel,
											bottomDividerColor
										) }
									</div>
								) }
							</div>
						) }
					</div>
				) }

				<div className={ innerClasses } style={ innerStyles }>
					<div className={ containerClasses }>
						<div
							className={ contentsWrapperClasses }
							style={ contentsWrapperStyles }
						>
							<div className={ rowClasses }>
								<div className={ headingColClasses }>
									{ ( hasTitle ||
										( isSelected &&
											'none' !== titleTagName ) ) && (
										<div className="smb-section__header smb-section-side-heading__header">
											{ ( hasSubTitle || isSelected ) && (
												<RichText
													className="smb-section__subtitle smb-section-side-heading__subtitle"
													value={ subtitle }
													onChange={
														onChangeSubtitle
													}
													placeholder={ __(
														'Write subtitle…',
														'snow-monkey-blocks'
													) }
												/>
											) }

											<RichText
												className="smb-section__title smb-section-side-heading__title"
												tagName={ titleTagName }
												value={ title }
												onChange={ onChangeTitle }
												placeholder={ __(
													'Write title…',
													'snow-monkey-blocks'
												) }
											/>

											{ ( hasLede || isSelected ) && (
												<div className="smb-section__lede-wrapper smb-section-side-heading__lede-wrapper">
													<RichText
														className="smb-section__lede smb-section-side-heading__lede"
														value={ lede }
														onChange={
															onChangeLede
														}
														placeholder={ __(
															'Write lede…',
															'snow-monkey-blocks'
														) }
													/>
												</div>
											) }
										</div>
									) }
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
