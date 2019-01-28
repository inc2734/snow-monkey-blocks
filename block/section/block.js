'use strict';

import toNumber from '../../src/js/helper/to-number';
import classnames from 'classnames';
import divider from '../../src/js/helper/divider';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, SelectControl, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section', {
	title: __( 'Section', 'snow-monkey-blocks' ),
	icon: 'text',
	category: 'smb-section',
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { title, backgroundColor, contentsWidth, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

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
						] }
					>
					</PanelColorSettings>

					<PanelBody title={ __( 'Top divider Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ topDividerType }
							onChange={ ( value ) => setAttributes( { topDividerType: value } ) }
							options={ [
								{
									value: 'tilt',
									label: __( 'Tilt', 'snow-monkey-blocks' ),
								},
								{
									value: 'curve',
									label: __( 'Curve', 'snow-monkey-blocks' ),
								},
								{
									value: 'wave',
									label: __( 'Wave', 'snow-monkey-blocks' ),
								},
								{
									value: 'triangle',
									label: __( 'Triangle', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ topDividerLevel }
							onChange={ ( value ) => setAttributes( { topDividerLevel: toNumber( value, 0, 100 ) } ) }
							min="0"
							max="100"
						/>

						<BaseControl label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ topDividerColor }
								onChange={ ( value ) => setAttributes( { topDividerColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>

					<PanelBody title={ __( 'Bottom divider Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Type', 'snow-monkey-blocks' ) }
							value={ bottomDividerType }
							onChange={ ( value ) => setAttributes( { bottomDividerType: value } ) }
							options={ [
								{
									value: 'tilt',
									label: __( 'Tilt', 'snow-monkey-blocks' ),
								},
								{
									value: 'curve',
									label: __( 'Curve', 'snow-monkey-blocks' ),
								},
								{
									value: 'wave',
									label: __( 'Wave', 'snow-monkey-blocks' ),
								},
								{
									value: 'triangle',
									label: __( 'Triangle', 'snow-monkey-blocks' ),
								},
							] }
						/>

						<RangeControl
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ bottomDividerLevel }
							onChange={ ( value ) => setAttributes( { bottomDividerLevel: toNumber( value, 0, 100 ) } ) }
							min="0"
							max="100"
						/>

						<BaseControl label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								value={ bottomDividerColor }
								onChange={ ( value ) => setAttributes( { bottomDividerColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className={ classnames( 'smb-section', className ) } style={ { backgroundColor: backgroundColor } }>
					{ !! topDividerLevel &&
						<div className={ `smb-section__divider smb-section__divider--top smb-section__divider--${ topDividerType }` }>
							{ divider( topDividerType, topDividerLevel, topDividerColor ) }
						</div>
					}

					{ !! bottomDividerLevel &&
						<div className={ `smb-section__divider smb-section__divider--bottom smb-section__divider--${ bottomDividerType }` }>
							{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
						</div>
					}

					<div className="smb-section__inner" style={ { paddingTop: topDividerLevel, paddingBottom: bottomDividerLevel } }>
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
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, backgroundColor, contentsWidth, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

		return (
			<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
				{ !! topDividerLevel &&
					<div className={ `smb-section__divider smb-section__divider--top smb-section__divider--${ topDividerType }` }>
						{ divider( topDividerType, topDividerLevel, topDividerColor ) }
					</div>
				}

				{ !! bottomDividerLevel &&
					<div className={ `smb-section__divider smb-section__divider--bottom smb-section__divider--${ topDividerType }` }>
						{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
					</div>
				}

				<div className="smb-section__inner" style={ { paddingTop: topDividerLevel, paddingBottom: bottomDividerLevel } }>
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
			</div>
		);
	},

	deprecated: deprecated,
} );
