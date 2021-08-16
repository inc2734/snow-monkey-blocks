import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { times } from 'lodash';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
	__experimentalColorGradientControl as ColorGradientControl,
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

import { __, sprintf } from '@wordpress/i18n';

import { pullLeft, pullRight } from '@wordpress/icons';

import {
	toNumber,
	getMediaType,
	getResizedImages,
	isVideoType,
} from '@smb/helper';
import Figure from '@smb/component/figure';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';

const ALLOWED_TYPES = [ 'image', 'video' ];

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
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		imageMediaType,
		textColor,
		imagePosition,
		imageSize,
		verticalAlignment,
		contentSize,
		contentHorizontalPosition,
		contentVerticalPosition,
		contentBackgroundColor,
		contentBackgroundOpacity,
		contentPadding,
		removeContentOutsidePadding,
		shadowColor,
		shadowHorizontalPosition,
		shadowVerticalPosition,
		maskColor,
		maskOpacity,
		mobileOrder,
		contentsAlignment,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const { resizedImages } = useSelect( ( select ) => {
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
	} );

	const wrapperTagNames = [ 'div', 'section', 'aside' ];
	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];

	const TagName = wrapperTagName;
	const classes = classnames(
		'smb-section',
		'smb-section-break-the-grid',
		`smb-section-break-the-grid--${ imagePosition }`,
		{
			[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
				contentVerticalPosition &&
				verticalAlignment &&
				'center' !== verticalAlignment,
			[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]: !! mobileOrder,
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ className ]: !! className,
		}
	);

	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		'c-row--lg-top': 'top' === verticalAlignment,
		'c-row--lg-middle': 'center' === verticalAlignment,
		'c-row--lg-bottom': 'bottom' === verticalAlignment,
	} );

	const textColumnClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		'c-row__col--lg-1-2'
	);
	const imageColumnClasses = classnames(
		'c-row__col',
		'c-row__col--1-1',
		'c-row__col--lg-1-2'
	);

	const figureClasses = classnames( 'smb-section-break-the-grid__figure', {
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const maskClasses = classnames( 'smb-section-break-the-grid__mask' );

	const hasTitle = ! RichText.isEmpty( title ) && 'none' !== titleTagName;
	const hasSubTitle = ! RichText.isEmpty( subtitle );
	const hasLede = ! RichText.isEmpty( lede );

	const sectionStyles = {
		color: textColor || undefined,
	};

	const shadowStyles = {};
	if ( shadowColor ) {
		shadowStyles.backgroundColor = shadowColor;
	}
	if ( shadowHorizontalPosition || shadowVerticalPosition ) {
		shadowStyles.transform = `translate(${
			shadowHorizontalPosition || 0
		}%, ${ shadowVerticalPosition || 0 }%)`;
	}

	const contentStyles = {
		backgroundColor:
			contentBackgroundColor &&
			hexToRgba( contentBackgroundColor, contentBackgroundOpacity ),
	};

	const maskStyles = {};
	if ( maskColor ) {
		maskStyles.backgroundColor = maskColor;
	}

	const figureStyles = {
		opacity: !! maskColor ? maskOpacity : undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: sectionStyles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: [
				'smb-section__body',
				'smb-section-break-the-grid__body',
			],
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeImageSize = ( value ) =>
		setAttributes( {
			imageSize: value,
		} );

	const onChangeVerticalAlignment = ( value ) =>
		setAttributes( {
			verticalAlignment: value,
		} );

	const onChangeContentSize = ( value ) =>
		setAttributes( {
			contentSize: value,
		} );

	const onChangeContentHorizontalPosition = ( value ) =>
		setAttributes( {
			contentHorizontalPosition: value,
		} );

	const onChangeContentVerticalPosition = ( value ) =>
		setAttributes( {
			contentVerticalPosition: value,
		} );

	const onChangeContentBackgroundColor = ( value ) =>
		setAttributes( {
			contentBackgroundColor: value,
		} );

	const onChangeContentBackgroundOpacity = ( value ) =>
		setAttributes( {
			contentBackgroundOpacity: value,
		} );

	const onChangeContentPadding = ( value ) =>
		setAttributes( {
			contentPadding: value,
		} );

	const onChangeRemoveContentOutsidePadding = ( value ) =>
		setAttributes( {
			removeContentOutsidePadding: value,
		} );

	const onChangeShadowColor = ( value ) =>
		setAttributes( {
			shadowColor: value,
		} );

	const onChangeShadowHorizontalPosition = ( value ) =>
		setAttributes( {
			shadowHorizontalPosition: toNumber( value, -120, 120 ),
		} );

	const onChangeShadowVerticalPosition = ( value ) =>
		setAttributes( {
			shadowVerticalPosition: toNumber( value, -120, 120 ),
		} );

	const onChangeTextColor = ( value ) =>
		setAttributes( {
			textColor: value,
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

	const onChangeMaskColor = ( value ) =>
		setAttributes( {
			maskColor: value,
		} );

	const onChangeMaskOpacity = ( value ) =>
		setAttributes( {
			maskOpacity: toNumber( ( 1 - value ).toFixed( 1 ), 0, 1 ),
		} );

	const onChangeMobileOrder = ( value ) =>
		setAttributes( {
			mobileOrder: '' === value ? undefined : value,
		} );

	const onChangeContentAlignment = ( value ) =>
		setAttributes( {
			contentsAlignment: value,
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
			imageMediaType: getMediaType( media ),
		} );
	};

	const onSelectImageURL = ( newURL ) => {
		if ( newURL !== imageURL ) {
			setAttributes( {
				imageURL: newURL,
				imageID: 0,
				imageSizeSlug: 'large',
				mediaType: getMediaType( {
					media_type: isVideoType( newURL ) ? 'video' : 'image',
				} ),
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
			imageMediaType: undefined,
		} );

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

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Wrapper Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/wrapper-tag-name"
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
						id="snow-monkey-blocks/section-break-the-grid/title-tag-name"
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

					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ imageID }
						slug={ imageSizeSlug }
						onChange={ onChangeImageSizeSlug }
					/>

					<SelectControl
						label={ __( 'Sort by mobile', 'snow-monkey-blocks' ) }
						value={ mobileOrder }
						options={ [
							{
								value: '',
								label: __( 'Default', 'snow-monkey-blocks' ),
							},
							{
								value: 'text',
								label: __(
									'Text > Image',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'image',
								label: __(
									'Image > Text',
									'snow-monkey-blocks'
								),
							},
						] }
						onChange={ onChangeMobileOrder }
					/>

					<SelectControl
						label={ __(
							'image Size Adjustment',
							'snow-monkey-blocks'
						) }
						value={ imageSize }
						options={ [
							{
								value: 'm',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( '+40%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xl',
								label: __( '+80%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeImageSize }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Contents Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<SelectControl
						label={ __(
							'Contents alignment',
							'snow-monkey-blocks'
						) }
						value={ contentsAlignment }
						options={ [
							{
								value: '',
								label: __( 'Normal', 'snow-monkey-blocks' ),
							},
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
						onChange={ onChangeContentAlignment }
					/>

					<SelectControl
						label={ __(
							'Content Size Adjustment',
							'snow-monkey-blocks'
						) }
						value={ contentSize }
						options={ [
							{
								value: 'xs',
								label: __( '-40%', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( '-20%', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( '+20%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xl',
								label: __( '+40%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentSize }
					/>

					<SelectControl
						label={ __(
							'Degree of overlap of content to image',
							'snow-monkey-blocks'
						) }
						value={ contentHorizontalPosition }
						options={ [
							{
								value: '',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xs',
								label: __( '5%', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( '10%', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
								label: __( '15%', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( '20%', 'snow-monkey-blocks' ),
							},
							{
								value: 'xl',
								label: __( '25%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentHorizontalPosition }
					/>

					{ verticalAlignment && 'center' !== verticalAlignment && (
						<SelectControl
							label={ __(
								'Vertical position of content',
								'snow-monkey-blocks'
							) }
							value={ contentVerticalPosition }
							options={ [
								{
									value: '',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								{
									value: 'txl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'100px'
									),
								},
								{
									value: 'tl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'80px'
									),
								},
								{
									value: 'tm',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'60px'
									),
								},
								{
									value: 'ts',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s up',
											'snow-monkey-blocks'
										),
										'40px'
									),
								},
								{
									value: 'bs',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'40px'
									),
								},
								{
									value: 'bm',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'60px'
									),
								},
								{
									value: 'bl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'80px'
									),
								},
								{
									value: 'bxl',
									label: sprintf(
										// translators: %1$s: px
										__(
											'Move %1$s down',
											'snow-monkey-blocks'
										),
										'100px'
									),
								},
							] }
							onChange={ onChangeContentVerticalPosition }
						/>
					) }

					<ColorGradientControl
						label={ __( 'Background Color', 'snow-monkey-blocks' ) }
						colorValue={ contentBackgroundColor }
						onColorChange={ onChangeContentBackgroundColor }
					/>

					{ !! contentBackgroundColor && (
						<RangeControl
							label={ __(
								'Background Opacity',
								'snow-monkey-blocks'
							) }
							value={ Number(
								contentBackgroundOpacity.toFixed( 1 )
							) }
							onChange={ onChangeContentBackgroundOpacity }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					) }

					<SelectControl
						label={ __( 'Content Padding', 'snow-monkey-blocks' ) }
						value={ contentPadding }
						options={ [
							{
								value: '',
								label: __( 'None', 'snow-monkey-blocks' ),
							},
							{
								value: 's',
								label: __( 'S', 'snow-monkey-blocks' ),
							},
							{
								value: 'm',
								label: __( 'M', 'snow-monkey-blocks' ),
							},
							{
								value: 'l',
								label: __( 'L', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentPadding }
					/>

					{ contentPadding && (
						<ToggleControl
							label={ __(
								'Remove Outside Padding',
								'snow-monkey-blocks'
							) }
							checked={ removeContentOutsidePadding }
							onChange={ onChangeRemoveContentOutsidePadding }
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
						onColorChange={ onChangeMaskColor }
					/>

					{ !! maskColor && (
						<RangeControl
							label={ __( 'Opacity', 'snow-monkey-blocks' ) }
							value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
							onChange={ onChangeMaskOpacity }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Shadow Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ shadowColor }
						onColorChange={ onChangeShadowColor }
					/>

					{ shadowColor && (
						<RangeControl
							label={ __(
								'Horizontal Position',
								'snow-monkey-blocks'
							) }
							value={ shadowHorizontalPosition }
							onChange={ onChangeShadowHorizontalPosition }
							min="-120"
							max="120"
						/>
					) }

					{ shadowColor && (
						<RangeControl
							label={ __(
								'Vertical Position',
								'snow-monkey-blocks'
							) }
							value={ shadowVerticalPosition }
							onChange={ onChangeShadowVerticalPosition }
							min="-120"
							max="120"
						/>
					) }
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: textColor,
							onChange: onChangeTextColor,
							label: __( 'Text Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<BlockControls gruop="block">
				<ToolbarGroup>
					<BlockVerticalAlignmentToolbar
						onChange={ onChangeVerticalAlignment }
						value={ verticalAlignment }
					/>
					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show media on left',
							'snow-monkey-blocks'
						) }
						isActive={ 'left' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'left' } )
						}
					/>
					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show media on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'right' } )
						}
					/>
				</ToolbarGroup>
			</BlockControls>

			<TagName { ...blockProps }>
				<div className="smb-section__inner">
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div
									className={ contentClasses }
									style={ contentStyles }
								>
									{ hasTitle &&
										( hasSubTitle || isSelected ) && (
											<RichText
												className="smb-section__subtitle smb-section-break-the-grid__subtitle"
												value={ subtitle }
												onChange={ onChangeSubtitle }
												placeholder={ __(
													'Write subtitle…',
													'snow-monkey-blocks'
												) }
											/>
										) }

									{ ( hasTitle ||
										( isSelected &&
											'none' !== titleTagName ) ) && (
										<RichText
											className="smb-section__title smb-section-break-the-grid__title"
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
										<div className="smb-section__lede-wrapper smb-section-break-the-grid__lede-wrapper">
											<RichText
												className="smb-section__lede smb-section-break-the-grid__lede"
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
							<div className={ imageColumnClasses }>
								<div className={ figureClasses }>
									{ shadowColor && (
										<div
											className={ shadowClasses }
											style={ shadowStyles }
										/>
									) }

									{ 0 <
										Number(
											( 1 - maskOpacity ).toFixed( 1 )
										) && (
										<div
											className={ maskClasses }
											style={ maskStyles }
										/>
									) }

									<Figure
										src={ imageURL }
										id={ imageID }
										alt={ imageAlt }
										onSelect={ onSelectImage }
										onSelectURL={ onSelectImageURL }
										onRemove={ onRemoveImage }
										mediaType={ imageMediaType }
										allowedTypes={ ALLOWED_TYPES }
										style={ figureStyles }
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</TagName>
		</>
	);
}
