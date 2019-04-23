'use strict';

import toNumber from '../../src/js/helper/to-number';
import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings, URLInput } = wp.editor;
const { PanelBody, SelectControl, RangeControl, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const getVideoId = ( videoURL ) => {
	const VIDEO_ID_REGEX = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
	const matches = videoURL.match( VIDEO_ID_REGEX );
	if ( !! matches ) {
		return matches[ 1 ];
	}
};

registerBlockType( 'snow-monkey-blocks/section-with-bgvideo', {
	title: __( 'Section (with background video)', 'snow-monkey-blocks' ),
	description: __( 'It is a section with a background video.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#cd162c',
		src: 'text',
	},
	category: 'smb-section',
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { title, videoURL, videoWidth, videoHeight, height, contentsAlignment, maskColor, maskOpacity, textColor } = attributes;

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-with-bgimage': true,
				'smb-section-with-bgvideo': true,
				[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
				[ `smb-section-with-bgimage--${ height }` ]: true,
				[ className ]: !! className,
			}
		);

		const bgvideoClasses = classnames(
			{
				'smb-section-with-bgimage__bgimage': true,
			}
		);

		const sectionStyles = {
			color: textColor || undefined,
		};

		const maskStyles = {
			backgroundColor: maskColor || undefined,
			opacity: 1 - maskOpacity,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'YouTube URL', 'snow-monkey-blocks' ) }>
							<URLInput
								value={ videoURL }
								onChange={ ( value ) => setAttributes( { videoURL: value } ) }
							/>
						</BaseControl>

						<RangeControl
							label={ __( 'Video width', 'snow-monkey-blocks' ) }
							value={ videoWidth }
							onChange={ ( value ) => setAttributes( { videoWidth: toNumber( value, 1, 960 ) } ) }
							min="1"
							max="960"
						/>

						<RangeControl
							label={ __( 'Video height', 'snow-monkey-blocks' ) }
							value={ videoHeight }
							onChange={ ( value ) => setAttributes( { videoHeight: toNumber( value, 1, 960 ) } ) }
							min="1"
							max="960"
						/>

						<SelectControl
							label={ __( 'Height', 'snow-monkey-blocks' ) }
							value={ height }
							options={ [
								{
									value: 'fit',
									label: __( 'Fit', 'snow-monkey-blocks' ),
								},
								{
									value: 'wide',
									label: __( 'Wide', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { height: value } ) }
						/>

						<SelectControl
							label={ __( 'Contents alignment', 'snow-monkey-blocks' ) }
							value={ contentsAlignment }
							options={ [
								{
									value: 'left',
									label: __( 'Left side', 'snow-monkey-blocks' ),
								},
								{
									value: 'center',
									label: __( 'Center', 'snow-monkey-blocks' ),
								},
								{
									value: 'right',
									label: __( 'Right side', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentsAlignment: value } ) }
						/>

						<RangeControl
							label={ __( 'Mask Opacity', 'snow-monkey-blocks' ) }
							value={ maskOpacity }
							onChange={ ( value ) => setAttributes( { maskOpacity: toNumber( value, 0, 1 ) } ) }
							min={ 0 }
							max={ 1 }
							step={ 0.1 }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: maskColor,
								onChange: ( value ) => setAttributes( { maskColor: value || 'transparent' } ),
								label: __( 'Mask Color', 'snow-monkey-blocks' ),
							},
							{
								value: textColor,
								onChange: ( value ) => setAttributes( { textColor: value } ),
								label: __( 'Text Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classes } style={ sectionStyles }>
					<div className={ bgvideoClasses }>
						{ videoURL &&
							<img src={ `http://i.ytimg.com/vi/${ getVideoId( videoURL ) }/maxresdefault.jpg` } alt="" />
						}
					</div>
					<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
					<div className="c-container">
						{ ( ! RichText.isEmpty( title ) || isSelected ) &&
							<RichText
								className="smb-section__title"
								tagName="h2"
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								formattingControls={ [] }
								placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
							/>
						}

						<div className="smb-section__body">
							<InnerBlocks />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, videoURL, videoWidth, videoHeight, height, contentsAlignment, maskColor, maskOpacity, textColor } = attributes;

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-with-bgvideo': true,
				'smb-section-with-bgimage': true,
				[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
				[ `smb-section-with-bgimage--${ height }` ]: true,
				[ className ]: !! className,
			}
		);

		const bgvideoClasses = classnames(
			{
				'smb-section-with-bgimage__bgimage': true,
			}
		);

		const sectionStyles = {
			color: textColor || undefined,
		};

		const maskStyles = {
			backgroundColor: maskColor || undefined,
			opacity: 1 - maskOpacity,
		};

		return (
			<div className={ classes } style={ sectionStyles }>
				<div className={ bgvideoClasses }>
					{ videoURL &&
						<Fragment>
							<iframe allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" src={ `https://www.youtube.com/embed/${ getVideoId( videoURL ) }?controls=0&autoplay=1&showinfo=0&rel=0&disablekb=1&iv_load_policy=3&loop=1&playlist=${ getVideoId( videoURL ) }&playsinline=1&modestbranding=1` } width={ videoWidth } height={ videoHeight } frameBorder="0" title={ videoURL } />
							<img src={ `http://i.ytimg.com/vi/${ getVideoId( videoURL ) }/maxresdefault.jpg` } alt="" />
						</Fragment>
					}
				</div>
				<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
				<div className="c-container">
					{ ! RichText.isEmpty( title ) &&
						<h2 className="smb-section__title">
							<RichText.Content value={ title } />
						</h2>
					}
					<div className="smb-section__body">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
