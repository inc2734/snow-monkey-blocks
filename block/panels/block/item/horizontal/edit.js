'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import {
	InspectorControls,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	BaseControl,
	Button,
	Popover,
	Toolbar,
} from '@wordpress/components';

import Figure from '../../../../../src/js/component/figure';
import LinkControl from '../../../../../src/js/component/link-control';
import ImageSizeSelectControl from '../../../../../src/js/component/image-size-select-control';
import {
	getResizedImages,
	stringToInnerText,
} from '../../../../../src/js/helper/helper';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const {
		titleTagName,
		title,
		summary,
		linkLabel,
		linkURL,
		linkTarget,
		imagePosition,
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
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

	const titleTagNames = [ 'div', 'h2', 'h3', 'none' ];

	const classes = classnames( 'c-row__col', className );

	const itemClasses = classnames(
		'smb-panels__item',
		'smb-panels__item--horizontal',
		{
			'smb-panels__item--reverse': 'right' === imagePosition,
		}
	);

	const actionClasses = classnames( 'smb-panels__item__action', {
		'smb-panels__item__action--nolabel': ! linkLabel && ! isSelected,
	} );

	const onChangeImagePosition = ( value ) =>
		setAttributes( {
			imagePosition: value,
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
		} );
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageWidth: '',
			imageHeight: '',
			imageID: 0,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeSummary = ( value ) =>
		setAttributes( {
			summary: value,
		} );

	const onChangeLinkLabel = ( value ) =>
		setAttributes( {
			linkLabel: stringToInnerText( value ),
		} );

	const onChangeLinkUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			linkURL: newUrl,
			linkTarget: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

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
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/panels--item--horizontal/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								const onClickTitleTagName = () =>
									setAttributes( {
										titleTagName: titleTagNames[ index ],
									} );

								return (
									<Button
										isDefault
										isPrimary={
											titleTagName ===
											titleTagNames[ index ]
										}
										onClick={ onClickTitleTagName }
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>

					<SelectControl
						label={ __( 'Image Position', 'snow-monkey-blocks' ) }
						value={ imagePosition }
						options={ [
							{
								value: 'right',
								label: __( 'Right side', 'snow-monkey-blocks' ),
							},
							{
								value: 'left',
								label: __( 'Left side', 'snow-monkey-blocks' ),
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
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className={ itemClasses }>
					{ ( !! imageURL || isSelected ) && (
						<div className="smb-panels__item__figure">
							<Figure
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								onSelect={ onSelectImage }
								onRemove={ onRemoveImage }
								isSelected={ isSelected }
							/>
						</div>
					) }

					<div className="smb-panels__item__body">
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									tagName={ titleTagName }
									className="smb-panels__item__title"
									placeholder={ __(
										'Write title…',
										'snow-monkey-blocks'
									) }
									value={ title }
									onChange={ onChangeTitle }
									keepPlaceholderOnFocus={ true }
								/>
							) }

						{ ( ! RichText.isEmpty( summary ) || isSelected ) && (
							<RichText
								className="smb-panels__item__content"
								placeholder={ __(
									'Write content…',
									'snow-monkey-blocks'
								) }
								value={ summary }
								onChange={ onChangeSummary }
								keepPlaceholderOnFocus={ true }
							/>
						) }

						{ ( ! RichText.isEmpty( linkLabel ) ||
							!! linkURL ||
							isSelected ) && (
							<div className={ actionClasses }>
								{ ( ! RichText.isEmpty( linkLabel ) ||
									isSelected ) && (
									<RichText
										className="smb-panels__item__link"
										value={ linkLabel }
										placeholder={ __(
											'Link',
											'snow-monkey-blocks'
										) }
										allowedFormats={ [] }
										onChange={ onChangeLinkLabel }
										keepPlaceholderOnFocus={ true }
									/>
								) }
							</div>
						) }

						{ isLinkUIOpen && (
							<Popover
								position="bottom center"
								onClose={ closeLinkUIOpen }
							>
								<LinkControl
									url={ linkURL }
									target={ linkTarget }
									onChange={ onChangeLinkUrl }
								/>
							</Popover>
						) }
					</div>
				</div>
			</div>

			<BlockControls>
				<Toolbar>
					<Button
						icon="admin-links"
						className="components-toolbar__control"
						label={ __( 'Link', 'snow-monkey-blocks' ) }
						aria-expanded={ isLinkUIOpen }
						onClick={ toggleLinkUIOpen }
					/>
				</Toolbar>
			</BlockControls>
		</>
	);
}
