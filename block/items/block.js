'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl, TabPanel, Dashicon } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/items', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( 'Let\'s line up the contents.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { sm, md, lg } = attributes;

		const allowedBlocks = [ 'snow-monkey-blocks/items--item--standard', 'snow-monkey-blocks/items--item--block-link' ];
		const template = [ [ 'snow-monkey-blocks/items--item--standard' ] ];

		const classes = classnames( 'smb-items', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Items Settings', 'snow-monkey-blocks' ) }>
						<TabPanel
							className="smb-inspector-tabs"
							tabs={ [
								{
									name: 'desktop',
									title: <Dashicon icon="desktop" />,
								},
								{
									name: 'tablet',
									title: <Dashicon icon="tablet" />,
								},
								{
									name: 'mobile',
									title: <Dashicon icon="smartphone" />,
								},
							] }>
							{
								( tab ) => {
									if ( tab.name ) {
										if ( 'desktop' === tab.name ) {
											return (
												<RangeControl
													label={ __( 'Columns per row (Large window)', 'snow-monkey-blocks' ) }
													value={ lg }
													onChange={ ( value ) => setAttributes( { lg: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="6"
												/>
											);
										}

										if ( 'tablet' === tab.name ) {
											return (
												<RangeControl
													label={ __( 'Columns per row (Medium window)', 'snow-monkey-blocks' ) }
													value={ md }
													onChange={ ( value ) => setAttributes( { md: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="6"
												/>
											);
										}

										if ( 'mobile' === tab.name ) {
											return (
												<RangeControl
													label={ __( 'Columns per row (Small window)', 'snow-monkey-blocks' ) }
													value={ sm }
													onChange={ ( value ) => setAttributes( { sm: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="6"
												/>
											);
										}
									}
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className="c-row c-row--margin" data-columns={ sm } data-md-columns={ md } data-lg-columns={ lg }>
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
		const { sm, md, lg } = attributes;

		const classes = classnames( 'smb-items', className );

		return (
			<div className={ classes }>
				<div className="c-row c-row--margin" data-columns={ sm } data-md-columns={ md } data-lg-columns={ lg }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
