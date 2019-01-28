'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/faq--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'businessman',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/faq' ],
	attributes: {
		question: {
			source: 'html',
			selector: '.smb-faq__item__question__body',
		},
		answer: {
			source: 'html',
			selector: '.smb-faq__item__answer__body',
		},
		questionColor: {
			type: 'string',
		},
		answerColor: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes, className } ) {
		const { question, answer, questionColor, answerColor } = attributes;

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

				<div className={ classnames( 'smb-faq__item', className ) }>
					<div className="smb-faq__item__question">
						<div className="smb-faq__item__question__label" style={ { color: questionColor } }>
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
						<div className="smb-faq__item__answer__label" style={ { color: answerColor } }>
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

	save( { attributes } ) {
		const { question, answer, questionColor, answerColor } = attributes;

		return (
			<div className="smb-faq__item">
				<div className="smb-faq__item__question">
					<div className="smb-faq__item__question__label" style={ { color: questionColor } }>
						Q
					</div>
					<div className="smb-faq__item__question__body">
						<RichText.Content value={ question } />
					</div>
				</div>

				<div className="smb-faq__item__answer">
					<div className="smb-faq__item__answer__label" style={ { color: answerColor } }>
						A
					</div>
					<div className="smb-faq__item__answer__body">
						<RichText.Content value={ answer } />
					</div>
				</div>
			</div>
		);
	},
} );
