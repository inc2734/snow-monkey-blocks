'use strict';

import { MediaPlaceholder, MediaUpload } from '@wordpress/block-editor';

import { Button } from '@wordpress/components';

import { __ } from '@wordpress/i18n';

export default function( props ) {
	const { src, id, alt, onSelect, onRemove, isSelected, url, target } = props;

	if ( ! src ) {
		return (
			<MediaPlaceholder
				icon="format-image"
				labels={ { title: __( 'Image' ) } }
				onSelect={ onSelect }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
			/>
		);
	}

	const Figure = () => {
		return (
			<div className="smb-remove-button-wrapper">
				<MediaUpload
					onSelect={ onSelect }
					type="image"
					value={ id }
					render={ ( obj ) => {
						return (
							<Button
								className="image-button"
								onClick={ obj.open }
								style={ { padding: 0 } }
							>
								<img
									src={ src }
									alt={ alt }
									className={ `wp-image-${ id }` }
								/>
							</Button>
						);
					} }
				/>
				{ isSelected && (
					<button className="smb-remove-button" onClick={ onRemove }>
						{ __( 'Remove', 'snow-monkey-blocks' ) }
					</button>
				) }
			</div>
		);
	};

	return !! url ? (
		<span
			href={ url }
			target={ '_self' === target ? undefined : target }
			rel={ '_self' === target ? undefined : 'noopener noreferrer' }
		>
			<Figure />
		</span>
	) : (
		<Figure />
	);
}
