import classnames from 'classnames';

import { RichText, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import Figure from '@smb/component/figure';
import ImageSizeSelectControl from '@smb/component/image-size-select-control';
import { getResizedImages } from '@smb/helper';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
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

	const classes = classnames( 'smb-thumbnail-gallery__item', className );

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

	const onChangeCaption = ( value ) =>
		setAttributes( {
			caption: value,
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
					<ImageSizeSelectControl
						label={ __( 'Images size', 'snow-monkey-blocks' ) }
						id={ imageID }
						slug={ imageSizeSlug }
						onChange={ onChangeImageSizeSlug }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-thumbnail-gallery__item__figure">
					<Figure
						src={ imageURL }
						id={ imageID }
						alt={ imageAlt }
						onSelect={ onSelectImage }
						onRemove={ onRemoveImage }
						isSelected={ isSelected }
					/>
				</div>

				{ ( ! RichText.isEmpty( caption ) || isSelected ) && (
					<RichText
						className="smb-thumbnail-gallery__item__caption"
						placeholder={ __(
							'Write caption…',
							'snow-monkey-blocks'
						) }
						value={ caption }
						onChange={ onChangeCaption }
					/>
				) }
			</div>
		</>
	);
}
