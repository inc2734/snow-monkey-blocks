'use strict';

import toNumber from '../../src/js/helper/to-number';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/box', {
	title: __( 'Box', 'snow-monkey-blocks' ),
	icon: 'admin-comments',
	category: 'smb',
	attributes: {
		backgroundColor: {
			type: 'string',
		},
		borderColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		borderWidth: {
			type: 'number',
			default: 1,
		},
	},

	edit( { attributes, setAttributes } ) {
		const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Box Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Border Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ borderColor }
								onChange={ ( value ) => setAttributes( { borderColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Text Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ textColor }
								onChange={ ( value ) => setAttributes( { textColor: value } ) }
							/>
						</BaseControl>

						<RangeControl
							label={ __( 'Border width', 'snow-monkey-blocks' ) }
							value={ borderWidth }
							onChange={ ( value ) => setAttributes( { borderWidth: toNumber( value, 1, 5 ) } ) }
							min="1"
							max="5"
						/>
					</PanelBody>
				</InspectorControls>

				<div
					className="smb-box"
					style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor, borderWidth: borderWidth } }
				>
					<div className="smb-box__body">
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

		return (
			<div
				className="smb-box"
				style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor, borderWidth: borderWidth } }
			>
				<div className="smb-box__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
