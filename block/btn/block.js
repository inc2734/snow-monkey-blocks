'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, SelectControl, TextControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/btn', {
	title: __( 'Button', 'snow-monkey-blocks' ),
	icon: 'embed-generic',
	category: 'smb',
	attributes: {
		content: {
			type: 'array',
			source: 'children',
			selector: '.smb-btn__label',
			default: [ __( 'Button', 'snow-monkey-blocks' ) ],
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
					<PanelBody title={ __( 'Button Settings', 'snow-monkey-blocks' ) }>
						<TextControl
							label={ __( 'URL', 'snow-monkey-blocks' ) }
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ target }
							onChange={ ( value ) => setAttributes( { target: value } ) }
							options={ [
								{
									value: '_self',
									label: __( '_self', 'snow-monkey-blocks' ),
								},
								{
									value: '_blank',
									label: __( '_blank', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ modifier }
							onChange={ ( value ) => setAttributes( { modifier: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal button', 'snow-monkey-blocks' ),
								},
								{
									value: 'full',
									label: __( 'Full button', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ textColor }
								onChange={ ( value ) => setAttributes( { textColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="u-clearfix smb-btn-wrapper">
					<span
						className={ classnames( 'smb-btn', { [ `smb-btn--${ modifier }` ]: !! modifier } ) } href={ url } target={ target }
						style={ { backgroundColor: backgroundColor } }
					>
						<RichText
							className="smb-btn__label"
							value={ content }
							placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
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
			<div className="u-clearfix smb-btn-wrapper">
				<a
					className={ classnames( 'smb-btn', { [ `smb-btn--${ modifier }` ]: !! modifier } ) }
					href={ url }
					target={ target }
					style={ { backgroundColor: backgroundColor } }
				>
					<span className="smb-btn__label" style={ { color: textColor } }>
						{ content }
					</span>
				</a>
			</div>
		);
	},
} );
