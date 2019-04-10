'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/faq--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the FAQ block.', 'snow-monkey-blocks' ),
	icon: 'businessman',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/faq' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { question, answer, questionColor, answerColor } = attributes;

		const classes = classnames( 'smb-faq__item', className );

		const faqItemQestionLabelStyles = {
			color: questionColor || undefined,
		};

		const faqItemAnswerLabelStyles = {
			color: answerColor || undefined,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						colorSettings={ [
							{
								value: questionColor,
								onChange: ( value ) => setAttributes( { questionColor: value } ),
								label: __( 'Question Color', 'snow-monkey-blocks' ),
							},
							{
								value: answerColor,
								onChange: ( value ) => setAttributes( { answerColor: value } ),
								label: __( 'Answer Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-faq__item__question">
						<div className="smb-faq__item__question__label" style={ faqItemQestionLabelStyles }>
							Q
						</div>
						<RichText
							className="smb-faq__item__question__body"
							placeholder={ __( 'Write question...', 'snow-monkey-blocks' ) }
							value={ question }
							formattingControls={ [] }
							multiline={ false }
							onChange={ ( value ) => setAttributes( { question: value } ) }
						/>
					</div>

					<div className="smb-faq__item__answer">
						<div className="smb-faq__item__answer__label" style={ faqItemAnswerLabelStyles }>
							A
						</div>
						<RichText
							className="smb-faq__item__answer__body"
							placeholder={ __( 'Write answer...', 'snow-monkey-blocks' ) }
							value={ answer }
							multiline="p"
							onChange={ ( value ) => setAttributes( { answer: value } ) }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { question, answer, questionColor, answerColor } = attributes;

		const classes = classnames( 'smb-faq__item', className );

		const faqItemQestionLabelStyles = {
			color: questionColor || undefined,
		};

		const faqItemAnswerLabelStyles = {
			color: answerColor || undefined,
		};

		return (
			<div className={ classes }>
				<div className="smb-faq__item__question">
					<div className="smb-faq__item__question__label" style={ faqItemQestionLabelStyles }>
						Q
					</div>
					<div className="smb-faq__item__question__body">
						<RichText.Content value={ question } />
					</div>
				</div>

				<div className="smb-faq__item__answer">
					<div className="smb-faq__item__answer__label" style={ faqItemAnswerLabelStyles }>
						A
					</div>
					<div className="smb-faq__item__answer__body">
						<RichText.Content value={ answer } />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
