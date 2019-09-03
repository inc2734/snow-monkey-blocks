'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

import { ResponsiveTabPanel } from '../../src/js/component/responsive-tab-panel';

const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/testimonial', {
	title: __( 'Testimonial', 'snow-monkey-blocks' ),
	description: __( 'Let\'s arrange the voice of the customer.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'admin-comments',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/testimonial.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { md, lg } = attributes;

		const allowedBlocks = [ 'snow-monkey-blocks/testimonial--item' ];
		const template = [ [ 'snow-monkey-blocks/testimonial--item' ] ];

		const classes = classnames( 'smb-testimonial', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<ResponsiveTabPanel
							desktop={ () => {
								return (
									<RangeControl
										label={ __( 'Columns per row (Large window)', 'snow-monkey-blocks' ) }
										value={ lg }
										onChange={ ( value ) => setAttributes( { lg: toNumber( value, 1, 4 ) } ) }
										min="1"
										max="4"
									/>
								);
							} }
							tablet={ () => {
								return (
									<RangeControl
										label={ __( 'Columns per row (Medium window)', 'snow-monkey-blocks' ) }
										value={ md }
										onChange={ ( value ) => setAttributes( { md: toNumber( value, 1, 2 ) } ) }
										min="1"
										max="2"
									/>
								);
							} }
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-testimonial__body">
						<div className="c-row c-row--margin" data-columns="1" data-md-columns={ md } data-lg-columns={ lg }>
							<InnerBlocks
								allowedBlocks={ allowedBlocks }
								template={ template }
								templateLock={ false }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { md, lg } = attributes;

		const classes = classnames( 'smb-testimonial', className );

		return (
			<div className={ classes }>
				<div className="smb-testimonial__body">
					<div className="c-row c-row--margin" data-columns="1" data-md-columns={ md } data-lg-columns={ lg }>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
