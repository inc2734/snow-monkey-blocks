'use strict';

import toNumber from '../../src/js/helper/to-number';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl, TabPanel, Dashicon } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/items', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	icon: 'screenoptions',
	category: 'smb',
	attributes: {
		sm: {
			type: 'number',
			default: 1,
		},
		md: {
			type: 'number',
			default: 1,
		},
		lg: {
			type: 'number',
			default: 2,
		},
	},

	edit( { attributes, setAttributes } ) {
		const { sm, md, lg } = attributes;

		const allowedBlocks = [ 'snow-monkey-blocks/items--item' ];
		const template = [ [ 'snow-monkey-blocks/items--item' ] ];

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
													label={ __( 'Columns per row (large window)', 'snow-monkey-blocks' ) }
													value={ lg }
													onChange={ ( value ) => setAttributes( { lg: toNumber( value, 1, 4 ) } ) }
													min="1"
													max="4"
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
													max="4"
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
													max="4"
												/>
											);
										}
									}
								}
							}
						</TabPanel>
					</PanelBody>
				</InspectorControls>

				<div className="smb-items">
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

	save( { attributes } ) {
		const { sm, md, lg } = attributes;

		return (
			<div className="smb-items">
				<div className="c-row c-row--margin" data-columns={ sm } data-md-columns={ md } data-lg-columns={ lg }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
