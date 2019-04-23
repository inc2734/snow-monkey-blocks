'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings, ContrastChecker, URLInput } = wp.editor;
const { PanelBody, BaseControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/btn-box', {
	title: __( 'Button box', 'snow-monkey-blocks' ),
	description: __( 'It is a button with micro copy.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#bd3c4f',
		src: 'embed-generic',
	},
	category: 'smb',
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
	},
	styles: [
		{ name: 'default', label: __( 'Default', 'snow-monkey-blocks' ), isDefault: true },
		{ name: 'ghost', label: __( 'Ghost', 'snow-monkey-blocks' ) },
	],

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { lede, note, backgroundColor, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, btnSize } = attributes;

		const classes = classnames( 'smb-btn-box', className );

		const btnClasses = classnames(
			{
				'smb-btn': true,
				[ `smb-btn--${ btnSize }` ]: !! btnSize,
			}
		);

		const btnBoxStyle = {
			backgroundColor: backgroundColor || undefined,
		};

		const btnBoxBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};
		if ( 'is-style-ghost' === attributes.className ) {
			btnBoxBtnStyles.borderColor = btnBackgroundColor || '#fff';
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Button Settings', 'snow-monkey-blocks' ) }
					>
						<BaseControl label={ __( 'URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ btnURL }
								onChange={ ( value ) => setAttributes( { btnURL: value } ) }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Target', 'snow-monkey-blocks' ) }
							value={ btnTarget }
							onChange={ ( value ) => setAttributes( { btnTarget: value } ) }
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
							value={ btnSize }
							onChange={ ( value ) => setAttributes( { btnSize: value } ) }
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
								value: btnBackgroundColor,
								onChange: ( value ) => setAttributes( { btnBackgroundColor: value } ),
								label: __( 'Background Color of Button', 'snow-monkey-blocks' ),
							},
							{
								value: btnTextColor,
								onChange: ( value ) => setAttributes( { btnTextColor: value } ),
								label: __( 'Text Color of Button', 'snow-monkey-blocks' ),
							},
						] }
					>
						<ContrastChecker
							backgroundColor={ btnBackgroundColor }
							textColor={ btnTextColor }
						/>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes } style={ btnBoxStyle }>
					<div className="c-container">
						{ ( ! RichText.isEmpty( lede ) || isSelected ) &&
							<RichText
								className="smb-btn-box__lede"
								value={ lede }
								onChange={ ( value ) => setAttributes( { lede: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write lede...', 'snow-monkey-blocks' ) }
							/>
						}

						<div className="smb-btn-box__btn-wrapper">
							<span
								className={ btnClasses }
								href={ btnURL }
								style={ btnBoxBtnStyles }
								target={ '_self' === btnTarget ? undefined : btnTarget }
								rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
							>
								<RichText
									className="smb-btn__label"
									value={ btnLabel }
									placeholder={ __( 'Button', 'snow-monkey-blocks' ) }
									onChange={ ( value ) => setAttributes( { btnLabel: value } ) }
									style={ { color: btnTextColor } }
									formattingControls={ [] }
								/>
							</span>
						</div>

						{ ( ! RichText.isEmpty( note ) || isSelected ) &&
							<RichText
								className="smb-btn-box__note"
								value={ note }
								onChange={ ( value ) => setAttributes( { note: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write note...', 'snow-monkey-blocks' ) }
							/>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { lede, note, backgroundColor, btnLabel, btnURL, btnTarget, btnBackgroundColor, btnTextColor, btnSize } = attributes;

		const classes = classnames( 'smb-btn-box', className );

		const btnClasses = classnames(
			{
				'smb-btn': true,
				[ `smb-btn--${ btnSize }` ]: !! btnSize,
			}
		);

		const btnBoxStyle = {
			backgroundColor: backgroundColor || undefined,
		};

		const btnBoxBtnStyles = {
			backgroundColor: btnBackgroundColor || undefined,
		};
		if ( 'is-style-ghost' === attributes.className ) {
			btnBoxBtnStyles.borderColor = btnBackgroundColor || '#fff';
		}

		return (
			<div className={ classes } style={ btnBoxStyle }>
				<div className="c-container">
					{ ! RichText.isEmpty( lede ) &&
						<div className="smb-btn-box__lede">
							<RichText.Content value={ lede } />
						</div>
					}

					<div className="smb-btn-box__btn-wrapper">
						<a
							className={ btnClasses }
							href={ btnURL }
							style={ btnBoxBtnStyles }
							target={ '_self' === btnTarget ? undefined : btnTarget }
							rel={ '_self' === btnTarget ? undefined : 'noopener noreferrer' }
						>
							<span className="smb-btn__label" style={ { color: btnTextColor } }>
								<RichText.Content value={ btnLabel } />
							</span>
						</a>
					</div>

					{ ! RichText.isEmpty( note ) &&
						<div className="smb-btn-box__note">
							<RichText.Content value={ note } />
						</div>
					}
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
