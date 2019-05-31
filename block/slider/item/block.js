'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../src/js/config/block.js';
import { schema } from './_schema.js';

const { registerBlockType } = wp.blocks;
const { RichText, MediaPlaceholder, MediaUpload } = wp.editor;
const { Button } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/slider--item', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the slider block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'screenoptions',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/slider' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { imageID, imageURL, imageAlt, caption } = attributes;

		const onSelectImage = ( media ) => {
			const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
			setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
		};

		const SliderItemFigureImg = () => {
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
							onClick={ () => {
								setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } );
							} }
						>{ __( 'Remove', 'snow-monkey-blocks' ) }</button>
					}
				</Fragment>
			);
		};

		const classes = classnames( 'smb-slider__item', className );

		return (
			<div className={ classes }>
				<div className="smb-slider__item__figure">
					<SliderItemFigureImg />
				</div>

				{ ( ! RichText.isEmpty( caption ) || isSelected ) &&
					<RichText
						className="smb-slider__item__caption"
						placeholder={ __( 'Write caption...', 'snow-monkey-blocks' ) }
						value={ caption }
						onChange={ ( value ) => setAttributes( { caption: value } ) }
					/>
				}
			</div>
		);
	},

	save( { attributes, className } ) {
		const { imageID, imageURL, imageAlt, caption } = attributes;

		const classes = classnames( 'smb-slider__item', className );

		return (
			<div className={ classes }>
				<div className="smb-slider__item__figure">
					<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
				</div>

				{ ! RichText.isEmpty( caption ) &&
					<div className="smb-slider__item__caption">
						<RichText.Content value={ caption } />
					</div>
				}
			</div>
		);
	},
} );
