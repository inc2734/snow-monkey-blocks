'use strict';

const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, SelectControl, ToggleControl, Dashicon } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/pickup-slider', {
	title: __( 'Pickup slider', 'snow-monkey-blocks' ),
	description: __( 'Display posts with pickup tags as a slider.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#bd3c4f',
		src: 'format-gallery',
	},
	category: 'smb',

	edit( { attributes, setAttributes } ) {
		const { random, linkType } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Pickup Slider Settings', 'snow-monkey-blocks' ) }>
						<ToggleControl
							label={ __( 'Display in random order', 'snow-monkey-blocks' ) }
							checked={ random }
							onChange={ ( value ) => setAttributes( { random: value } ) }
						/>

						<SelectControl
							label={ __( 'Link type', 'snow-monkey-blocks' ) }
							value={ linkType }
							onChange={ ( value ) => setAttributes( { linkType: value } ) }
							options={ [
								{
									value: 'button',
									label: __( 'Button link', 'snow-monkey-blocks' ),
								},
								{
									value: 'overall',
									label: __( 'Overall link', 'snow-monkey-blocks' ),
								},
							] }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="components-placeholder">
					<div className="components-placeholder__label">
						<Dashicon icon="format-gallery" />
						{ __( 'Pickup slider', 'snow-monkey-blocks' ) }
					</div>
					<div className="components-placeholder__instructions">
						{ __( 'Posts with "pickup" tag are displayed as sliders.', 'snow-monkey-blocks' ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
