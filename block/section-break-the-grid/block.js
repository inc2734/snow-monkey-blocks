'use strict';

import classnames from 'classnames';
import getColumnSize from '../../src/js/helper/get-column-size';
import toNumber from '../../src/js/helper/to-number';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, PanelColorSettings, MediaPlaceholder, MediaUpload, ColorPalette } = wp.editor;
const { PanelBody, SelectControl, BaseControl, Button, RangeControl } = wp.components;
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
		const { scope, titleTagName, title, imageID, imageURL, imageAlt, textColor, imagePosition, imageColumnSize, imageSizeAdjustment, contentSizeAdjustment, contentHorizontalPositionAdjustment, shadowColor, shadowWidth, shadowHeight } = attributes;

		if ( ! scope ) {
			setAttributes( { scope: `${ Date.now() }-${ Math.round( Math.random() * 10000 ) }` } );
		}

		const scopedClassName = `scope-${ scope }`;
		const titleTagNames = [ 'h2', 'h3', 'none' ];

		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-break-the-grid': true,
				[ `smb-section-break-the-grid--${ imagePosition }` ]: true,
				[ `smb-section-break-the-grid--${ scopedClassName }` ]: true,
				[ className ]: !! className,
			}
		);

		const rowClasses = classnames(
			{
				'c-row': true,
				'c-row--lg-middle': true,
			}
		);

		const { textColumnWidth, imageColumnWidth } = getColumnSize( imageColumnSize );
		const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ textColumnWidth }` ] );
		const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ imageColumnWidth }` ] );

		const contentClasses = classnames(
			{
				'smb-section-break-the-grid__content': true,
				[ `smb-section-break-the-grid__content--lg-w-${ contentSizeAdjustment }` ]: !! contentSizeAdjustment,
				[ `smb-section-break-the-grid__content--lg-horizontal-${ contentHorizontalPositionAdjustment }` ]: !! contentHorizontalPositionAdjustment,
			}
		);

		const shadowClasses = classnames(
			{
				'smb-section-break-the-grid__shadow': true,
				[ `smb-section-break-the-grid__shadow--lg-w-${ shadowWidth }` ]: !! shadowWidth,
				[ `smb-section-break-the-grid__shadow--h-${ shadowHeight }` ]: !! shadowHeight,
			}
		);

		const sectionStyles = {
			color: textColor || undefined,
		};

		const shadowStyles = {
			backgroundColor: shadowColor || undefined,
		};

		const figureClasses = classnames(
			{
				'smb-section-break-the-grid__figure': true,
				[ `smb-section-break-the-grid__figure--lg-w-${ imageSizeAdjustment }` ]: !! imageSizeAdjustment,
			}
		);

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
							label={ __( 'Image Column Size', 'snow-monkey-blocks' ) }
							value={ imageColumnSize }
							options={ [
								{
									value: 75,
									label: __( '75%', 'snow-monkey-blocks' ),
								},
								{
									value: 66,
									label: __( '66%', 'snow-monkey-blocks' ),
								},
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imageColumnSize: toNumber( value ) } ) }
						/>

						<SelectControl
							label={ __( 'image Size Adjustment', 'snow-monkey-blocks' ) }
							value={ imageSizeAdjustment }
							options={ [
								{
									value: undefined,
									label: __( '0', 'snow-monkey-blocks' ),
								},
								{
									value: '1-4',
									label: __( '25%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-3',
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-2',
									label: __( '50%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imageSizeAdjustment: value } ) }
						/>
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

					<PanelBody title={ __( 'Contents Settings', 'snow-monkey-blocks' ) } initialOpen={ false }>
						<SelectControl
							label={ __( 'Content Size Adjustment', 'snow-monkey-blocks' ) }
							value={ contentSizeAdjustment }
							options={ [
								{
									value: undefined,
									label: __( '0', 'snow-monkey-blocks' ),
								},
								{
									value: '1-3',
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-2',
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: '3-4',
									label: __( '75%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentSizeAdjustment: value } ) }
						/>

						<SelectControl
							label={ __( 'Content Position (Horizontal) Adjustment', 'snow-monkey-blocks' ) }
							value={ contentHorizontalPositionAdjustment }
							options={ [
								{
									value: undefined,
									label: __( '0', 'snow-monkey-blocks' ),
								},
								{
									value: '1-6',
									label: __( '17%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-5',
									label: __( '20%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-4',
									label: __( '25%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-3',
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: '1-2',
									label: __( '50%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { contentHorizontalPositionAdjustment: value } ) }
						/>
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
							<SelectControl
								label={ __( 'Width', 'snow-monkey-blocks' ) }
								value={ shadowWidth }
								options={ [
									{
										value: '1-4',
										label: __( '25%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-3',
										label: __( '33%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-2',
										label: __( '50%', 'snow-monkey-blocks' ),
									},
									{
										value: '2-3',
										label: __( '66%', 'snow-monkey-blocks' ),
									},
									{
										value: '3-4',
										label: __( '75%', 'snow-monkey-blocks' ),
									},
									{
										value: 'full',
										label: __( '100%', 'snow-monkey-blocks' ),
									},
								] }
								onChange={ ( value ) => setAttributes( { shadowWidth: value } ) }
							/>
						}

						{ shadowColor &&
							<SelectControl
								label={ __( 'Height', 'snow-monkey-blocks' ) }
								value={ shadowHeight }
								options={ [
									{
										value: '1-4',
										label: __( '25%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-3',
										label: __( '33%', 'snow-monkey-blocks' ),
									},
									{
										value: '1-2',
										label: __( '50%', 'snow-monkey-blocks' ),
									},
									{
										value: '2-3',
										label: __( '66%', 'snow-monkey-blocks' ),
									},
									{
										value: '3-4',
										label: __( '75%', 'snow-monkey-blocks' ),
									},
									{
										value: 'full',
										label: __( '100%', 'snow-monkey-blocks' ),
									},
								] }
								onChange={ ( value ) => setAttributes( { shadowHeight: value } ) }
							/>
						}
					</PanelBody>
				</InspectorControls>

				<div className={ classes } style={ sectionStyles }>
					<div className="c-container">
						{ shadowColor &&
							<div className={ shadowClasses } style={ shadowStyles }></div>
						}
						<div className={ rowClasses }>
							<div className={ textColumnClasses }>
								<div className={ contentClasses }>
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
		const { scope, titleTagName, title, imageID, imageURL, imageAlt, textColor, imagePosition, imageColumnSize, imageSizeAdjustment, contentSizeAdjustment, contentHorizontalPositionAdjustment, shadowColor, shadowWidth, shadowHeight } = attributes;

		const scopedClassName = `scope-${ scope }`;
		const classes = classnames(
			{
				'smb-section': true,
				'smb-section-break-the-grid': true,
				[ `smb-section-break-the-grid--${ imagePosition }` ]: true,
				[ `smb-section-break-the-grid--${ scopedClassName }` ]: true,
				[ className ]: !! className,
			}
		);

		const rowClasses = classnames(
			{
				'c-row': true,
				'c-row--lg-middle': true,
			}
		);

		const { textColumnWidth, imageColumnWidth } = getColumnSize( imageColumnSize );
		const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ textColumnWidth }` ] );
		const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ imageColumnWidth }` ] );

		const contentClasses = classnames(
			{
				'smb-section-break-the-grid__content': true,
				[ `smb-section-break-the-grid__content--lg-w-${ contentSizeAdjustment }` ]: !! contentSizeAdjustment,
				[ `smb-section-break-the-grid__content--lg-horizontal-${ contentHorizontalPositionAdjustment }` ]: !! contentHorizontalPositionAdjustment,
			}
		);

		const shadowClasses = classnames(
			{
				'smb-section-break-the-grid__shadow': true,
				[ `smb-section-break-the-grid__shadow--lg-w-${ shadowWidth }` ]: !! shadowWidth,
				[ `smb-section-break-the-grid__shadow--h-${ shadowHeight }` ]: !! shadowHeight,
			}
		);

		const sectionStyles = {
			color: textColor || undefined,
		};

		const shadowStyles = {
			backgroundColor: shadowColor || undefined,
		};

		const figureClasses = classnames(
			{
				'smb-section-break-the-grid__figure': true,
				[ `smb-section-break-the-grid__figure--lg-w-${ imageSizeAdjustment }` ]: !! imageSizeAdjustment,
			}
		);

		return (
			<div className={ classes } style={ sectionStyles }>
				<div className="c-container">
					{ shadowColor &&
						<div className={ shadowClasses } style={ shadowStyles }></div>
					}
					<div className={ rowClasses }>
						<div className={ textColumnClasses }>
							<div className={ contentClasses }>
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
