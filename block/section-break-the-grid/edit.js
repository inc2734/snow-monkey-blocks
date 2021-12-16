import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';

import {
	AlignmentToolbar,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useSetting,
	useInnerBlocksProps,
	__experimentalColorGradientControl as ColorGradientControl,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
} from '@wordpress/block-editor';

import {
	CheckboxControl,
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
	generateSpacingProperties,
} from '@smb/helper';

import { useMultipleOriginColorsAndGradients } from '@smb/hooks';

import Figure from '@smb/component/figure';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';

import { PanelBasicSettings } from '../section/components/basic';
import { Edit as Header } from '../section/components/header';

import {
	PanelSectionMovableBackgroundSettings,
	PanelSectionFixedBackgroundSettings,
	PanelSectionBackgroundTextSettings,
	PanelSectionTopDividerSettings,
	PanelSectionBottomDividerSettings,
	SectionBackground,
} from '../section/components/background';

const ALLOWED_TYPES = [ 'image', 'video' ];

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		align,

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
		imageMatchHeight,
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

		title,
		subtitle,
		lede,

		wrapperTagName,
		titleTagName,
		containerAlign,
		padding,

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
		backgroundText,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

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

	const isAvailableVerticalAlignment = [ 'right', 'left' ].includes(
		imagePosition
	);

	const isNowrapWhenMobile =
		'nowrap' === mobileOrder && isAvailableVerticalAlignment;

	const TagName = wrapperTagName;
	const classes = classnames(
		'smb-section',
		'smb-section-break-the-grid',
		`smb-section-break-the-grid--${ imagePosition }`,
		{
			[ `smb-section-break-the-grid--vertical-${ contentVerticalPosition }` ]:
				contentVerticalPosition &&
				verticalAlignment &&
				'center' !== verticalAlignment &&
				isAvailableVerticalAlignment,
			[ `smb-section-break-the-grid--mobile-${ mobileOrder }` ]:
				!! mobileOrder && isAvailableVerticalAlignment,
			[ `smb-section--${ contentsAlignment }` ]: !! contentsAlignment,
			[ className ]: !! className,
			[ `smb-section-break-the-grid--match-height` ]:
				imageMatchHeight && isAvailableVerticalAlignment,
		}
	);

	const containerClasses = classnames( 'c-container', {
		alignfull: 'full' === containerAlign && 'full' === align,
		alignwide: 'wide' === containerAlign && 'full' === align,
	} );

	const rowClasses = classnames( 'c-row', {
		'c-row--lg-top':
			'top' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-middle':
			'center' === verticalAlignment && isAvailableVerticalAlignment,
		'c-row--lg-bottom':
			'bottom' === verticalAlignment && isAvailableVerticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! isNowrapWhenMobile,
		'c-row__col--1-2': isNowrapWhenMobile,
		'c-row__col--lg-1-2':
			isAvailableVerticalAlignment && ! isNowrapWhenMobile,
	} );
	const imageColumnClasses = classnames( 'c-row__col', {
		'c-row__col--1-1': ! isNowrapWhenMobile,
		'c-row__col--1-2': isNowrapWhenMobile,
		'c-row__col--lg-1-2':
			isAvailableVerticalAlignment && ! isNowrapWhenMobile,
	} );

	const figureClasses = classnames( 'smb-section-break-the-grid__figure', {
		[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
	} );

	const contentClasses = classnames( 'smb-section-break-the-grid__content', {
		[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
		[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
		[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
		[ `smb-section-break-the-grid__content--${ contentsAlignment }` ]: !! contentsAlignment,
		'smb-section-break-the-grid__content--remove-outside-p':
			contentPadding && removeContentOutsidePadding,
	} );

	const bodyClasses = classnames(
		'smb-section__body',
		'smb-section-break-the-grid__body'
	);

	const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

	const maskClasses = classnames( 'smb-section-break-the-grid__mask' );

	const sectionStyles = {
		color: textColor || undefined,
		...generateSpacingProperties( padding ),
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
			className: bodyClasses,
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const fontSizes = useSetting( 'typography.fontSizes' ) || [];

	const onChangeImageSize = ( value ) =>
		setAttributes( {
			imageSize: value,
		} );

	const onChangeImageMatchHeight = ( value ) =>
		setAttributes( {
			imageMatchHeight: value,
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

	const onChangeContentsAlignment = ( value ) =>
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

	const onChangeWrapperTagName = ( value ) =>
		setAttributes( {
			wrapperTagName: value,
		} );

	const onChangeTitleTagName = ( value ) =>
		setAttributes( {
			titleTagName: value,
		} );

	const onChangeContainerAlign = ( value ) =>
		setAttributes( {
			containerAlign: value,
		} );

	const onChangePadding = ( value ) =>
		setAttributes( {
			padding: value,
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

	let contentSizeOptions = [
		{
			value: '-50',
			label: __( '-50%', 'snow-monkey-blocks' ),
		},
		{
			value: '-40',
			label: __( '-40%', 'snow-monkey-blocks' ),
		},
		{
			value: '-30',
			label: __( '-30%', 'snow-monkey-blocks' ),
		},
		{
			value: '-20',
			label: __( '-20%', 'snow-monkey-blocks' ),
		},
		{
			value: '-10',
			label: __( '-10%', 'snow-monkey-blocks' ),
		},
		{
			value: '',
			label: __( '+-0%', 'snow-monkey-blocks' ),
		},
	];
	contentSizeOptions = isAvailableVerticalAlignment
		? contentSizeOptions.concat( [
				{
					value: '10',
					label: __( '+10%', 'snow-monkey-blocks' ),
				},
				{
					value: '20',
					label: __( '+20%', 'snow-monkey-blocks' ),
				},
				{
					value: '30',
					label: __( '+30%', 'snow-monkey-blocks' ),
				},
				{
					value: '40',
					label: __( '+40%', 'snow-monkey-blocks' ),
				},
				{
					value: '50',
					label: __( '+50%', 'snow-monkey-blocks' ),
				},
		  ] )
		: contentSizeOptions;

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
					disableIsSlim={ true }
					disableContentsMaxWidth={ true }
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
							containerAlignValue: containerAlign,
							onContainerAlignChange: onChangeContainerAlign,
						},
						{
							sides: [ 'top', 'bottom' ],
							paddingValue: padding,
							onPaddingChange: onChangePadding,
						},
					] }
				/>

				<PanelBody
					title={ __( 'Media settings', 'snow-monkey-blocks' ) }
					initialOpen={ true }
				>
					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ imageID }
						slug={ imageSizeSlug }
						onChange={ onChangeImageSizeSlug }
					/>

					{ isAvailableVerticalAlignment && (
						<SelectControl
							label={ __(
								'Sort by mobile',
								'snow-monkey-blocks'
							) }
							value={ mobileOrder }
							options={ [
								{
									value: '',
									label: __(
										'Default',
										'snow-monkey-blocks'
									),
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
								{
									value: 'nowrap',
									label: __(
										'No wrap',
										'snow-monkey-blocks'
									),
								},
							] }
							onChange={ onChangeMobileOrder }
						/>
					) }

					<SelectControl
						label={ __(
							'Image Size Adjustment',
							'snow-monkey-blocks'
						) }
						value={ imageSize }
						options={ [
							{
								value: '',
								label: __( '+-0%', 'snow-monkey-blocks' ),
							},
							{
								value: '10',
								label: __( '+10%', 'snow-monkey-blocks' ),
							},
							{
								value: '20',
								label: __( '+20%', 'snow-monkey-blocks' ),
							},
							{
								value: '30',
								label: __( '+30%', 'snow-monkey-blocks' ),
							},
							{
								value: '40',
								label: __( '+40%', 'snow-monkey-blocks' ),
							},
							{
								value: '50',
								label: __( '+50%', 'snow-monkey-blocks' ),
							},
							{
								value: '60',
								label: __( '+60%', 'snow-monkey-blocks' ),
							},
							{
								value: '70',
								label: __( '+70%', 'snow-monkey-blocks' ),
							},
							{
								value: '80',
								label: __( '+80%', 'snow-monkey-blocks' ),
							},
							{
								value: '90',
								label: __( '+90%', 'snow-monkey-blocks' ),
							},
							{
								value: '100',
								label: __( '+100%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeImageSize }
					/>

					{ isAvailableVerticalAlignment && (
						<CheckboxControl
							label={ __(
								'Adjust the height of the media to the height of the block.',
								'snow-monkey-blocks'
							) }
							checked={ imageMatchHeight }
							onChange={ onChangeImageMatchHeight }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Contents settings', 'snow-monkey-blocks' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __(
							'Content size adjustment',
							'snow-monkey-blocks'
						) }
						value={ contentSize }
						options={ contentSizeOptions }
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
							// {
							// 	value: '5',
							// 	label: __( '5%', 'snow-monkey-blocks' ),
							// },
							{
								value: '10',
								label: __( '10%', 'snow-monkey-blocks' ),
							},
							// {
							// 	value: '15',
							// 	label: __( '15%', 'snow-monkey-blocks' ),
							// },
							{
								value: '20',
								label: __( '20%', 'snow-monkey-blocks' ),
							},
							// {
							// 	value: '25',
							// 	label: __( '25%', 'snow-monkey-blocks' ),
							// },
							{
								value: '30',
								label: __( '30%', 'snow-monkey-blocks' ),
							},
							{
								value: '40',
								label: __( '40%', 'snow-monkey-blocks' ),
							},
							{
								value: '50',
								label: __( '50%', 'snow-monkey-blocks' ),
							},
						] }
						onChange={ onChangeContentHorizontalPosition }
					/>

					{ !! verticalAlignment &&
						'center' !== verticalAlignment &&
						isAvailableVerticalAlignment && (
							<SelectControl
								label={ __(
									'Vertical position of content',
									'snow-monkey-blocks'
								) }
								value={ contentVerticalPosition }
								options={ [
									{
										value: '',
										label: __(
											'+-0%',
											'snow-monkey-blocks'
										),
									},
									{
										value: 't100',
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
										value: 't80',
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
										value: 't60',
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
										value: 't40',
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
										value: 'b40',
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
										value: 'b60',
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
										value: 'b80',
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
										value: 'b100',
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
						label={ __( 'Background color', 'snow-monkey-blocks' ) }
						colorValue={ contentBackgroundColor }
						onColorChange={ onChangeContentBackgroundColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
					/>

					{ !! contentBackgroundColor && (
						<RangeControl
							label={ __(
								'Background opacity',
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
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
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
								'Remove outside padding',
								'snow-monkey-blocks'
							) }
							checked={ removeContentOutsidePadding }
							onChange={ onChangeRemoveContentOutsidePadding }
						/>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Shadow settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ColorGradientControl
						label={ __( 'Color', 'snow-monkey-blocks' ) }
						colorValue={ shadowColor }
						onColorChange={ onChangeShadowColor }
						{ ...useMultipleOriginColorsAndGradients() }
						__experimentalHasMultipleOrigins={ true }
						__experimentalIsRenderedInSidebar={ true }
					/>

					{ shadowColor && (
						<RangeControl
							label={ __(
								'Horizontal position',
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
								'Vertical position',
								'snow-monkey-blocks'
							) }
							value={ shadowVerticalPosition }
							onChange={ onChangeShadowVerticalPosition }
							min="-120"
							max="120"
						/>
					) }
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
				{ isAvailableVerticalAlignment && (
					<BlockVerticalAlignmentToolbar
						onChange={ onChangeVerticalAlignment }
						value={ verticalAlignment }
					/>
				) }

				<AlignmentToolbar
					value={ contentsAlignment }
					onChange={ onChangeContentsAlignment }
				/>

				<ToolbarGroup>
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

					<ToolbarButton
						icon={ pullLeft }
						title={ __(
							'Show media on top',
							'snow-monkey-blocks'
						) }
						isActive={ 'top' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'top' } )
						}
						className="smb-toolbar-button-rotate-90"
					/>

					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show media on bottom',
							'snow-monkey-blocks'
						) }
						isActive={ 'bottom' === imagePosition }
						onClick={ () =>
							setAttributes( { imagePosition: 'bottom' } )
						}
						className="smb-toolbar-button-rotate-90"
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
						backgroundText,
						containerClasses,
					} }
				/>

				<div className="smb-section__inner">
					<div className={ containerClasses }>
						<div className="smb-section__contents-wrapper smb-section-break-the-grid__contents-wrapper">
							<div className={ rowClasses }>
								<div className={ textColumnClasses }>
									<div
										className={ contentClasses }
										style={ contentStyles }
									>
										<Header
											isSelected={ isSelected }
											className="smb-section-break-the-grid"
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
				</div>
			</TagName>
		</>
	);
}
