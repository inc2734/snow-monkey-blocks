'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

const { registerBlockType } = wp.blocks;
const { InspectorControls, InnerBlocks } = wp.editor;
const { PanelBody, RangeControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const generateThumbnailGalellryConfig = ( _config ) => {
	return {
		arrows: _config.arrows,
		speed: _config.speed,
		autoplay: _config.autoplay,
		autoplaySpeed: _config.autoplaySpeed,
	};
};

registerBlockType( 'snow-monkey-blocks/thumbnail-gallery', {
	title: __( 'Thumbnail gallery', 'snow-monkey-blocks' ),
	description: __( 'You can display a slide show with thumbnails.', 'snow-monkey-blocks' ),
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
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/thumbnail-gallery.png`,
	},

	edit( { attributes, setAttributes, className } ) {
		const { arrows, speed, autoplaySpeed } = attributes;

		const allowedBlocks = [ 'snow-monkey-blocks/thumbnail-gallery--item' ];
		const template = [ [ 'snow-monkey-blocks/thumbnail-gallery--item' ] ];

		const classes = classnames( 'smb-thumbnail-gallery', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
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
	},

	save( { attributes, className } ) {
		const { arrows, speed, autoplay, autoplaySpeed } = attributes;

		const config = generateThumbnailGalellryConfig( {
			arrows: arrows,
			speed: speed,
			autoplay: autoplay,
			autoplaySpeed: autoplaySpeed * 1000,
		} );

		const classes = classnames( 'smb-thumbnail-gallery', className );

		return (
			<div className={ classes }>
				<div className="smb-thumbnail-gallery__canvas" data-smb-thumbnail-gallery={ JSON.stringify( config ) }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
