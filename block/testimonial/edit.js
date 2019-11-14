'use strict';

import classnames from 'classnames';
import { toNumber } from '../../src/js/helper/helper';
import ResponsiveTabPanel from '../../src/js/component/responsive-tab-panel';

import {
	PanelBody,
	RangeControl,
} from '@wordpress/components';

import {
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
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
}
