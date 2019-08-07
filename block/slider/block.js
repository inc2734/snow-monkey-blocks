'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl, ToggleControl, TabPanel, Dashicon } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const generateSliderConfig = ( _config ) => {
	return {
		slidesToShow: _config.slidesToShow,
		slidesToScroll: _config.slidesToScroll,
		mdSlidesToShow: _config.mdSlidesToShow,
		mdSlidesToScroll: _config.mdSlidesToScroll,
		smSlidesToShow: _config.smSlidesToShow,
		smSlidesToScroll: _config.smSlidesToScroll,
		dots: _config.dots,
		arrows: _config.arrows,
		speed: _config.speed,
		autoplay: _config.autoplay,
		autoplaySpeed: _config.autoplaySpeed,
		fade: _config.fade,
		rtl: _config.rtl,
	};
};

registerBlockType( 'snow-monkey-blocks/slider', {
	title: __( 'Slider', 'snow-monkey-blocks' ),
	description: __( 'Show attractive images as beautiful sliders.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
	},
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/slider.png`,
	},

	edit( { attributes, setAttributes, className } ) {
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
										}

										if ( 'tablet' === tab.name ) {
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
										}

										if ( 'mobile' === tab.name ) {
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
										}
									}
								}
							}
						</TabPanel>
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
	},

	save( { attributes, className } ) {
		const { slidesToShow, slidesToScroll, mdSlidesToShow, mdSlidesToScroll, smSlidesToShow, smSlidesToScroll, dots, arrows, speed, autoplay, autoplaySpeed, fade, rtl } = attributes;

		const config = generateSliderConfig( {
			slidesToShow: slidesToShow,
			slidesToScroll: slidesToScroll,
			mdSlidesToShow: mdSlidesToShow,
			mdSlidesToScroll: mdSlidesToScroll,
			smSlidesToShow: smSlidesToShow,
			smSlidesToScroll: smSlidesToScroll,
			dots: dots,
			arrows: arrows,
			speed: speed,
			autoplay: autoplay,
			autoplaySpeed: autoplaySpeed * 1000,
			fade: fade,
			rtl: rtl,
		} );

		const classes = classnames( 'smb-slider', className );
		const dir = true === config.rtl ? 'rtl' : 'ltr';

		return (
			<div className={ classes }>
				<div className="smb-slider__canvas" dir={ dir } data-smb-slider={ JSON.stringify( config ) }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
