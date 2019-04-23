'use strict';

import toNumber from '../../src/js/helper/to-number';
import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings, MediaPlaceholder } = wp.editor;
const { PanelBody, SelectControl, RangeControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section-with-bgimage', {
	title: __( 'Section (with background image)', 'snow-monkey-blocks' ),
	description: __( 'It is a section with a background image.', 'snow-monkey-blocks' ),
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
		const { title, imageID, imageURL, imageAlt, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax } = attributes;

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-with-bgimage': true,
				[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
				[ `smb-section-with-bgimage--${ height }` ]: true,
				[ className ]: !! className,
				'js-bg-parallax': !! parallax,
			}
		);

		const bgimageClasses = classnames(
			{
				'smb-section-with-bgimage__bgimage': true,
				'js-bg-parallax__bgimage': !! parallax,
			}
		);

		const sectionStyles = {
			color: textColor || undefined,
		};

		const maskStyles = {
			backgroundColor: maskColor || undefined,
		};

		const bgimageStyles = {
			opacity: maskOpacity,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Section Settings', 'snow-monkey-blocks' ) }>
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

						<ToggleControl
							label={ __( 'Parallax', 'snow-monkey-blocks' ) }
							checked={ parallax }
							onChange={ ( value ) => setAttributes( { parallax: value } ) }
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: maskColor,
								onChange: ( value ) => setAttributes( { maskColor: value } ),
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

				{ ! imageURL &&
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ) } }
						onSelect={ ( media ) => {
							const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
							setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
						} }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				}
				<div className={ classes } style={ sectionStyles }>
					{ !! imageURL && isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
					<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
					<div className={ bgimageClasses } style={ bgimageStyles }>
						{ imageURL &&
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
						}
					</div>
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
		const { title, imageID, imageURL, imageAlt, height, contentsAlignment, maskColor, maskOpacity, textColor, parallax } = attributes;

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-with-bgimage': true,
				[ `smb-section-with-bgimage--${ contentsAlignment }` ]: true,
				[ `smb-section-with-bgimage--${ height }` ]: true,
				[ className ]: !! className,
				'js-bg-parallax': !! parallax,
			}
		);

		const bgimageClasses = classnames(
			{
				'smb-section-with-bgimage__bgimage': true,
				'js-bg-parallax__bgimage': !! parallax,
			}
		);

		const sectionStyles = {
			color: textColor || undefined,
		};

		const maskStyles = {
			backgroundColor: maskColor || undefined,
		};

		const bgimageStyles = {
			opacity: maskOpacity,
		};

		return (
			<div className={ classes } style={ sectionStyles }>
				<div className="smb-section-with-bgimage__mask" style={ maskStyles }></div>
				<div className={ bgimageClasses } style={ bgimageStyles }>
					<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
				</div>
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
