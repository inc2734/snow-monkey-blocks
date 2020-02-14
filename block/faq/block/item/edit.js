'use strict';

import classnames from 'classnames';

import { PanelBody, BaseControl, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
	InnerBlocks,
} from '@wordpress/block-editor';

export default function( { attributes, setAttributes, className } ) {
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
							onChange={ ( value ) =>
								setAttributes( { questionLabel: value } )
							}
							help={ sprintf(
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
							onChange={ ( value ) =>
								setAttributes( { answerLabel: value } )
							}
							help={ sprintf(
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
							onChange: ( value ) =>
								setAttributes( { questionColor: value } ),
							label: __( 'Question Color', 'snow-monkey-blocks' ),
						},
						{
							value: answerColor,
							onChange: ( value ) =>
								setAttributes( { answerColor: value } ),
							label: __( 'Answer Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
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
							'Write question...',
							'snow-monkey-blocks'
						) }
						value={ question }
						allowedFormats={ [] }
						multiline={ false }
						onChange={ ( value ) =>
							setAttributes( { question: value } )
						}
					/>
				</div>

				<div className="smb-faq__item__answer">
					<div
						className="smb-faq__item__answer__label"
						style={ faqItemAnswerLabelStyles }
					>
						{ answerLabel }
					</div>

					<div className="smb-faq__item__answer__body">
						<InnerBlocks />
					</div>
				</div>
			</div>
		</>
	);
}
