import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	getFontSizeClass,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		tagName,
		titleTagName,
		title,
		numberColor,
		titleColor,
		titleFontSizeSlug,
		titleFontSize,
	} = attributes;

	const TagName = tagName;
	const TitleTagName = titleTagName;
	const classes = classnames( 'smb-step__item', className );

	const styles = {
		'--smb-step--number-background-color': numberColor || undefined,
		'--smb-step--title-color': titleColor || undefined,
	};

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

	return (
		<TagName
			{ ...useBlockProps.save( { className: classes, style: styles } ) }
		>
			<TitleTagName
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
			</TitleTagName>

			<div className="smb-step__item__body">
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-step__item__summary',
					} ) }
				/>
			</div>
		</TagName>
	);
}
