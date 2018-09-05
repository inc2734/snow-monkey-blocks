'use strict';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section', {
	title: __( 'Section', 'snow-monkey-blocks' ),
	icon: 'text',
	category: 'smb-section',
	attributes: {
		title: {
			type: 'array',
			source: 'children',
			selector: '.smb-section__title',
			default: [],
		},
		backgroundColor: {
			type: 'string',
			default: null,
		},
	},
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected } ) {
		const { title, backgroundColor } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								value={ backgroundColor }
								onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
					<div className="c-container">
						{ ( title.length > 0 || isSelected ) &&
							<RichText
								className="smb-section__title"
								tagName="h2"
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
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
		const { title, backgroundColor } = attributes;

		return (
			<div className="smb-section" style={ { backgroundColor: backgroundColor } }>
				<div className="c-container">
					{ title.length > 0 &&
						<h2 className="smb-section__title">
							{ title }
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
