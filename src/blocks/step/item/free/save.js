import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	getFontSizeClass,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const { title, numberColor, titleColor, titleFontSizeSlug, titleFontSize } =
		attributes;

	const classes = classnames( 'smb-step__item', className );

	const styles = {
		'--smb-step--number-background-color': numberColor || undefined,
		'--smb-step--title-color': titleColor || undefined,
	};

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<div
				className={ classnames(
					'smb-step__item__title',
					titleFontSizeClass
				) }
				style={ {
					fontSize: titleFontSize || undefined,
				} }
			>
				<div className="smb-step__item__number" />
				<RichText.Content tagName="span" value={ title } />
			</div>

			<div className="smb-step__item__body">
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-step__item__summary',
					} ) }
				/>
			</div>
		</div>
	);
}
