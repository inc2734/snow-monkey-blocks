import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	getFontSizeClass,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		question,
		questionFontSizeSlug,
		questionFontSize,
		questionLabelFontSizeSlug,
		questionLabelFontSize,
		answerLabelFontSizeSlug,
		answerLabelFontSize,
		questionColor,
		answerColor,
		questionLabel,
		answerLabel,
	} = attributes;

	const classes = classnames( 'smb-faq__item', className );

	const styles = {
		'--smb-faq--item-question-label-color': questionColor || undefined,
		'--smb-faq--item-answer-label-color': answerColor || undefined,
	};

	const questionFontSizeClass = !! questionFontSizeSlug
		? getFontSizeClass( questionFontSizeSlug )
		: undefined;

	const questionLabelFontSizeClass = !! questionLabelFontSizeSlug
		? getFontSizeClass( questionLabelFontSizeSlug )
		: undefined;

	const answerLabelFontSizeClass = !! answerLabelFontSizeSlug
		? getFontSizeClass( answerLabelFontSizeSlug )
		: undefined;

	return (
		<div { ...useBlockProps.save( { className: classes, style: styles } ) }>
			<div className="smb-faq__item__question">
				<div
					className={ classnames(
						'smb-faq__item__question__label',
						questionLabelFontSizeClass
					) }
					style={ {
						fontSize: questionLabelFontSize || undefined,
					} }
				>
					{ questionLabel }
				</div>
				<RichText.Content
					tagName="div"
					className={ classnames(
						'smb-faq__item__question__body',
						questionFontSizeClass
					) }
					style={ {
						fontSize: questionFontSize || undefined,
					} }
					value={ question }
				/>
			</div>

			<div className="smb-faq__item__answer">
				<div
					className={ classnames(
						'smb-faq__item__answer__label',
						answerLabelFontSizeClass
					) }
					style={ {
						fontSize: answerLabelFontSize || undefined,
					} }
				>
					{ answerLabel }
				</div>
				<div
					{ ...useInnerBlocksProps.save( {
						className: 'smb-faq__item__answer__body',
					} ) }
				/>
			</div>
		</div>
	);
}
