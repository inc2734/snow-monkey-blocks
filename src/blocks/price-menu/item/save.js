import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	getFontSizeClass,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		title,
		price,
		titleFontSizeSlug,
		titleFontSize,
		priceFontSizeSlug,
		priceFontSize,
	} = attributes;

	const classes = classnames( 'smb-price-menu__item', className );

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

	const priceFontSizeClass = !! priceFontSizeSlug
		? getFontSizeClass( priceFontSizeSlug )
		: undefined;

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div
				className={ classnames(
					'smb-price-menu__item__title',
					titleFontSizeClass
				) }
				style={ {
					fontSize: titleFontSize || undefined,
				} }
			>
				<RichText.Content value={ title } />
			</div>

			<div
				className={ classnames(
					'smb-price-menu__item__price',
					priceFontSizeClass
				) }
				style={ {
					fontSize: priceFontSize || undefined,
				} }
			>
				<RichText.Content value={ price } />
			</div>
		</div>
	);
}
