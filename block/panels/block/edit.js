'use strict';

import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import { toNumber } from '../../../src/js/helper/helper';
import ResponsiveTabPanel from '../../../src/js/component/responsive-tab-panel';

export default function( { attributes, setAttributes, className } ) {
	const { sm, md, lg, imagePadding } = attributes;

	const allowedBlocks = [
		'snow-monkey-blocks/panels--item',
		'snow-monkey-blocks/panels--item--horizontal',
	];
	const template = [ [ 'snow-monkey-blocks/panels--item' ] ];

	const classes = classnames( 'smb-panels', className );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ResponsiveTabPanel
						desktop={ () => {
							return (
								<RangeControl
									label={ __(
										'Columns per row (Large window)',
										'snow-monkey-blocks'
									) }
									value={ lg }
									onChange={ ( value ) =>
										setAttributes( {
											lg: toNumber( value, 1, 4 ),
										} )
									}
									min="1"
									max="4"
								/>
							);
						} }
						tablet={ () => {
							return (
								<RangeControl
									label={ __(
										'Columns per row (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ md }
									onChange={ ( value ) =>
										setAttributes( {
											md: toNumber( value, 1, 4 ),
										} )
									}
									min="1"
									max="4"
								/>
							);
						} }
						mobile={ () => {
							return (
								<RangeControl
									label={ __(
										'Columns per row (Small window)',
										'snow-monkey-blocks'
									) }
									value={ sm }
									onChange={ ( value ) =>
										setAttributes( {
											sm: toNumber( value, 1, 4 ),
										} )
									}
									min="1"
									max="4"
								/>
							);
						} }
					/>

					<ToggleControl
						label={ __(
							'Set padding around images',
							'snow-monkey-blocks'
						) }
						checked={ imagePadding }
						onChange={ ( value ) =>
							setAttributes( { imagePadding: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes } data-image-padding={ imagePadding }>
				<div
					className="c-row c-row--margin c-row--fill"
					data-columns={ sm }
					data-md-columns={ md }
					data-lg-columns={ lg }
				>
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						template={ template }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}
