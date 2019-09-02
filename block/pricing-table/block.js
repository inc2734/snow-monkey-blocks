'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../src/js/config/block';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, BaseControl, SelectControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/pricing-table', {
	title: __( 'Pricing table', 'snow-monkey-blocks' ),
	description: __( 'Let\'s present the rate plan in an easy-to-understand manner.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'warning',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/pricing-table.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { columnSize } = attributes;

		const classes = classnames(
			{
				'smb-pricing-table': true,
				[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
				[ className ]: true,
			}
		);

		const allowedBlocks = [ 'snow-monkey-blocks/pricing-table--item' ];
		const template = [ [ 'snow-monkey-blocks/pricing-table--item' ] ];

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<BaseControl
							label={ __( 'Column Size', 'snow-monkey-blocks' ) }
							help={ __( 'If the text of each item is long, it is recommended to select other than "Auto".', 'snow-monkey-blocks' ) }>
							<SelectControl
								value={ columnSize }
								options={ [
									{
										value: '',
										label: __( 'Auto', 'snow-monkey-blocks' ),
									},
									{
										value: '1-4',
										label: __( '25%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-3',
										label: __( '33%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-2',
										label: __( '50%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-1',
										label: __( '100%', 'snow-monkey-blocks' ),
									},
								] }
								onChange={ ( value ) => setAttributes( { columnSize: value } ) }
							/>
						</BaseControl>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className="c-row c-row--md-nowrap">
						<InnerBlocks
							allowedBlocks={ allowedBlocks }
							template={ template }
							templateLock={ false }
						/>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { columnSize } = attributes;

		const classes = classnames(
			{
				'smb-pricing-table': true,
				[ `smb-pricing-table--col-size-${ columnSize }` ]: !! columnSize,
				[ className ]: true,
			}
		);

		return (
			<div className={ classes }>
				<div className="c-row c-row--md-nowrap">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
