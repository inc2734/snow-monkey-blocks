import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import { BaseControl, PanelBody, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		question,
		questionColor,
		answerColor,
		questionLabel,
		answerLabel,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

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

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-faq__item__answer__body',
		},
		{
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

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
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: questionColor,
							onColorChange: onChangeQuestionColor,
							label: __( 'Question color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: answerColor,
							onColorChange: onChangeAnswerColor,
							label: __( 'Answer color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				></PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<BaseControl
						label={ __( 'Question label', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq-item/question-label"
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
						label={ __( 'Answer label', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/faq-item/answer-label"
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
