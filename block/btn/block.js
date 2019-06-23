'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';
import { deprecated } from './_deprecated.js';
import { schema } from './_schema.js';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, ContrastChecker, URLInput } = wp.editor;
const { PanelBody, BaseControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/btn', {
	title: __( 'Button', 'snow-monkey-blocks' ),
	description: __( 'Prompt visitors to take action with a button-style link.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'embed-generic',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	supports: {
		align: [ 'left', 'center', 'right' ],
	},
	styles: [
		{ name: 'default', label: __( 'Default', 'snow-monkey-blocks' ), isDefault: true },
		{ name: 'ghost', label: __( 'Ghost', 'snow-monkey-blocks' ) },
	],
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/btn.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { content, url, target, modifier, backgroundColor, textColor } = attributes;

		const wrapperClasses = classnames( 'u-clearfix', 'smb-btn-wrapper', className );

		const classes = classnames(
			{
				'smb-btn': true,
				[ `smb-btn--${ modifier }` ]: !! modifier,
			}
		);

		const btnStyles = {
			backgroundColor: backgroundColor || undefined,
		};
		if ( 'is-style-ghost' === attributes.className ) {
			btnStyles.borderColor = backgroundColor || '#fff';
		}

		const btnLabelStyles = {
			color: textColor || undefined,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ url }
								onChange={ ( value ) => setAttributes( { url: value } ) }
							/>
						</BaseControl>
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
							label={ __( 'Button size', 'snow-monkey-blocks' ) }
							value={ modifier }
							onChange={ ( value ) => setAttributes( { modifier: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal size', 'snow-monkey-blocks' ),
								},
								{
									value: 'full',
									label: __( 'Full size', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: backgroundColor,
								onChange: ( value ) => setAttributes( { backgroundColor: value } ),
								label: __( 'Background Color', 'snow-monkey-blocks' ),
							},
							{
								value: textColor,
								onChange: ( value ) => setAttributes( { textColor: value } ),
								label: __( 'Text Color', 'snow-monkey-blocks' ),
							},
						] }
					>
						<ContrastChecker
							backgroundColor={ backgroundColor }
							textColor={ textColor }
						/>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ wrapperClasses }>
					<span
						className={ classes }
						href={ url }
						style={ btnStyles }
						target={ '_self' === target ? undefined : target }
						rel={ '_self' === target ? undefined : 'noopener noreferrer' }
					>
						<RichText
							className="smb-btn__label"
							value={ content }
							placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
							onChange={ ( value ) => setAttributes( { content: value } ) }
							style={ btnLabelStyles }
							formattingControls={ [] }
						/>
					</span>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { content, url, target, modifier, backgroundColor, textColor } = attributes;

		const wrapperClasses = classnames( 'u-clearfix', 'smb-btn-wrapper', className );

		const classes = classnames(
			{
				'smb-btn': true,
				[ `smb-btn--${ modifier }` ]: !! modifier,
			}
		);

		const btnStyles = {
			backgroundColor: backgroundColor || undefined,
		};
		if ( 'is-style-ghost' === attributes.className ) {
			btnStyles.borderColor = backgroundColor || '#fff';
		}

		const btnLabelStyles = {
			color: textColor || undefined,
		};

		return (
			<div className={ wrapperClasses }>
				<a
					className={ classes }
					href={ url }
					style={ btnStyles }
					target={ '_self' === target ? undefined : target }
					rel={ '_self' === target ? undefined : 'noopener noreferrer' }
				>
					<span className="smb-btn__label" style={ btnLabelStyles }>
						<RichText.Content value={ content } />
					</span>
				</a>
			</div>
		);
	},

	deprecated: deprecated,
} );
