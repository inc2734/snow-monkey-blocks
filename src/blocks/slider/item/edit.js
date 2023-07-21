import classnames from 'classnames';

import {
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

import {
	Popover,
	ToolbarButton,
	__experimentalToolsPanel as ToolsPanel,
} from '@wordpress/components';

import { useMergeRefs } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { link as linkIcon } from '@wordpress/icons';

import Figure from '@smb/component/figure';
import ResolutionTool from '@smb/component/resolution-tool';

const ALLOWED_TYPES = [ 'image' ];
const DEFAULT_MEDIA_SIZE_SLUG = 'full';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	isSelected,
	className,
	clientId,
} ) {
	const {
		imageID,
		imageURL,
		imageAlt,
		imageWidth,
		imageHeight,
		imageSizeSlug,
		caption,
		url,
		target,
	} = attributes;

	const [ isEditingURL, setIsEditingURL ] = useState( false );
	const isURLSet = !! url;
	const opensInNewTab = target === '_blank';

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [ popoverAnchor, setPopoverAnchor ] = useState( null );

	const { imageSizes, image } = useSelect(
		( select ) => {
			const { getSettings } = select( 'core/block-editor' );
			return {
				image:
					imageID && isSelected
						? select( 'core' ).getMedia( imageID, {
								context: 'view',
						  } )
						: null,
				imageSizes: getSettings()?.imageSizes,
			};
		},

		[ isSelected, imageID, clientId ]
	);

	const imageSizeOptions = imageSizes
		.filter(
			( { slug } ) => image?.media_details?.sizes?.[ slug ]?.source_url
		)
		.map( ( { name, slug } ) => ( { value: slug, label: name } ) );

	const classes = classnames( 'c-row__col', className );

	const ref = useRef();

	const blockProps = useBlockProps( {
		className: classes,
		ref: useMergeRefs( [ setPopoverAnchor, ref ] ),
	} );

	const unlink = () => {
		setAttributes( {
			url: undefined,
			target: undefined,
		} );
		setIsEditingURL( false );
	};

	const item = (
		<>
			<div className="smb-slider__item__figure">
				<Figure
					src={ imageURL }
					id={ imageID }
					alt={ imageAlt }
					width={ imageWidth }
					height={ imageHeight }
					onSelect={ ( media ) => {
						const newImageSizeSlug = !! media?.sizes?.[
							imageSizeSlug
						]
							? imageSizeSlug
							: DEFAULT_MEDIA_SIZE_SLUG;
						const newImageUrl =
							media?.sizes?.[ newImageSizeSlug ]?.url;
						const newImageWidth =
							media?.sizes?.[ newImageSizeSlug ]?.width;
						const newImageHeight =
							media?.sizes?.[ newImageSizeSlug ]?.height;

						setAttributes( {
							imageURL: newImageUrl || media.url,
							imageID: media.id,
							imageAlt: media.alt,
							imageWidth: newImageWidth || media.width,
							imageHeight: newImageHeight || media.height,
							imageSizeSlug: newImageSizeSlug,
						} );
					} }
					onSelectURL={ ( newURL ) => {
						if ( newURL !== imageURL ) {
							setAttributes( {
								imageURL: newURL,
								imageID: 0,
								mediaSizeSlug: DEFAULT_MEDIA_SIZE_SLUG,
							} );
						}
					} }
					onRemove={ () =>
						setAttributes( {
							imageURL: metadata.attributes.imageURL.default,
							imageAlt: metadata.attributes.imageAlt.default,
							imageWidth: metadata.attributes.imageWidth.default,
							imageHeight:
								metadata.attributes.imageHeight.default,
							imageID: metadata.attributes.imageID.default,
						} )
					}
					allowedTypes={ ALLOWED_TYPES }
				/>

				{ isSelected && isEditingURL && (
					<Popover
						placement="bottom"
						anchor={ popoverAnchor }
						onClose={ () => {
							setIsEditingURL( false );
						} }
					>
						<LinkControl
							className="wp-block-navigation-link__inline-link-input"
							value={ { url, opensInNewTab } }
							onChange={ ( {
								url: newUrl,
								opensInNewTab: newOpensInNewTab,
							} ) => {
								setAttributes( {
									url: newUrl,
									target: ! newOpensInNewTab
										? '_self'
										: '_blank',
								} );
							} }
							onRemove={ () => {
								unlink();
							} }
							forceIsEditingLink={ ! isURLSet }
						/>
					</Popover>
				) }
			</div>

			{ isSelected && (
				<RichText
					className="smb-slider__item__caption"
					placeholder={ __( 'Write caption…', 'snow-monkey-blocks' ) }
					value={ caption }
					onChange={ ( value ) =>
						setAttributes( {
							caption: value,
						} )
					}
				/>
			) }
		</>
	);

	return (
		<>
			<InspectorControls>
				{ 0 < imageSizeOptions.length && (
					<ToolsPanel
						label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					>
						<ResolutionTool
							defaultValue={
								metadata.attributes.imageSizeSlug.default
							}
							value={ imageSizeSlug }
							options={ imageSizeOptions }
							onChange={ ( value ) => {
								const newImageUrl =
									image?.media_details?.sizes?.[ value ]
										?.source_url;
								const newImageWidth =
									image?.media_details?.sizes?.[ value ]
										?.width;
								const newImageHeight =
									image?.media_details?.sizes?.[ value ]
										?.height;

								setAttributes( {
									imageURL: newImageUrl,
									imageWidth: newImageWidth,
									imageHeight: newImageHeight,
									imageSizeSlug: value,
								} );
							} }
						/>
					</ToolsPanel>
				) }
			</InspectorControls>

			<div { ...blockProps }>{ item }</div>

			<BlockControls group="block">
				<ToolbarButton
					name="link"
					icon={ linkIcon }
					title={ __( 'Link', 'snow-monkey-blocks' ) }
					onClick={ ( event ) => {
						event.preventDefault();
						setIsEditingURL( true );
					} }
					isActive={ isURLSet }
				/>
			</BlockControls>
		</>
	);
}
