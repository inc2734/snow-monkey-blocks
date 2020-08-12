import classnames from 'classnames';
import { get } from 'lodash';

import {
	MediaPlaceholder,
	InspectorControls,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { getResizedImages } from '../../src/js/helper/helper';

export default function( {
	attributes,
	setAttributes,
	className,
	isSelected,
} ) {
	const {
		images,
		sizeSlug,
		aspectRatio,
		arrows,
		dots,
		dotsToThumbnail,
		fade,
	} = attributes;
	const hasImages = !! images.length;

	const { resizedImages, imageSizes } = useSelect(
		( select ) => {
			const newResizedImages = [];

			if ( ! hasImages ) {
				return {
					resizedImages: newResizedImages,
				};
			}

			const { getSettings } = select( 'core/block-editor' );
			const settings = getSettings();

			images.forEach( ( image ) => {
				const { getMedia } = select( 'core' );
				const media = getMedia( image.id );
				if ( ! media ) {
					return;
				}

				newResizedImages[ image.id ] = getResizedImages(
					settings.imageSizes,
					media
				);
			} );

			return {
				resizedImages: newResizedImages,
				imageSizes: settings.imageSizes,
			};
		},
		[ images ]
	);

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-spider-slider', className, {
		[ `smb-spider-slider--${ aspectRatio }` ]: !! aspectRatio,
	} );

	const onSelectImages = ( newImages ) => {
		setAttributes( {
			images: newImages,
		} );
	};

	const onChangeSizeSlug = ( value ) => {
		const newImages = images.map( ( image ) => {
			if ( ! image.id ) {
				return image;
			}

			const newUrl = get( resizedImages, [ image.id, value, 'url' ] );
			const newWidth = get( resizedImages, [ image.id, value, 'width' ] );
			const newHeight = get( resizedImages, [
				image.id,
				value,
				'height',
			] );

			return {
				...image,
				...( newUrl && { url: newUrl } ),
				...( newWidth && { width: newWidth } ),
				...( newHeight && { height: newHeight } ),
			};
		} );

		setAttributes( {
			images: newImages,
			sizeSlug: value,
		} );
	};

	const sizeSlugOptions =
		'object' === typeof imageSizes &&
		imageSizes.map( ( imageSize ) => {
			return {
				value: imageSize.slug,
				label: imageSize.name,
			};
		} );

	const aspectRatioOptions = [
		{
			value: '',
			label: __( 'Default', 'snow-monkey-blocks' ),
		},
		{
			value: '16to9',
			label: __( '16:9', 'snow-monkey-blocks' ),
		},
		{
			value: '4to3',
			label: __( '4:3', 'snow-monkey-blocks' ),
		},
	];

	const onChangeAspectRatio = ( value ) =>
		setAttributes( {
			aspectRatio: value,
		} );

	const onChangeArrows = ( value ) =>
		setAttributes( {
			arrows: value,
		} );

	const onChangeDots = ( value ) =>
		setAttributes( {
			dots: value,
		} );

	const onChangeDotsToThumbnail = ( value ) =>
		setAttributes( {
			dotsToThumbnail: value,
		} );

	const onChangeFade = ( value ) =>
		setAttributes( {
			fade: value,
		} );

	const mediaPlaceholder = (
		<MediaPlaceholder
			addToGallery={ hasImages }
			isAppender={ hasImages }
			className={ className }
			disableMediaButtons={ hasImages && ! isSelected }
			icon={ ! hasImages && 'format-gallery' }
			labels={ {
				title: ! hasImages && __( 'Slider', 'snow-monkey-blocks' ),
				instructions:
					! hasImages &&
					__(
						'Drag images, upload new ones or select files from your library.',
						'snow-monkey-blocks'
					),
			} }
			onSelect={ onSelectImages }
			accept="image/*"
			allowedTypes={ [ 'image' ] }
			multiple
			value={ images }
		/>
	);

	if ( ! hasImages ) {
		return mediaPlaceholder;
	}

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					{ images && (
						<>
							<SelectControl
								label={ __(
									'Images size',
									'snow-monkey-blocks'
								) }
								value={ sizeSlug }
								options={ sizeSlugOptions }
								onChange={ onChangeSizeSlug }
							/>

							<SelectControl
								label={ __(
									'Aspect ratio',
									'snow-monkey-blocks'
								) }
								value={ aspectRatio }
								onChange={ onChangeAspectRatio }
								options={ aspectRatioOptions }
							/>

							<ToggleControl
								label={ __(
									'Show arrows',
									'snow-monkey-blocks'
								) }
								checked={ arrows }
								onChange={ onChangeArrows }
							/>

							<ToggleControl
								label={ __(
									'Show dots',
									'snow-monkey-blocks'
								) }
								checked={ dots }
								onChange={ onChangeDots }
							/>

							{ dots && (
								<ToggleControl
									label={ __(
										'Change dots to thumbnails',
										'snow-monkey-blocks'
									) }
									checked={ dotsToThumbnail }
									onChange={ onChangeDotsToThumbnail }
								/>
							) }

							<ToggleControl
								label={ __( 'Fade', 'snow-monkey-blocks' ) }
								checked={ fade }
								onChange={ onChangeFade }
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>

			{ images && (
				<BlockWrapper
					className={ classes }
					data-fade={ fade ? 'true' : 'false' }
				>
					<div className="spider">
						<div className="spider__canvas">
							{ images.map( ( img, index ) => {
								return (
									<div
										className="spider__slide"
										data-id={ index }
										key={ index }
									>
										<img
											className="spider__figure"
											src={ img.url }
											alt={ img.alt }
											width={ img.width }
											height={ img.height }
											data-image-id={ img.id }
										/>
									</div>
								);
							} ) }
						</div>

						{ arrows && (
							<>
								<button
									className="spider__arrow"
									data-direction="prev"
								>
									Prev
								</button>
								<button
									className="spider__arrow"
									data-direction="next"
								>
									Next
								</button>
							</>
						) }
					</div>

					{ dots && (
						<div
							className="spider__dots"
							data-thumbnails={
								dotsToThumbnail ? 'true' : 'false'
							}
						>
							{ images.map( ( img, index ) => {
								return (
									<button
										className="spider__dot"
										data-id={ index }
										key={ index }
									>
										{ dotsToThumbnail ? (
											<img
												className="spider__figure"
												src={ img.url }
												alt={ img.alt }
												width={ img.width }
												height={ img.height }
											/>
										) : (
											<>{ index }</>
										) }
									</button>
								);
							} ) }
						</div>
					) }
				</BlockWrapper>
			) }
			{ mediaPlaceholder }
		</>
	);
}
