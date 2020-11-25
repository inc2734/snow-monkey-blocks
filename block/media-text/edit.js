import classnames from 'classnames';
import { times } from 'lodash';

import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
	Button,
	BaseControl,
	ToolbarGroup,
	ToolbarButton,
	Popover,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockVerticalAlignmentToolbar,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';

import { pullLeft, pullRight } from '@wordpress/icons';

import { getColumnSize, getMediaType, getResizedImages } from '@smb/helper';
import Figure from '@smb/component/figure';
import LinkControl from '@smb/component/link-control';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		caption,
		imagePosition,
		verticalAlignment,
		imageColumnSize,
		mobileOrder,
		url,
		target,
		imageMediaType,
	} = attributes;

	const [ isLinkUIOpen, setIsLinkUIOpen ] = useState( false );
	const toggleLinkUIOpen = () => setIsLinkUIOpen( ! isLinkUIOpen );
	const closeLinkUIOpen = () => setIsLinkUIOpen( false );
	useEffect( () => {
		if ( ! isSelected ) {
			closeLinkUIOpen();
		}
	}, [ isSelected ] );

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

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		imageColumnSize
	);

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-media-text', className, {
		[ `smb-media-text--mobile-${ mobileOrder }` ]: !! mobileOrder,
	} );

	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		'c-row--reverse': 'left' === imagePosition,
		'c-row--top': 'top' === verticalAlignment,
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ imageColumnWidth }`,
	] );

	const onChangeVerticalAlignment = ( value ) =>
		setAttributes( {
			verticalAlignment: value,
		} );

	const onChangeImageColumnSize = ( value ) =>
		setAttributes( {
			imageColumnSize: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
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

	const onRemoveImage = () => {
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
			imageID: 0,
			imageMediaType: undefined,
		} );
	};

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) =>
		setAttributes( {
			url: newUrl,
			target: ! opensInNewTab ? '_self' : '_blank',
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

	const onChangeMobileOrder = ( value ) =>
		setAttributes( {
			mobileOrder: '' === value ? undefined : value,
		} );

	const onChangeCaption = ( value ) =>
		setAttributes( {
			caption: value,
		} );

	const toolbarControls = [
		{
			icon: pullLeft,
			title: __( 'Show media on left', 'snow-monkey-blocks' ),
			isActive: 'left' === imagePosition,
			onClick: () => setAttributes( { imagePosition: 'left' } ),
		},
		{
			icon: pullRight,
			title: __( 'Show media on right', 'snow-monkey-blocks' ),
			isActive: 'right' === imagePosition,
			onClick: () => setAttributes( { imagePosition: 'right' } ),
		},
	];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<SelectControl
						label={ __(
							'Image Column Size',
							'snow-monkey-blocks'
						) }
						value={ imageColumnSize }
						options={ [
							{
								value: 66,
								label: __( '66%', 'snow-monkey-blocks' ),
							},
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
						onChange={ onChangeImageColumnSize }
					/>
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
								value: undefined,
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
					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/media-text/title-tag-name"
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
				</PanelBody>
			</InspectorControls>

			<BlockControls>
				<ToolbarGroup controls={ toolbarControls } />
				<BlockVerticalAlignmentToolbar
					onChange={ onChangeVerticalAlignment }
					value={ verticalAlignment }
				/>

				{ imageURL &&
					( 'image' === imageMediaType ||
						undefined === imageMediaType ) && (
						<ToolbarGroup>
							<ToolbarButton
								icon="admin-links"
								className="components-toolbar__control"
								label={ __( 'Link', 'snow-monkey-blocks' ) }
								aria-expanded={ isLinkUIOpen }
								onClick={ toggleLinkUIOpen }
							/>

							{ !! url && (
								<ToolbarButton
									isPressed
									icon="editor-unlink"
									className="components-toolbar__control"
									label={ __(
										'Unlink',
										'snow-monkey-blocks'
									) }
									onClick={ () => onChangeUrl( '', false ) }
								/>
							) }
						</ToolbarGroup>
					) }
			</BlockControls>

			<BlockWrapper className={ classes }>
				<div className={ rowClasses }>
					<div className={ textColumnClasses }>
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									className="smb-media-text__title"
									tagName={ titleTagName }
									value={ title }
									onChange={ onChangeTitle }
									placeholder={ __(
										'Write title…',
										'snow-monkey-blocks'
									) }
								/>
							) }
						<div className="smb-media-text__body">
							<InnerBlocks />
						</div>
					</div>
					<div className={ imageColumnClasses }>
						<div className="smb-media-text__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								url={ url }
								target={ target }
								onSelect={ onSelectImage }
								onRemove={ onRemoveImage }
								mediaType={ imageMediaType }
								allowedTypes={ [ 'image', 'video' ] }
							/>

							{ isLinkUIOpen && (
								<Popover
									position="bottom center"
									onClose={ closeLinkUIOpen }
								>
									<LinkControl
										url={ url }
										target={ target }
										onChange={ onChangeUrl }
									/>
								</Popover>
							) }
						</div>

						{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
							<RichText
								className="smb-media-text__caption"
								placeholder={ __(
									'Write caption…',
									'snow-monkey-blocks'
								) }
								value={ caption }
								onChange={ onChangeCaption }
							/>
						) }
					</div>
				</div>
			</BlockWrapper>
		</>
	);
}
