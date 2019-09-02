'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../src/js/config/block';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, InnerBlocks } = wp.editor;
const { PanelBody, BaseControl, TextControl } = wp.components;
const { Fragment } = wp.element;
const { __, sprintf } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/faq--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the FAQ block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'businessman',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/faq' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { question, questionColor, answerColor, questionLabel, answerLabel } = attributes;

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
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Question Label', 'snow-monkey-blocks' ) }>
							<TextControl
								value={ questionLabel }
								placeholder={ __( 'Q', 'snow-monkey-blocks' ) }
								onChange={ ( value ) => setAttributes( { questionLabel: value } ) }
								help={ sprintf( __( 'Recommend length up to %d', 'snow-monkey-blocks' ), Number( 2 ) ) }
							/>
						</BaseControl>
						<BaseControl label={ __( 'Answer Label', 'snow-monkey-blocks' ) }>
							<TextControl
								value={ answerLabel }
								placeholder={ __( 'A', 'snow-monkey-blocks' ) }
								onChange={ ( value ) => setAttributes( { answerLabel: value } ) }
								help={ sprintf( __( 'Recommend length up to %d', 'snow-monkey-blocks' ), Number( 2 ) ) }
							/>
						</BaseControl>
					</PanelBody>
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
							{ questionLabel }
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
							{ answerLabel }
						</div>

						<div className="smb-faq__item__answer__body">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { question, questionColor, answerColor, questionLabel, answerLabel } = attributes;

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
						{ questionLabel }
					</div>
					<div className="smb-faq__item__question__body">
						<RichText.Content value={ question } />
					</div>
				</div>

				<div className="smb-faq__item__answer">
					<div className="smb-faq__item__answer__label" style={ faqItemAnswerLabelStyles }>
						{ answerLabel }
					</div>
					<div className="smb-faq__item__answer__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
