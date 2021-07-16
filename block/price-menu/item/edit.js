import classnames from 'classnames';

import { RichText, useBlockProps } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className } ) {
	const { title, price } = attributes;

	const classes = classnames( 'smb-price-menu__item', className );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangePrice = ( value ) =>
		setAttributes( {
			price: value,
		} );

	return (
		<div { ...blockProps }>
			<RichText
				className="smb-price-menu__item__title"
				placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
				value={ title }
				onChange={ onChangeTitle }
			/>

			<RichText
				className="smb-price-menu__item__price"
				placeholder={ __( 'Write price…', 'snow-monkey-blocks' ) }
				value={ price }
				onChange={ onChangePrice }
			/>
		</div>
	);
}
