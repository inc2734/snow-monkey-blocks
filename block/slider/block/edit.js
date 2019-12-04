'use strict';

import classnames from 'classnames';
import { toNumber } from '../../../src/js/helper/helper';
import ResponsiveTabPanel from '../../../src/js/component/responsive-tab-panel';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
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
	const { slidesToShow, slidesToScroll, mdSlidesToShow, mdSlidesToScroll, smSlidesToShow, smSlidesToScroll, dots, arrows, speed, autoplaySpeed, fade, rtl } = attributes;

	const allowedBlocks = [ 'snow-monkey-blocks/slider--item' ];
	const template = [ [ 'snow-monkey-blocks/slider--item' ] ];

	const classes = classnames( 'smb-slider', className );

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
					<ToggleControl
						label={ __( 'Show dot indicators', 'snow-monkey-blocks' ) }
						checked={ dots }
						onChange={ ( value ) => setAttributes( { dots: value } ) }
					/>
					<ToggleControl
						label={ __( 'Prev/Next Arrows', 'snow-monkey-blocks' ) }
						checked={ arrows }
						onChange={ ( value ) => setAttributes( { arrows: value } ) }
					/>
					<RangeControl
						label={ __( 'Slide animation speed in milliseconds', 'snow-monkey-blocks' ) }
						value={ speed }
						onChange={ ( value ) => setAttributes( { speed: toNumber( value, 100, 1000 ) } ) }
						min="100"
						max="1000"
						step="100"
					/>
					<RangeControl
						label={ __( 'Autoplay Speed in seconds', 'snow-monkey-blocks' ) }
						value={ autoplaySpeed }
						onChange={ ( value ) => {
							setAttributes( { autoplaySpeed: toNumber( value, 0, 10 ) } );
							if ( 0 < autoplaySpeed ) {
								setAttributes( { autoplay: true } );
							} else {
								setAttributes( { autoplay: false } );
							}
						} }
						min="0"
						max="10"
					/>
					<ToggleControl
						label={ __( 'Enable fade', 'snow-monkey-blocks' ) }
						checked={ fade }
						onChange={ ( value ) => setAttributes( { fade: value } ) }
					/>
					<ToggleControl
						label={ __( 'Change the slider\'s direction to become right-to-left', 'snow-monkey-blocks' ) }
						checked={ rtl }
						onChange={ ( value ) => setAttributes( { rtl: value } ) }
					/>

					<ResponsiveTabPanel
						desktop={ () => {
							return (
								<Fragment>
									<RangeControl
										label={ __( '# of slides to show (Large window)', 'snow-monkey-blocks' ) }
										value={ slidesToShow }
										onChange={ ( value ) => setAttributes( { slidesToShow: toNumber( value, 1, 6 ) } ) }
										min="1"
										max="6"
									/>
									<RangeControl
										label={ __( '# of slides to scroll (Large window)', 'snow-monkey-blocks' ) }
										value={ slidesToScroll }
										onChange={ ( value ) => setAttributes( { slidesToScroll: toNumber( value, 1, 6 ) } ) }
										min="1"
										max="6"
									/>
								</Fragment>
							);
						} }
						tablet={ () => {
							return (
								<Fragment>
									<RangeControl
										label={ __( '# of slides to show (Medium window)', 'snow-monkey-blocks' ) }
										value={ mdSlidesToShow }
										onChange={ ( value ) => setAttributes( { mdSlidesToShow: toNumber( value, 1, 6 ) } ) }
										min="1"
										max="6"
									/>
									<RangeControl
										label={ __( '# of slides to scroll (Medium window)', 'snow-monkey-blocks' ) }
										value={ mdSlidesToScroll }
										onChange={ ( value ) => setAttributes( { mdSlidesToScroll: toNumber( value, 1, 6 ) } ) }
										min="1"
										max="6"
									/>
								</Fragment>
							);
						} }
						mobile={ () => {
							return (
								<Fragment>
									<RangeControl
										label={ __( '# of slides to show (Small window)', 'snow-monkey-blocks' ) }
										value={ smSlidesToShow }
										onChange={ ( value ) => setAttributes( { smSlidesToShow: toNumber( value, 1, 6 ) } ) }
										min="1"
										max="6"
									/>
									<RangeControl
										label={ __( '# of slides to scroll (Small window)', 'snow-monkey-blocks' ) }
										value={ smSlidesToScroll }
										onChange={ ( value ) => setAttributes( { smSlidesToScroll: toNumber( value, 1, 6 ) } ) }
										min="1"
										max="6"
									/>
								</Fragment>
							);
						} }
					/>
				</PanelBody>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-slider__canvas">
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
