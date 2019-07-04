'use strict';

import classnames from 'classnames';
import hexToRgba from 'hex-to-rgba';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings, MediaPlaceholder, MediaUpload, ColorPalette } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button, RangeControl, ToggleControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/section-break-the-grid', {
	title: __( 'Section (break the grid)', 'snow-monkey-blocks' ),
	description: __( 'It is a break the grid section.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'text',
	},
	category: blockConfig.blockCategories.section,
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
		anchor: true,
	},
	snowMonkeyBlocks: {
		isPro: true,
		screenshot: null,
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, imageID, imageURL, imageAlt, textColor, imagePosition, imageSize, contentSize, contentHorizontalPosition, contentVerticalPosition, contentBackgroundColor, contentPadding, removeContentOutsidePadding, shadowColor, shadowHorizontalPosition, shadowVerticalPosition } = attributes;

		const titleTagNames = [ 'h2', 'h3', 'none' ];

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-break-the-grid': true,
				[ `smb-section-break-the-grid--${ imagePosition }` ]: true,
				[ className ]: !! className,
			}
		);

		const rowClasses = classnames(
			{
				'c-row': true,
				'c-row--margin': true,
				'c-row--lg-middle': ! contentVerticalPosition,
				'c-row--lg-top': contentVerticalPosition && contentVerticalPosition.startsWith( 't' ),
				'c-row--lg-bottom': contentVerticalPosition && contentVerticalPosition.startsWith( 'b' ),
			}
		);

		const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', 'c-row__col--lg-1-2' );
		const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', 'c-row__col--lg-1-2' );

		const figureClasses = classnames(
			{
				'smb-section-break-the-grid__figure': true,
				[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
			}
		);

		const contentClasses = classnames(
			{
				'smb-section-break-the-grid__content': true,
				[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
				[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
				'smb-section-break-the-grid__content--remove-outside-p': contentPadding && removeContentOutsidePadding,
				[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
				[ `smb-section-break-the-grid__content--vertical-${ contentVerticalPosition }` ]: !! contentVerticalPosition,
			}
		);

		const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

		const sectionStyles = {
			color: textColor || undefined,
		};

		const shadowStyles = {};
		if ( shadowColor ) {
			shadowStyles.backgroundColor = shadowColor;
		}
		if ( shadowHorizontalPosition || shadowVerticalPosition ) {
			shadowStyles.transform = `translate(${ shadowHorizontalPosition || 0 }%, ${ shadowVerticalPosition || 0 }%)`;
		}

		const contentStyles = {
			backgroundColor: contentBackgroundColor && hexToRgba( contentBackgroundColor, 0.98 ),
		};

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.xlarge ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id } );
		};

		const Figure = () => {
			if ( ! imageURL ) {
				return (
					<MediaPlaceholder
						icon="format-image"
						labels={ { title: __( 'Image' ) } }
						onSelect={ onSelectImage }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
					/>
				);
			}

			return (
				<Fragment>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ imageID }
						render={ ( obj ) => {
							return (
								<Button className="image-button" onClick={ obj.open } style={ { padding: 0 } }>
									<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>

					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<BaseControl label={ __( 'Title Tag', 'snow-monkey-blocks' ) }>
							<div className="smb-list-icon-selector">
								{ times( titleTagNames.length, ( index ) => {
									return (
										<Button
											isDefault
											isPrimary={ titleTagName === titleTagNames[ index ] }
											onClick={ () => setAttributes( { titleTagName: titleTagNames[ index ] } ) }
										>
											{ titleTagNames[ index ] }
										</Button>
									);
								} ) }
							</div>
						</BaseControl>

						<SelectControl
							label={ __( 'Image position', 'snow-monkey-blocks' ) }
							value={ imagePosition }
							options={ [
								{
									value: 'left',
									label: __( 'Left side', 'snow-monkey-blocks' ),
								},
								{
									value: 'right',
									label: __( 'Right side', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
						/>

						<SelectControl
							label={ __( 'image Size Adjustment', 'snow-monkey-blocks' ) }
							value={ imageSize }
							options={ [
								{
									value: 'm',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( '+40%', 'snow-monkey-blocks' ),
								},
								{
									value: 'xl',
									label: __( '+80%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imageSize: value } ) }
						/>
					</PanelBody>

					<PanelBody title={ __( 'Contents Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Content Size Adjustment', 'snow-monkey-blocks' ) }
							value={ contentSize }
							options={ [
								{
									value: 'xs',
									label: __( '-40%', 'snow-monkey-blocks' ),
								},
								{
									value: 's',
									label: __( '-20%', 'snow-monkey-blocks' ),
								},
								{
									value: 'm',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( '+20%', 'snow-monkey-blocks' ),
								},
								{
									value: 'xl',
									label: __( '+40%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentSize: value } ) }
						/>

						<SelectControl
							label={ __( 'Degree of overlap of content to image', 'snow-monkey-blocks' ) }
							value={ contentHorizontalPosition }
							options={ [
								{
									value: '',
									label: __( '+-0%', 'snow-monkey-blocks' ),
								},
								{
									value: 'xs',
									label: __( '5%', 'snow-monkey-blocks' ),
								},
								{
									value: 's',
									label: __( '10%', 'snow-monkey-blocks' ),
								},
								{
									value: 'm',
									label: __( '15%', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( '20%', 'snow-monkey-blocks' ),
								},
								{
									value: 'xl',
									label: __( '25%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentHorizontalPosition: value } ) }
						/>

						<SelectControl
							label={ __( 'Vertical Margin', 'snow-monkey-blocks' ) }
							value={ contentVerticalPosition }
							options={ [
								{
									value: '',
									label: __( 'None', 'snow-monkey-blocks' ),
								},
								{
									value: 'txl',
									label: __( '[Top] +60%', 'snow-monkey-blocks' ),
								},
								{
									value: 'tl',
									label: __( '[Top] +45%', 'snow-monkey-blocks' ),
								},
								{
									value: 'tm',
									label: __( '[Top] +30%', 'snow-monkey-blocks' ),
								},
								{
									value: 'ts',
									label: __( '[Top] +15%', 'snow-monkey-blocks' ),
								},
								{
									value: 'bs',
									label: __( '[Bottom] +15%', 'snow-monkey-blocks' ),
								},
								{
									value: 'bm',
									label: __( '[Bottom] +30%', 'snow-monkey-blocks' ),
								},
								{
									value: 'bl',
									label: __( '[Bottom] +45%', 'snow-monkey-blocks' ),
								},
								{
									value: 'bxl',
									label: __( '[Bottom] +60%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentVerticalPosition: value } ) }
						/>

						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Background Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								onChange={ ( value ) => setAttributes( { contentBackgroundColor: value } ) }
								value={ contentBackgroundColor }
							/>
						</BaseControl>

						<SelectControl
							label={ __( 'Content Padding', 'snow-monkey-blocks' ) }
							value={ contentPadding }
							options={ [
								{
									value: '',
									label: __( 'None', 'snow-monkey-blocks' ),
								},
								{
									value: 's',
									label: __( 'S', 'snow-monkey-blocks' ),
								},
								{
									value: 'm',
									label: __( 'M', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( 'L', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentPadding: value } ) }
						/>

						{ contentPadding &&
							<ToggleControl
								label={ __( 'Remove Outside Padding', 'snow-monkey-blocks' ) }
								checked={ removeContentOutsidePadding }
								onChange={ ( value ) => setAttributes( { removeContentOutsidePadding: value } ) }
							/>
						}
					</PanelBody>

					<PanelBody title={ __( 'Shadow Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<BaseControl
							className="editor-color-palette-control"
							label={ __( 'Color', 'snow-monkey-blocks' ) }>
							<ColorPalette
								className="editor-color-palette-control__color-palette"
								onChange={ ( value ) => setAttributes( { shadowColor: value } ) }
								value={ shadowColor }
							/>
						</BaseControl>

						{ shadowColor &&
							<RangeControl
								label={ __( 'Horizontal Position', 'snow-monkey-blocks' ) }
								value={ shadowHorizontalPosition }
								onChange={ ( value ) => setAttributes( { shadowHorizontalPosition: toNumber( value, -120, 120 ) } ) }
								min="-120"
								max="120"
							/>
						}

						{ shadowColor &&
							<RangeControl
								label={ __( 'Vertical Position', 'snow-monkey-blocks' ) }
								value={ shadowVerticalPosition }
								onChange={ ( value ) => setAttributes( { shadowVerticalPosition: toNumber( value, -120, 120 ) } ) }
								min="-120"
								max="120"
							/>
						}
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
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
					<div className="c-container">
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div className={ contentClasses } style={ contentStyles }>
									{ ( ! RichText.isEmpty( title ) || isSelected ) && 'none' !== titleTagName &&
										<RichText
											className="smb-section__title smb-section-break-the-grid__title"
											tagName={ titleTagName }
											value={ title }
											onChange={ ( value ) => setAttributes( { title: value } ) }
											formattingControls={ [] }
											placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
										/>
									}

									<div className="smb-section__body smb-section-break-the-grid__body">
										<InnerBlocks />
									</div>
								</div>
							</div>
							<div className={ imageColumnClasses }>
								<div className={ figureClasses }>
									{ shadowColor &&
										<div className={ shadowClasses } style={ shadowStyles }></div>
									}
									<Figure />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { titleTagName, title, imageID, imageURL, imageAlt, textColor, imagePosition, imageSize, contentSize, contentHorizontalPosition, contentVerticalPosition, contentBackgroundColor, contentPadding, removeContentOutsidePadding, shadowColor, shadowHorizontalPosition, shadowVerticalPosition } = attributes;

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-break-the-grid': true,
				[ `smb-section-break-the-grid--${ imagePosition }` ]: true,
				[ className ]: !! className,
			}
		);

		const rowClasses = classnames(
			{
				'c-row': true,
				'c-row--margin': true,
				'c-row--lg-middle': ! contentVerticalPosition,
				'c-row--lg-top': contentVerticalPosition && contentVerticalPosition.startsWith( 't' ),
				'c-row--lg-bottom': contentVerticalPosition && contentVerticalPosition.startsWith( 'b' ),
			}
		);

		const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', 'c-row__col--lg-1-2' );
		const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', 'c-row__col--lg-1-2' );

		const figureClasses = classnames(
			{
				'smb-section-break-the-grid__figure': true,
				[ `smb-section-break-the-grid__figure--w-${ imageSize }` ]: !! imageSize,
			}
		);

		const contentClasses = classnames(
			{
				'smb-section-break-the-grid__content': true,
				[ `smb-section-break-the-grid__content--w-${ contentSize }` ]: !! contentSize,
				[ `smb-section-break-the-grid__content--p-${ contentPadding }` ]: !! contentPadding,
				'smb-section-break-the-grid__content--remove-outside-p': contentPadding && removeContentOutsidePadding,
				[ `smb-section-break-the-grid__content--horizontal-${ contentHorizontalPosition }` ]: !! contentHorizontalPosition,
				[ `smb-section-break-the-grid__content--vertical-${ contentVerticalPosition }` ]: !! contentVerticalPosition,
			}
		);

		const shadowClasses = classnames( 'smb-section-break-the-grid__shadow' );

		const sectionStyles = {
			color: textColor || undefined,
		};

		const shadowStyles = {};
		if ( shadowColor ) {
			shadowStyles.backgroundColor = shadowColor;
		}
		if ( shadowHorizontalPosition || shadowVerticalPosition ) {
			shadowStyles.transform = `translate(${ shadowHorizontalPosition || 0 }%, ${ shadowVerticalPosition || 0 }%)`;
		}

		const contentStyles = {
			backgroundColor: contentBackgroundColor && hexToRgba( contentBackgroundColor, 0.98 ),
		};

		return (
			<div className={ classes } style={ sectionStyles }>
				<div className="c-container">
					<div className={ rowClasses }>
						<div className={ textColumnClasses }>
							<div className={ contentClasses } style={ contentStyles }>
								{ ! RichText.isEmpty( title ) && 'none' !== titleTagName &&
									<RichText.Content
										tagName={ titleTagName }
										className="smb-section__title smb-section-break-the-grid__title"
										value={ title }
									/>
								}
								<div className="smb-section__body smb-section-break-the-grid__body">
									<InnerBlocks.Content />
								</div>
							</div>
						</div>
						<div className={ imageColumnClasses }>
							<div className={ figureClasses }>
								{ shadowColor &&
									<div className={ shadowClasses } style={ shadowStyles }></div>
								}
								{ imageURL &&
									<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
								}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
