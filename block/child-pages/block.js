'use strict';

import { blockConfig } from '../../src/js/config/block';

const { registerBlockType } = wp.blocks;
const { Dashicon, PanelBody, TextControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/child-pages', {
	title: __( 'Child pages', 'snow-monkey-blocks' ),
	description: __( 'You can display child pages of this page.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/child-pages.png`,
	},

	edit( { attributes, setAttributes } ) {
		const { title } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<TextControl
							label={ __( 'Title', 'snow-monkey-blocks' ) }
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="components-placeholder">
					<div className="components-placeholder__label">
						<Dashicon icon="screenoptions" />
						{ __( 'Child pages', 'snow-monkey-blocks' ) }
					</div>
					<div className="components-placeholder__instructions">
						{ __( 'In the actual screen, it is displayed when the page have child pages.', 'snow-monkey-blocks' ) }
					</div>
				</div>
			</Fragment>
		);
	},

	save() {
		return null;
	},
} );
