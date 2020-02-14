'use strict';

import classnames from 'classnames';

import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import { toNumber } from '../../../src/js/helper/helper';

export default function( { attributes, setAttributes, className } ) {
	const { arrows, speed, autoplaySpeed } = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/thumbnail-gallery--item' ];
	const template = [ [ 'snow-monkey-blocks/thumbnail-gallery--item' ] ];

	const classes = classnames( 'smb-thumbnail-gallery', className );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Prev/Next Arrows', 'snow-monkey-blocks' ) }
						checked={ arrows }
						onChange={ ( value ) =>
							setAttributes( { arrows: value } )
						}
					/>
					<RangeControl
						label={ __(
							'Slide animation speed in milliseconds',
							'snow-monkey-blocks'
						) }
						value={ speed }
						onChange={ ( value ) =>
							setAttributes( {
								speed: toNumber( value, 100, 1000 ),
							} )
						}
						min="100"
						max="1000"
						step="100"
					/>
					<RangeControl
						label={ __(
							'Autoplay Speed in seconds',
							'snow-monkey-blocks'
						) }
						value={ autoplaySpeed }
						onChange={ ( value ) => {
							const newValue = toNumber( value, 0, 10 );
							setAttributes( { autoplaySpeed: newValue } );
							if ( 0 < newValue ) {
								setAttributes( { autoplay: true } );
							} else {
								setAttributes( { autoplay: false } );
							}
						} }
						min="0"
						max="10"
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-thumbnail-gallery__canvas">
					<InnerBlocks
						allowedBlocks={ allowedBlocks }
						template={ template }
						templateLock={ false }
					/>
				</div>
			</div>
		</Fragment>
	);
}
