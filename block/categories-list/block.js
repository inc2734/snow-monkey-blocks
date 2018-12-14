'use strict';

const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, RangeControl, Dashicon } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/categories-list', {
	title: __( 'Categories list', 'snow-monkey-blocks' ),
	description: __( 'This block is displayed only on the actual screen.', 'snow-monkey-blocks' ),
	icon: 'excerpt-view',
	category: 'smb',

	edit( { attributes, setAttributes } ) {
		const { articles } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Categories list Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Categories list Articles', 'snow-monkey-blocks' ) }
							value={ articles }
							onChange={ ( value ) => setAttributes( { articles: value } ) }
							min="0"
							max="5"
						/>
					</PanelBody>
				</InspectorControls>
				<div className="components-placeholder">
					<div className="components-placeholder__label">
						<Dashicon icon="excerpt-view" />
						{ __( 'Categories list', 'snow-monkey-blocks' ) }
					</div>
					<div className="components-placeholder__instructions">
						{ __( 'displayed categories list on the actual screen.', 'snow-monkey-blocks' ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
