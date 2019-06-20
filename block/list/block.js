'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, BaseControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/list', {
	title: __( 'Icon list', 'snow-monkey-blocks' ),
	description: __( 'Icons are displayed only on the actual screen.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-ul',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/list.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { content, icon, iconColor } = attributes;

		const iconList = [
			{
				value: 'angle-right',
				label: __( 'angle-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'angle-double-right',
				label: __( 'angle-double-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'arrow-alt-circle-right',
				label: __( 'arrow-alt-circle-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'arrow-right',
				label: __( 'arrow-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'check',
				label: __( 'check', 'snow-monkey-blocks' ),
			},
			{
				value: 'check-circle',
				label: __( 'check-circle', 'snow-monkey-blocks' ),
			},
			{
				value: 'check-square',
				label: __( 'check-square', 'snow-monkey-blocks' ),
			},
			{
				value: 'chevron-circle-right',
				label: __( 'chevron-circle-right', 'snow-monkey-blocks' ),
			},
			{
				value: 'hand-point-right',
				label: __( 'hand-point-right', 'snow-monkey-blocks' ),
			},
		];

		const classes = classnames( 'smb-list', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'List Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Icon', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( iconList.length, ( index ) => {
									const value = iconList[ index ].value;

									return (
										<Button
											isDefault
											isPrimary={ icon === value }
											onClick={ () => setAttributes( { icon: value } ) }
										>
											<i className={ `fas fa-${ iconList[ index ].value }` } title={ iconList[ index ].label } />
										</Button>
									);
								} ) }
							</div>
						</BaseControl>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: iconColor,
								onChange: ( value ) => setAttributes( { iconColor: value } ),
								label: __( 'Icon Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes } data-icon={ icon } data-icon-color={ iconColor }>
					<RichText
						tagName="ul"
						multiline="li"
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
					/>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { content, icon, iconColor } = attributes;

		const classes = classnames( 'smb-list', className );

		return (
			<div className={ classes } data-icon={ icon } data-icon-color={ iconColor }>
				<ul>
					<RichText.Content value={ content } />
				</ul>
			</div>
		);
	},

	deprecated: deprecated,
} );
