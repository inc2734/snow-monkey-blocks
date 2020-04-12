'use strict';

import classnames from 'classnames';
import { times } from 'lodash';

import { __ } from '@wordpress/i18n';
import { useState, useEffect, memo, useCallback, useMemo } from '@wordpress/element';

import {
	PanelBody,
	SelectControl,
	Button,
	BaseControl,
	ToolbarGroup,
	Popover,
} from '@wordpress/components';

import {
	RichText,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';

import { getColumnSize } from '../../../src/js/helper/helper';
import Figure from '../../../src/js/component/figure';
import LinkControl from '../../../src/js/component/link-control';

const Figure2 = memo(
	( props ) => {
		return <Figure { ...props } />;
	},
	( p, n ) => {
		console.log( p );
		console.log( n );

		const keys = Object.keys( p );
		for ( const key of keys ) {
			if ( p[ key ] !== n[ key ] ) {
				return false;
			}
		}

		return true;
	}
);

export default function( {
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
		caption,
		imagePosition,
		imageColumnSize,
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

	const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
	const { textColumnWidth, imageColumnWidth } = getColumnSize(
		imageColumnSize
	);

	const classes = classnames( 'smb-media-text', className );

	const rowClasses = classnames( 'c-row', 'c-row--margin', 'c-row--middle', {
		'c-row--reverse': 'left' === imagePosition,
	} );

	const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ textColumnWidth }`,
	] );

	const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [
		`c-row__col--lg-${ imageColumnWidth }`,
	] );

	const onChangeImagePosition = ( value ) =>
		setAttributes( {
			imagePosition: value,
		} );

	const onChangeImageColumnSize = ( value ) =>
		setAttributes( {
			imageColumnSize: value,
		} );

	const onClickTitleTagName = ( value ) =>
		setAttributes( {
			titleTagName: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onSelectImage = useCallback( ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		let newImageMediaType;
		if ( media.media_type ) {
			if ( media.media_type === 'image' ) {
				newImageMediaType = 'image';
			} else {
				// only images and videos are accepted so if the media_type is not an image we can assume it is a video.
				// video contain the media type of 'file' in the object returned from the rest api.
				newImageMediaType = 'video';
			}
		} else {
			// for media selections originated from existing files in the media library.
			newImageMediaType = media.type;
		}

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
			imageMediaType: newImageMediaType,
		} );
	}, [] );

	const onRemoveImage = useCallback( () => {
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageID: 0,
			imageMediaType: undefined,
		} );
	}, [] );

	const onChangeUrl = ( { url: newUrl, opensInNewTab } ) => {
		setAttributes( {
			url: newUrl,
			target: ! opensInNewTab ? '_self' : '_blank',
		} );
	};

	const onChangeCaption = ( value ) =>
		setAttributes( {
			caption: value,
		} );

	const imageMediaTypeFallback =
		! imageMediaType && imageURL ? 'image' : imageMediaType;

	const imageAllowdTypes = useMemo( () => [ 'image', 'video' ], [] );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
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

					<BaseControl
						label={ __( 'Title Tag', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/media-text/title-tag-name"
					>
						<div className="smb-list-icon-selector">
							{ times( titleTagNames.length, ( index ) => {
								return (
									<Button
										isDefault
										isPrimary={
											titleTagName ===
											titleTagNames[ index ]
										}
										onClick={ () =>
											onClickTitleTagName(
												titleTagNames[ index ]
											)
										}
									>
										{ titleTagNames[ index ] }
									</Button>
								);
							} ) }
						</div>
					</BaseControl>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className={ rowClasses }>
					<div className={ textColumnClasses }>
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							'none' !== titleTagName && (
								<RichText
									className="smb-media-text__title"
									tagName={ titleTagName }
									value={ title }
									onChange={ onChangeTitle }
									allowedFormats={ [] }
									placeholder={ __(
										'Write title...',
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
							<Figure2
								src={ imageURL }
								id={ imageID }
								alt={ imageAlt }
								url={ url }
								target={ target }
								onSelect={ onSelectImage }
								onRemove={ onRemoveImage }
								mediaType={ imageMediaTypeFallback }
								allowedTypes={ imageAllowdTypes }
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
									'Write caption...',
									'snow-monkey-blocks'
								) }
								value={ caption }
								onChange={ onChangeCaption }
							/>
						) }
					</div>
				</div>
			</div>

			{ imageURL && (
				<BlockControls>
					<ToolbarGroup>
						<Button
							icon="admin-links"
							className="components-toolbar__control"
							label={ __( 'Link', 'snow-monkey-blocks' ) }
							aria-expanded={ isLinkUIOpen }
							onClick={ toggleLinkUIOpen }
						/>
					</ToolbarGroup>
				</BlockControls>
			) }
		</>
	);
}
