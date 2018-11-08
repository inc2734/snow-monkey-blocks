'use strict';

import classnames from 'classnames';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section', {
	title: __( 'Section', 'snow-monkey-blocks' ),
	icon: 'text',
	category: 'smb-section',
	attributes: {
		title: {
			source: 'html',
			selector: '.smb-section__title',
		},
		backgroundColor: {
			type: 'string',
			default: null,
		},
		contentsWidth: {
			type: 'string',
			default: null,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, backgroundColor, contentsWidth } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings', 'snow-monkey-blocks' ) }>
						<SelectControl
							label={ __( 'Contents Width', 'snow-monkey-blocks' ) }
							value={ contentsWidth }
							onChange={ ( value ) => setAttributes( { contentsWidth: value } ) }
							options={ [
								{
									value: '',
									label: __( 'Normal', 'snow-monkey-blocks' ),
								},
								{
									value: 'slim',
									label: __( 'Slim', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
					<div className={ classnames( 'c-container', { 'u-slim-width': 'slim' === contentsWidth } ) }>
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							<RichText
								className="smb-section__title"
								tagName="h2"
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							/>
						}

						<div className="smb-section__body">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, backgroundColor, contentsWidth } = attributes;

		return (
			<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
				<div className={ classnames( 'c-container', { 'u-slim-width': 'slim' === contentsWidth } ) }>
					{ ! RichText.isEmpty( title ) &&
						<h2 className="smb-section__title">
							<RichText.Content value={ title } />
						</h2>
					}

					<div className="smb-section__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
