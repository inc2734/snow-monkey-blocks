'use strict';

import {
	InspectorControls,
	InspectorAdvancedControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	ToggleControl,
	TextControl,
	Dashicon,
} from '@wordpress/components';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes } ) {
	const { random, linkType, myAnchor } = attributes;

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
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

			<InspectorAdvancedControls>
				<TextControl
					label={ __( 'HTML Anchor', 'snow-monkey-blocks' ) }
					help={ __( 'Anchors lets you link directly to a section on a page.', 'snow-monkey-blocks' ) }
					value={ myAnchor || '' }
					onChange={ ( value ) => setAttributes( { myAnchor: value.replace( /[\s#]/g, '-' ) } ) }
				/>
			</InspectorAdvancedControls>

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
}
