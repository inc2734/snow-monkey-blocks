import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

import { __experimentalToolsPanel as ToolsPanel } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

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
	} = attributes;

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

	const blockProps = useBlockProps( {
		className: classes,
	} );

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

			<div { ...blockProps }>
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

				{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
					<RichText
						placeholder={ __(
							'Write caption…',
							'snow-monkey-blocks'
						) }
						value={ caption }
						onChange={ ( value ) =>
							setAttributes( {
								caption: value,
							} )
						}
					/>
				) }
			</div>
		</>
	);
}
