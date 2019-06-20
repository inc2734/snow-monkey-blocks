'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, PanelColorSettings, ContrastChecker } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/box', {
	title: __( 'Box', 'snow-monkey-blocks' ),
	description: __( 'It is a box.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/box.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

		const boxStyles = {
			backgroundColor: backgroundColor || undefined,
			borderColor: borderColor || undefined,
			color: textColor || undefined,
			borderWidth: borderWidth || undefined,
		};

		const classes = classnames( 'smb-box', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Box Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Border width', 'snow-monkey-blocks' ) }
							value={ borderWidth }
							onChange={ ( value ) => setAttributes( { borderWidth: toNumber( value, 1, 5 ) } ) }
							min="1"
							max="5"
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
								value: borderColor,
								onChange: ( value ) => setAttributes( { borderColor: value } ),
								label: __( 'Border Color', 'snow-monkey-blocks' ),
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

				<div className={ classes } style={ boxStyles }>
					<div className="smb-box__body">
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

		const boxStyles = {
			backgroundColor: backgroundColor || undefined,
			borderColor: borderColor || undefined,
			color: textColor || undefined,
			borderWidth: borderWidth || undefined,
		};

		const classes = classnames( 'smb-box', className );

		return (
			<div className={ classes } style={ boxStyles }>
				<div className="smb-box__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
