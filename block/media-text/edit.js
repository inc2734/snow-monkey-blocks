import classnames from 'classnames';
import { times } from 'lodash';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import {
	BaseControl,
	Button,
	PanelBody,
	SelectControl,
	ToolbarGroup,
	ToolbarButton,
} from '@wordpress/components';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalImageURLInputUI as ImageURLInputUI,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

import { pullLeft, pullRight } from '@wordpress/icons';

import {
	getColumnSize,
	getMediaType,
	getResizedImages,
	isVideoType,
} from '@smb/helper';
import Figure from '@smb/component/figure';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';

const ALLOWED_TYPES = [ 'image', 'video' ];
const LINK_DESTINATION_MEDIA = 'media';
const LINK_DESTINATION_ATTACHMENT = 'attachment';

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
		mediaId,
		mediaUrl,
		mediaAlt,
		mediaWidth,
		mediaHeight,
		mediaSizeSlug,
		caption,
		mediaPosition,
		verticalAlignment,
		mediaColumnSize,
		mobileOrder,
		href,
		linkTarget,
		rel,
		linkClass,
		linkDestination,
		mediaType,
	} = attributes;

	const { resizedImages, image } = useSelect(
		( select ) => {
			if ( ! mediaId ) {
				return {
					resizedImages: {},
				};
			}

			const { getMedia } = select( 'core' );
			const media = getMedia( mediaId );
			if ( ! media ) {
				return {
					resizedImages: {},
				};
			}

			const { getSettings } = select( 'core/block-editor' );
			const { imageSizes } = getSettings();

			return {
				image: media,
				resizedImages: getResizedImages( imageSizes, media ),
			};
		},
		[ isSelected, mediaId ]
	);

	const hasInnerBlocks = useSelect(
		( select ) => {
			const { getBlock } = select( 'core/block-editor' );
			const block = getBlock( clientId );
			return !! ( block && block.innerBlocks.length );
		},
		[ clientId ]
	);

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
	const { textColumnWidth, mediaColumnWidth } = getColumnSize(
		mediaColumnSize
	);

	const classes = classnames( 'smb-media-text', className, {
		[ `smb-media-text--mobile-${ mobileOrder }` ]: !! mobileOrder,
	} );

	const rowClasses = classnames( 'c-row', 'c-row--margin', {
		'c-row--reverse': 'left' === mediaPosition,
		'c-row--top': 'top' === verticalAlignment,
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ mediaColumnWidth }`,
	] );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-media-text__body',
		},
		{
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const onChangeVerticalAlignment = ( value ) =>
		setAttributes( {
			verticalAlignment: value,
		} );

	const onChangeMediaColumnSize = ( value ) =>
		setAttributes( {
			mediaColumnSize: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onSelectImage = ( media ) => {
		const newMediaUrl =
			!! media.sizes && !! media.sizes[ mediaSizeSlug ]
				? media.sizes[ mediaSizeSlug ].url
				: media.url;

		const newMediaWidth =
			!! media.sizes && !! media.sizes[ mediaSizeSlug ]
				? media.sizes[ mediaSizeSlug ].width
				: media.width;

		const newMediaHeight =
			!! media.sizes && !! media.sizes[ mediaSizeSlug ]
				? media.sizes[ mediaSizeSlug ].height
				: media.height;

		let newHref = href;
		if ( linkDestination === LINK_DESTINATION_MEDIA ) {
			// Update the media link.
			newHref = media.url;
		}

		// Check if the image is linked to the attachment page.
		if ( linkDestination === LINK_DESTINATION_ATTACHMENT ) {
			// Update the media link.
			newHref = media.link;
		}

		setAttributes( {
			mediaType: getMediaType( media ),
			mediaLink: media.link || undefined,
			mediaId: media.id,
			mediaUrl: newMediaUrl,
			mediaAlt: media.alt,
			mediaWidth: newMediaWidth,
			mediaHeight: newMediaHeight,
			href: newHref,
		} );
	};

	const onSelectMediaUrl = ( newMediaUrl ) => {
		if ( newMediaUrl !== mediaUrl ) {
			let newHref = href;
			if ( linkDestination === LINK_DESTINATION_MEDIA ) {
				// Update the media link.
				newHref = newMediaUrl;
			}

			// Check if the image is linked to the attachment page.
			if ( linkDestination === LINK_DESTINATION_ATTACHMENT ) {
				// Update the media link.
				newHref = '';
			}

			setAttributes( {
				mediaUrl: newMediaUrl,
				mediaId: 0,
				mediaSizeSlug: 'large',
				mediaType: getMediaType( {
					media_type: isVideoType( newMediaUrl ) ? 'video' : 'image',
				} ),
				href: newHref,
			} );
		}
	};

	const onRemoveImage = () => {
		setAttributes( {
			mediaUrl: '',
			mediaAlt: '',
			mediaWidth: '',
			mediaHeight: '',
			mediaId: 0,
			mediaType: undefined,
			href: '',
			linkDestination: '',
		} );
	};

	const onSetHref = ( props ) => {
		setAttributes( props );
	};

	const onChangeMediaSizeSlug = ( value ) => {
		let newMediaUrl = mediaUrl;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].url ) {
			newMediaUrl = resizedImages[ value ].url;
		}

		let newMediaWidth = mediaWidth;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].width ) {
			newMediaWidth = resizedImages[ value ].width;
		}

		let newMediaHeight = mediaHeight;
		if ( !! resizedImages[ value ] && !! resizedImages[ value ].height ) {
			newMediaHeight = resizedImages[ value ].height;
		}

		setAttributes( {
			mediaUrl: newMediaUrl,
			mediaWidth: newMediaWidth,
			mediaHeight: newMediaHeight,
			mediaSizeSlug: value,
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
						value={ mediaColumnSize }
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
						onChange={ onChangeMediaColumnSize }
					/>
					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ mediaId }
						slug={ mediaSizeSlug }
						onChange={ onChangeMediaSizeSlug }
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
						isActive={ 'left' === mediaPosition }
						onClick={ () =>
							setAttributes( { mediaPosition: 'left' } )
						}
					/>
					<ToolbarButton
						icon={ pullRight }
						title={ __(
							'Show media on right',
							'snow-monkey-blocks'
						) }
						isActive={ 'right' === mediaPosition }
						onClick={ () =>
							setAttributes( { mediaPosition: 'right' } )
						}
					/>

					{ mediaUrl &&
						( 'image' === mediaType ||
							undefined === mediaType ) && (
							<ImageURLInputUI
								url={ href || '' }
								onChangeUrl={ onSetHref }
								linkDestination={ linkDestination }
								mediaType={ mediaType }
								mediaUrl={ mediaUrl }
								mediaLink={ image && image.link }
								linkTarget={ linkTarget }
								linkClass={ linkClass }
								rel={ rel }
							/>
						) }
				</ToolbarGroup>
			</BlockControls>

			<div { ...blockProps }>
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

						<div { ...innerBlocksProps } />
					</div>

					<div className={ imageColumnClasses }>
						<div className="smb-media-text__figure">
							<Figure
								src={ mediaUrl }
								id={ mediaId }
								alt={ mediaAlt }
								url={ href }
								target={ linkTarget }
								onSelect={ onSelectImage }
								onSelectURL={ onSelectMediaUrl }
								onRemove={ onRemoveImage }
								mediaType={ mediaType }
								allowedTypes={ ALLOWED_TYPES }
								linkClass={ linkClass }
								rel={ rel }
							/>
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
			</div>
		</>
	);
}
