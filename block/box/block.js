'use strict';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-awesome-custom-blocks/box', {
	title: __( 'Box', 'snow-monkey-awesome-custom-blocks' ),
	icon: 'admin-comments',
	category: 'smacb',
	attributes: {
		backgroundColor: {
			type: 'string',
			default: null,
		},
		borderColor: {
			type: 'string',
			default: null,
		},
		textColor: {
			type: 'string',
			default: null,
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
					<PanelBody title={ __( 'Box Settings', 'snow-monkey-awesome-custom-blocks' ) }>
						<BaseControl label={ __( 'Background Color', 'snow-monkey-awesome-custom-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Border Color', 'snow-monkey-awesome-custom-blocks' ) }>
							<ColorPalette
								value={ borderColor }
								onChange={ ( value ) => setAttributes( { borderColor: value } ) }
							/>
						</BaseControl>

						<BaseControl label={ __( 'Text Color', 'snow-monkey-awesome-custom-blocks' ) }>
							<ColorPalette
								value={ textColor }
								onChange={ ( value ) => setAttributes( { textColor: value } ) }
							/>
						</BaseControl>

						<RangeControl
							label={ __( 'Border width', 'snow-monkey-awesome-custom-blocks' ) }
							value={ borderWidth }
							onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
							min="1"
							max="5"
						/>
					</PanelBody>
				</InspectorControls>

				<div
					className="smacb-box"
					style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor, borderWidth: borderWidth } }
				>
					<div className="smacb-box__body">
						<InnerBlocks
							allowedBlocks={ [ 'core/image', 'core/paragraph', 'core/list' ] }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { backgroundColor, borderColor, textColor, borderWidth } = attributes;

		return (
			<div
				className="smacb-box"
				style={ { backgroundColor: backgroundColor, borderColor: borderColor, color: textColor, borderWidth: borderWidth } }
			>
				<div className="smacb-box__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
