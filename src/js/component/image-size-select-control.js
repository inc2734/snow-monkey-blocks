import { SelectControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { getResizedImages } from '@smb/helper';

export default function ( props ) {
	const { label, id, slug, onChange } = props;

	if ( ! id ) {
		return null;
	}

	const { options } = useSelect( ( select ) => {
		const { getMedia } = select( 'core' );

		const media = getMedia( id );
		if ( ! media ) {
			return {
				options: [],
			};
		}

		const { getSettings } = select( 'core/block-editor' );
		const { imageSizes } = getSettings();
		const resizedImages = getResizedImages( imageSizes, media );

		const _options = imageSizes
			.map( ( size ) => {
				if ( !! resizedImages[ size.slug ] ) {
					return { value: size.slug, label: size.name };
				}
				return false;
			} )
			.filter( ( value ) => value );

		return {
			options: _options,
		};
	} );

	if ( 1 > options.length ) {
		return null;
	}

	return (
		<SelectControl
			label={ label }
			value={ slug }
			options={ options }
			onChange={ onChange }
		/>
	);
}
