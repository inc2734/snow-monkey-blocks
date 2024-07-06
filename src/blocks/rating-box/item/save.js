import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	getFontSizeClass,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		title,
		rating,
		color,
		titleFontSizeSlug,
		titleFontSize,
		numericFontSizeSlug,
		numericFontSize,
	} = attributes;

	const classes = classnames( 'smb-rating-box__item', className );

	const styles = {
		'--smb-rating-box--rating-background-color': color || undefined,
	};

	const itemEvaluationRatingStyles = {
		width: `${ rating * 10 }%`,
	};

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

	const numericFontSizeClass = !! numericFontSizeSlug
		? getFontSizeClass( numericFontSizeSlug )
		: undefined;

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<div className="smb-rating-box__item__body">
				<div
					className={ classnames(
						'smb-rating-box__item__title',
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
						'smb-rating-box__item__numeric',
						numericFontSizeClass
					) }
					style={ {
						fontSize: numericFontSize || undefined,
					} }
				>
					{ rating }
				</div>
			</div>

			<div className="smb-rating-box__item__evaluation">
				<div className="smb-rating-box__item__evaluation__bar">
					<div
						className="smb-rating-box__item__evaluation__rating"
						style={ itemEvaluationRatingStyles }
					/>
				</div>
			</div>
		</div>
	);
}
