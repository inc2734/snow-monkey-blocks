'use strict';

const { MediaPlaceholder, MediaUpload } = wp.editor;
const { Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

export const Figure = ( props ) => {
	const { url, id, alt, selectHandler, removeHandler, isSelected } = props;

	if ( ! url ) {
		return (
			<MediaPlaceholder
				icon="format-image"
				labels={ { title: __( 'Image' ) } }
				onSelect={ selectHandler }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
			/>
		);
	}

	return (
		<Fragment>
			<MediaUpload
				onSelect={ selectHandler }
				type="image"
				value={ id }
				render={ ( obj ) => {
					return (
						<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
							<img src={ url } alt={ alt } className={ `wp-image-${ id }` } />
						</Button>
					);
				} }
			/>
			{ isSelected &&
				<button
					className="smb-remove-button"
					onClick={ removeHandler }
				>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
			}
		</Fragment>
	);
};
