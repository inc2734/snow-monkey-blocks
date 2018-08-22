'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, SelectControl, TextControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-awesome-custom-blocks/btn', {
	title: __( 'Button', 'snow-monkey-awesome-custom-blocks' ),
	icon: 'embed-generic',
	category: 'smacb',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.smacb-btn__label',
			default: [ __( 'Button', 'snow-monkey-awesome-custom-blocks' ) ],
		},
		url: {
			type: 'string',
			default: '',
		},
		target: {
			type: 'string',
			default: '_self',
		},
		modifier: {
			type: 'string',
			default: '',
		},
		backgroundColor: {
			type: 'string',
			default: null,
		},
		textColor: {
			type: 'string',
			default: null,
		},
	},
	supports: {
		align: [ 'left', 'center', 'right' ],
	},

	edit( { attributes, setAttributes } ) {
		const { content, url, target, modifier, backgroundColor, textColor } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Button Settings', 'snow-monkey-awesome-custom-blocks' ) }>
						<TextControl
							label={ __( 'URL', 'snow-monkey-awesome-custom-blocks' ) }
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-awesome-custom-blocks' ) }
							value={ target }
							onChange={ ( value ) => setAttributes( { target: value } ) }
							options={ [
								{
									value: '_self',
									label: __( '_self', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: '_blank',
									label: __( '_blank', 'snow-monkey-awesome-custom-blocks' ),
								},
							] }
						/>

						<SelectControl
							label={ __( 'Type', 'snow-monkey-awesome-custom-blocks' ) }
							value={ modifier }
							onChange={ ( value ) => setAttributes( { modifier: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal button', 'snow-monkey-awesome-custom-blocks' ),
								},
								{
									value: 'full',
									label: __( 'Full button', 'snow-monkey-awesome-custom-blocks' ),
								},
							] }
						/>

						<BaseControl label={ __( 'Background Color', 'snow-monkey-awesome-custom-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Text Color', 'snow-monkey-awesome-custom-blocks' ) }>
							<ColorPalette
								value={ textColor }
								onChange={ ( value ) => setAttributes( { textColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="u-clearfix smacb-btn-wrapper">
					<span
						className={ classnames( 'smacb-btn', { [ `smacb-btn--${ modifier }` ]: !! modifier } ) } href={ url } target={ target }
						style={ { backgroundColor: backgroundColor } }
					>
						<RichText
							tagName="span"
							className="smacb-btn__label"
							value={ content }
							placeholder={ __( 'Button', 'snow-monkey-awesome-custom-blocks' ) }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							style={ { color: textColor } }
							formattingControls={ [] }
						/>
					</span>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { content, url, target, modifier, backgroundColor, textColor } = attributes;

		return (
			<div className="u-clearfix smacb-btn-wrapper">
				<a
					className={ classnames( 'smacb-btn', { [ `smacb-btn--${ modifier }` ]: !! modifier } ) }
					href={ url }
					target={ target }
					style={ { backgroundColor: backgroundColor } }
				>
					<span className="smacb-btn__label" style={ { color: textColor } }>
						{ content }
					</span>
				</a>
			</div>
		);
	},

	deprecated: [
		{
			attributes: {
				content: {
					type: 'array',
					source: 'children',
					selector: '.smacb-btn__label',
					default: [ __( 'Button', 'snow-monkey-awesome-custom-blocks' ) ],
				},
				url: {
					type: 'string',
				},
				target: {
					type: 'string',
					default: '_self',
				},
				modifier: {
					type: 'string',
				},
				backgroundColor: {
					type: 'string',
				},
				textColor: {
					type: 'string',
				},
			},
			save( { attributes } ) {
				const { content, url, target, modifier, backgroundColor, textColor } = attributes;

				return (
					<a
						className={ classnames( 'smacb-btn', { [ `smacb-btn--${ modifier }` ]: !! modifier } ) }
						href={ url }
						target={ target }
						style={ { backgroundColor: backgroundColor } }
					>
						<span className="smacb-btn__label" style={ { color: textColor } }>
							{ content }
						</span>
					</a>
				);
			},
		},
	],
} );
