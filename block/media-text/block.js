'use strict';

import classnames from 'classnames';
import getColumnSize from '../../src/js/helper/get-column-size';

import { blockConfig } from '../../src/js/config/block.js';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { times } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, MediaPlaceholder, MediaUpload } = wp.editor;
const { PanelBody, SelectControl, Button, BaseControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/media-text', {
	title: __( 'Media text', 'snow-monkey-blocks' ),
	description: __( 'Set media and words side-by-side for a richer layout.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'align-left',
	},
	category: blockConfig.blockCategories.common,
	attributes: schema,
	snowMonkeyBlocks: {
		screenshot: `${ smb.pluginUrl }/dist/img/screenshot/block/media-text.png`,
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { titleTagName, title, imageID, imageURL, imageAlt, imagePosition, imageColumnSize } = attributes;

		const titleTagNames = [ 'h1', 'h2', 'h3', 'none' ];
		const { textColumnWidth, imageColumnWidth } = getColumnSize( imageColumnSize );

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id } );
		};

		const MediaTextFigureImg = () => {
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

		const classes = classnames( 'smb-media-text', className );

		const rowClasses = classnames(
			{
				'c-row': true,
				'c-row--margin': true,
				'c-row--middle': true,
				'c-row--reverse': 'left' === imagePosition,
			}
		);

		const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ textColumnWidth }` ] );

		const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ imageColumnWidth }` ] );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
						<SelectControl
							label={ __( 'Image Position', 'snow-monkey-blocks' ) }
							value={ imagePosition }
							options={ [
								{
									value: 'right',
									label: __( 'Right side', 'snow-monkey-blocks' ),
								},
								{
									value: 'left',
									label: __( 'Left side', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imagePosition: value } ) }
						/>

						<SelectControl
							label={ __( 'Image Column Size', 'snow-monkey-blocks' ) }
							value={ imageColumnSize }
							options={ [
								{
									value: 66,
									label: __( '66%', 'snow-monkey-blocks' ),
								},
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) => setAttributes( { imageColumnSize: value } ) }
						/>

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
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className={ rowClasses }>
						<div className={ textColumnClasses }>
							{ ( ! RichText.isEmpty( title ) || isSelected ) && 'none' !== titleTagName &&
								<RichText
									className="smb-media-text__title"
									tagName={ titleTagName }
									value={ title }
									onChange={ ( value ) => setAttributes( { title: value } ) }
									formattingControls={ [] }
									placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
								/>
							}
							<div className="smb-media-text__body">
								<InnerBlocks />
							</div>
						</div>
						<div className={ imageColumnClasses }>
							<div className="smb-media-text__figure">
								<MediaTextFigureImg />
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { titleTagName, title, imageID, imageURL, imageAlt, imagePosition, imageColumnSize } = attributes;

		const { textColumnWidth, imageColumnWidth } = getColumnSize( imageColumnSize );

		const classes = classnames( 'smb-media-text', className );

		const rowClasses = classnames(
			{
				'c-row': true,
				'c-row--margin': true,
				'c-row--middle': true,
				'c-row--reverse': 'left' === imagePosition,
			}
		);

		const textColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ textColumnWidth }` ] );

		const imageColumnClasses = classnames( 'c-row__col', 'c-row__col--1-1', [ `c-row__col--lg-${ imageColumnWidth }` ] );

		return (
			<div className={ classes }>
				<div className={ rowClasses }>
					<div className={ textColumnClasses }>
						{ ! RichText.isEmpty( title ) && 'none' !== titleTagName &&
							<RichText.Content
								className="smb-media-text__title"
								tagName={ titleTagName }
								value={ title }
							/>
						}
						<div className="smb-media-text__body">
							<InnerBlocks.Content />
						</div>
					</div>
					<div className={ imageColumnClasses }>
						<div className="smb-media-text__figure">
							{ imageURL &&
								<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
							}
						</div>
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
