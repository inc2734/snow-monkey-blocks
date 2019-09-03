'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block';
import { schema } from './_schema';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/container', {
	title: __( 'Container', 'snow-monkey-blocks' ),
	description: __( 'Container blocks keep content within a certain width.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/container.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { isSlim } = attributes;

		const classes = classnames( 'smb-container', 'c-container', className );

		const bodyClasses = classnames(
			'smb-container__body',
			{
				'u-slim-width': !! isSlim,
			}
		);

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<ToggleControl
							label={ __( 'Make the content width slim', 'snow-monkey-blocks' ) }
							checked={ isSlim }
							onChange={ ( value ) => setAttributes( { isSlim: value } ) }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className={ bodyClasses }>
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { isSlim } = attributes;

		const classes = classnames( 'smb-container', 'c-container', className );

		const bodyClasses = classnames(
			'smb-container__body',
			{
				'u-slim-width': !! isSlim,
			}
		);

		return (
			<div className={ classes }>
				<div className={ bodyClasses }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
