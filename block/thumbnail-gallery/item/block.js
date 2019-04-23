'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';

const { registerBlockType } = wp.blocks;
const { MediaPlaceholder, MediaUpload } = wp.editor;
const { Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/thumbnail-gallery--item', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the thumbnail gallery block.', 'snow-monkey-blocks' ),
	icon: 'format-gallery',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/thumbnail-gallery' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { imageID, imageURL, imageAlt } = attributes;

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
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
									<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
								</Button>
							);
						} }
					/>
					{ isSelected &&
						<button
							className="smb-remove-button"
							onClick={ () => setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } ) }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		const classes = classnames( 'smb-thumbnail-gallery__item', className );

		return (
			<Fragment>
				{ ( !! imageID || isSelected ) &&
					<div className={ classes }>
						<div className="smb-thumbnail-gallery__item__figure">
							<ItemFigureImg />
						</div>
					</div>
				}
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { imageID, imageURL, imageAlt } = attributes;

		const classes = classnames( 'smb-thumbnail-gallery__item', className );

		return (
			<Fragment>
				{ !! imageID &&
					<div className={ classes }>
						<div className="smb-thumbnail-gallery__item__figure">
							<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
						</div>
					</div>
				}
			</Fragment>
		);
	},
} );
