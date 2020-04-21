'use strict';

import classnames from 'classnames';

import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import Figure from '../../../../src/js/component/figure';

export default function( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const { imageID, imageURL, imageAlt, caption } = attributes;

	const classes = classnames( 'smb-thumbnail-gallery__item', className );

	const onSelectImage = ( media ) => {
		const newImageURL =
			!! media.sizes && !! media.sizes.large
				? media.sizes.large.url
				: media.url;

		setAttributes( {
			imageURL: newImageURL,
			imageID: media.id,
			imageAlt: media.alt,
		} );
	};

	const onRemoveImage = () =>
		setAttributes( {
			imageURL: '',
			imageAlt: '',
			imageID: 0,
		} );

	const onChangeCaption = ( value ) =>
		setAttributes( {
			caption: value,
		} );

	return (
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
					placeholder={ __( 'Write caption…', 'snow-monkey-blocks' ) }
					value={ caption }
					onChange={ onChangeCaption }
				/>
			) }
		</div>
	);
}
