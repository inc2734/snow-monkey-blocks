'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks, InspectorControls, MediaPlaceholder, MediaUpload } = wp.editor;
const { PanelBody, SelectControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

const _getColumnsSize = ( imageColumnSize ) => {
	let textColumnWidth = '1-3';
	let imageColumnWidth = '2-3';
	if ( 66 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-3';
		imageColumnWidth = '2-3';
	} else if ( 50 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '1-2';
		imageColumnWidth = '1-2';
	} else if ( 33 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '2-3';
		imageColumnWidth = '1-3';
	} else if ( 25 === parseInt( imageColumnSize ) ) {
		textColumnWidth = '3-4';
		imageColumnWidth = '1-4';
	}

	return {
		textColumnWidth: textColumnWidth,
		imageColumnWidth: imageColumnWidth,
	};
};

registerBlockType( 'snow-monkey-blocks/media-text', {
	title: __( 'Media text', 'snow-monkey-blocks' ),
	description: __( 'Set media and words side-by-side for a richer layout.', 'snow-monkey-blocks' ),
	icon: {
		foreground: '#bd3c4f',
		src: 'align-left',
	},
	category: 'smb',
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { title, imageID, imageURL, imagePosition, imageColumnSize } = attributes;

		const { textColumnWidth, imageColumnWidth } = _getColumnsSize( imageColumnSize );

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
									<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => {
								setAttributes( { imageURL: '', imageID: 0 } );
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
					<PanelBody title={ __( 'Media Text Settings', 'snow-monkey-blocks' ) }>
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
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className={ rowClasses }>
						<div className={ textColumnClasses }>
							{ ( ! RichText.isEmpty( title ) || isSelected ) &&
								<RichText
									className="smb-media-text__title"
									tagName="h2"
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
		const { title, imageID, imageURL, imagePosition, imageColumnSize } = attributes;

		const { textColumnWidth, imageColumnWidth } = _getColumnsSize( imageColumnSize );

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
						{ ! RichText.isEmpty( title ) &&
							<h2 className="smb-media-text__title">
								<RichText.Content value={ title } />
							</h2>
						}
						<div className="smb-media-text__body">
							<InnerBlocks.Content />
						</div>
					</div>
					<div className={ imageColumnClasses }>
						<div className="smb-media-text__figure">
							{ imageURL &&
								<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } />
							}
						</div>
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
