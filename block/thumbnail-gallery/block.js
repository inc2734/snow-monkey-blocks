'use strict';

import classnames from 'classnames';
import toNumber from '../../src/js/helper/to-number';
import generateUpdatedAttribute from '../../src/js/helper/generate-updated-attribute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { get, times } = lodash;
const { registerBlockType } = wp.blocks;
const { InspectorControls, MediaPlaceholder, MediaUpload } = wp.editor;
const { PanelBody, RangeControl, Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/thumbnail-gallery', {
	title: __( 'Thumbnail gallery', 'snow-monkey-blocks' ),
	icon: 'format-gallery',
	category: 'smb',
	attributes: schema,
	supports: {
		align: [ 'wide', 'full' ],
	},

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { items, content } = attributes;

		const classes = classnames( 'smb-thumbnail-gallery', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Thumbnail Gallery Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Number of items', 'snow-monkey-blocks' ) }
							value={ items }
							onChange={ ( value ) => setAttributes( { items: toNumber( value, 1, 20 ) } ) }
							min="1"
							max="20"
						/>
					</PanelBody>
				</InspectorControls>

				<div className={ classes }>
					<div className="smb-thumbnail-gallery__canvas">
						{ times( items, ( index ) => {
							if ( ! isSelected && 0 < index ) {
								return false;
							}

							const imageID = get( content, [ index, 'imageID' ], 0 );
							const imageURL = get( content, [ index, 'imageURL' ], '' );

							const onSelectImage = ( media ) => {
								const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
								let newContent = content;
								newContent = generateUpdatedAttribute( newContent, index, 'imageURL', newImageURL );
								newContent = generateUpdatedAttribute( newContent, index, 'imageID', media.id );
								setAttributes( { content: newContent } );
							};

							const ItemFigureImg = () => {
								return ! imageURL ? (
									<MediaPlaceholder
										icon="format-image"
										labels={ { title: __( 'Image' ) } }
										onSelect={ onSelectImage }
										accept="image/*"
										allowedTypes={ [ 'image' ] }
									/>
								) : (
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
													let newContent = content;
													newContent = generateUpdatedAttribute( content, index, 'imageURL', '' );
													newContent = generateUpdatedAttribute( content, index, 'imageID', 0 );
													setAttributes( { content: newContent } );
												} }
											>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
										}
									</Fragment>
								);
							};

							return (
								<Fragment>
									{ ( !! imageID || isSelected ) &&
										<div className="smb-thumbnail-gallery__item">
											<div className="smb-thumbnail-gallery__item__figure">
												<ItemFigureImg />
											</div>
										</div>
									}
								</Fragment>
							);
						} ) }
					</div>

					{ isSelected &&
						<div className="smb-add-item-button-wrapper">
							{ items > 0 &&
								<button className="smb-remove-item-button" onClick={ () => setAttributes( { items: items - 1 } ) }>
									<FontAwesomeIcon icon="minus-circle" />
								</button>
							}

							<button className="smb-add-item-button" onClick={ () => setAttributes( { items: items + 1 } ) }>
								<FontAwesomeIcon icon="plus-circle" />
							</button>
						</div>
					}
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { items, content } = attributes;

		const classes = classnames( 'smb-thumbnail-gallery', className );

		return (
			<div className={ classes }>
				<div className="smb-thumbnail-gallery__canvas">
					{ times( items, ( index ) => {
						const imageID = get( content, [ index, 'imageID' ], 0 );
						const imageURL = get( content, [ index, 'imageURL' ], '' );

						return (
							<Fragment>
								{ !! imageID &&
									<div className="smb-thumbnail-gallery__item">
										<div className="smb-thumbnail-gallery__item__figure">
											<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
										</div>
									</div>
								}
							</Fragment>
						);
					} ) }
				</div>

				<div className="smb-thumbnail-gallery__nav">
					{ times( items, ( index ) => {
						const imageID = get( content, [ index, 'imageID' ], 0 );
						const imageURL = get( content, [ index, 'imageURL' ], '' );

						return (
							<Fragment>
								{ !! imageID &&
									<div className="smb-thumbnail-gallery__nav__item">
										<div className="smb-thumbnail-gallery__nav__item__figure">
											<img src={ imageURL } alt="" className={ `wp-image-${ imageID }` } data-image-id={ imageID } />
										</div>
									</div>
								}
							</Fragment>
						);
					} ) }
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
