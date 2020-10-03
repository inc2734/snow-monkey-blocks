import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import { times } from 'lodash';

import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
	ColorPalette,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';

import { toNumber, getMediaType, getResizedImages } from '@smb/helper';
import Figure from '@smb/component/figure';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
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
	} = attributes;

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

	const BlockWrapper = Block[ wrapperTagName ];
	const classes = classnames(
		'smb-section',
		'smb-section-break-the-grid',
		`smb-section-break-the-grid--${ imagePosition }`,
		{
			[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
				contentVerticalPosition &&
				verticalAlignment &&
				'middle' !== verticalAlignment,
			[ className ]: !! className,
		}
	);

	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		[ `c-row--lg-${ verticalAlignment }` ]: true,
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

	const sectionStyles = {
		color: textColor || undefined,
	};

	const shadowStyles = {};
	if ( shadowColor ) {
		shadowStyles.backgroundColor = shadowColor;
	}
	if ( shadowHorizontalPosition || shadowVerticalPosition ) {
		shadowStyles.transform = `translate(${ shadowHorizontalPosition ||
			0 }%, ${ shadowVerticalPosition || 0 }%)`;
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
		opacity: maskOpacity,
	};

	const onChangeImagePosition = ( value ) =>
		setAttributes( {
			imagePosition: value,
		} );

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

					<SelectControl
						label={ __( 'Image position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						options={ [
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeImagePosition }
					/>

					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ imageID }
						slug={ imageSizeSlug }
						onChange={ onChangeImageSizeSlug }
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

					<SelectControl
						label={ __(
							'Vertical Alignment',
							'snow-monkey-blocks'
						) }
						value={ verticalAlignment }
						options={ [
							{
								value: 'top',
								label: __( 'Top', 'snow-monkey-blocks' ),
							},
							{
								value: 'middle',
								label: __( 'Middle', 'snow-monkey-blocks' ),
							},
							{
								value: 'bottom',
								label: __( 'Bottom', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeVerticalAlignment }
					/>

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Mask Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/content-background-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ maskColor }
							onChange={ onChangeMaskColor }
						/>
					</BaseControl>

					{ !! maskColor && (
						<RangeControl
							label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
							value={ Number( ( 1 - maskOpacity ).toFixed( 1 ) ) }
							onChange={ onChangeMaskOpacity }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Contents Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
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

					{ verticalAlignment && 'middle' !== verticalAlignment && (
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

					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Background Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/content-background-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ contentBackgroundColor }
							onChange={ onChangeContentBackgroundColor }
						/>
					</BaseControl>

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
					title={ __( 'Shadow Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<BaseControl
						className="editor-color-palette-control"
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/section-break-the-grid/shadow-color"
					>
						<ColorPalette
							className="editor-color-palette-control__color-palette"
							value={ shadowColor }
							onChange={ onChangeShadowColor }
						/>
					</BaseControl>

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

			<BlockWrapper className={ classes } style={ sectionStyles }>
				<div className="c-container">
					<div className={ rowClasses }>
						<div className={ textColumnClasses }>
							<div
								className={ contentClasses }
								style={ contentStyles }
							>
								{ ! RichText.isEmpty( title ) &&
									( ! RichText.isEmpty( subtitle ) ||
										isSelected ) &&
									'none' !== titleTagName && (
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

								{ ( ! RichText.isEmpty( title ) ||
									isSelected ) &&
									'none' !== titleTagName && (
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

								{ ! RichText.isEmpty( title ) &&
									( ! RichText.isEmpty( lede ) ||
										isSelected ) &&
									'none' !== titleTagName && (
										<RichText
											className="smb-section__lede smb-section-break-the-grid__lede"
											value={ lede }
											onChange={ onChangeLede }
											placeholder={ __(
												'Write lede…',
												'snow-monkey-blocks'
											) }
										/>
									) }

								<div className="smb-section__body smb-section-break-the-grid__body">
									<InnerBlocks />
								</div>
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
									onRemove={ onRemoveImage }
									mediaType={ imageMediaType }
									allowedTypes={ [ 'image', 'video' ] }
									style={ figureStyles }
								/>
							</div>
						</div>
					</div>
				</div>
			</BlockWrapper>
		</>
	);
}
