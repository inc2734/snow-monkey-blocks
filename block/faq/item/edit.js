import classnames from 'classnames';

import { BaseControl, PanelBody, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import {
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
	__experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function ( { attributes, setAttributes, className } ) {
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

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps( {
		className: 'smb-faq__item__answer__body',
	} );

	const onChangeQuestionLabel = ( value ) =>
		setAttributes( {
			questionLabel: value,
		} );

	const onChangeAnswerLabel = ( value ) =>
		setAttributes( {
			answerLabel: value,
		} );

	const onChangeQuestionColor = ( value ) =>
		setAttributes( {
			questionColor: value,
		} );

	const onChangeAnswerColor = ( value ) =>
		setAttributes( {
			answerColor: value,
		} );

	const onChangeQuestion = ( value ) =>
		setAttributes( {
			question: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Question Label', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq--item/question-label"
					>
						<TextControl
							value={ questionLabel }
							placeholder={ __( 'Q', 'snow-monkey-blocks' ) }
							onChange={ onChangeQuestionLabel }
							help={ sprintf(
								// translators: %d: Length
								__(
									'Recommend length up to %d',
									'snow-monkey-blocks'
								),
								Number( 2 )
							) }
						/>
					</BaseControl>
					<BaseControl
						label={ __( 'Answer Label', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq--item/answer-label"
					>
						<TextControl
							value={ answerLabel }
							placeholder={ __( 'A', 'snow-monkey-blocks' ) }
							onChange={ onChangeAnswerLabel }
							help={ sprintf(
								// translators: %d: Length
								__(
									'Recommend length up to %d',
									'snow-monkey-blocks'
								),
								Number( 2 )
							) }
						/>
					</BaseControl>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					colorSettings={ [
						{
							value: questionColor,
							onChange: onChangeQuestionColor,
							label: __( 'Question Color', 'snow-monkey-blocks' ),
						},
						{
							value: answerColor,
							onChange: onChangeAnswerColor,
							label: __( 'Answer Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="smb-faq__item__question">
					<div
						className="smb-faq__item__question__label"
						style={ faqItemQestionLabelStyles }
					>
						{ questionLabel }
					</div>
					<RichText
						className="smb-faq__item__question__body"
						placeholder={ __(
							'Write question…',
							'snow-monkey-blocks'
						) }
						value={ question }
						multiline={ false }
						onChange={ onChangeQuestion }
					/>
				</div>

				<div className="smb-faq__item__answer">
					<div
						className="smb-faq__item__answer__label"
						style={ faqItemAnswerLabelStyles }
					>
						{ answerLabel }
					</div>

					<div { ...innerBlocksProps } />
				</div>
			</div>
		</>
	);
}
