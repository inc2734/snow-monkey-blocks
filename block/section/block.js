'use strict';

import classnames from 'classnames';
import divider from '../../src/js/helper/divider';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, SelectControl, RangeControl } = wp.components;
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
		topDividerType: {
			type: 'string',
			default: 'tilt',
		},
		topDividerLevel: {
			type: 'number',
			default: 0,
		},
		topDividerColor: {
			type: 'string',
			default: '#fff',
		},
		bottomDividerType: {
			type: 'string',
			default: 'tilt',
		},
		bottomDividerLevel: {
			type: 'number',
			default: 0,
		},
		bottomDividerColor: {
			type: 'string',
			default: '#fff',
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
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

						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>

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
							] }
						/>

						<RangeControl
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ topDividerLevel }
							onChange={ ( value ) => setAttributes( { topDividerLevel: value } ) }
							min="0"
							max="100"
						/>

						<BaseControl label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
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
							] }
						/>

						<RangeControl
							label={ __( 'Level', 'snow-monkey-blocks' ) }
							value={ bottomDividerLevel }
							onChange={ ( value ) => setAttributes( { bottomDividerLevel: value } ) }
							min="0"
							max="100"
						/>

						<BaseControl label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ bottomDividerColor }
								onChange={ ( value ) => setAttributes( { bottomDividerColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
					{ !! topDividerLevel &&
						<div className="smb-section__divider smb-section__divider--top">
							{ divider( topDividerType, topDividerLevel, topDividerColor ) }
						</div>
					}

					{ !! bottomDividerLevel &&
						<div className="smb-section__divider smb-section__divider--bottom">
							{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
						</div>
					}

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
		const { title, backgroundColor, contentsWidth, topDividerType, topDividerLevel, topDividerColor, bottomDividerType, bottomDividerLevel, bottomDividerColor } = attributes;

		return (
			<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
				{ !! topDividerLevel &&
					<div className="smb-section__divider smb-section__divider--top">
						{ divider( topDividerType, topDividerLevel, topDividerColor ) }
					</div>
				}

				{ !! bottomDividerLevel &&
					<div className="smb-section__divider smb-section__divider--bottom">
						{ divider( bottomDividerType, bottomDividerLevel, bottomDividerColor ) }
					</div>
				}

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
