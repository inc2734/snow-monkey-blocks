import classnames from 'classnames';

import {
	RichText,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, className } ) {
	const {
		question,
		questionColor,
		answerColor,
		questionLabel,
		answerLabel,
	} = attributes;

	const classes = classnames( 'smb-faq__item', className );

	const faqItemQestionLabelStyles = {
		color: questionColor || undefined,
	};

	const faqItemAnswerLabelStyles = {
		color: answerColor || undefined,
	};

	return (
		<div { ...useBlockProps.save( { className: classes } ) }>
			<div className="smb-faq__item__question">
				<div
					className="smb-faq__item__question__label"
					style={ faqItemQestionLabelStyles }
				>
					{ questionLabel }
				</div>
				<RichText.Content
					tagName="div"
					className="smb-faq__item__question__body"
					value={ question }
				/>
			</div>

			<div className="smb-faq__item__answer">
				<div
					className="smb-faq__item__answer__label"
					style={ faqItemAnswerLabelStyles }
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
