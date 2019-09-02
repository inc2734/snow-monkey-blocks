'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../src/js/config/block';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

import { Figure } from '../../../src/js/component/figure';

const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/thumbnail-gallery--item', {
	title: __( 'Items', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the thumbnail gallery block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'format-gallery',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/thumbnail-gallery' ],
	attributes: schema,

	edit( { attributes, setAttributes, isSelected, className } ) {
		const { imageID, imageURL, imageAlt, caption } = attributes;

		const classes = classnames( 'smb-thumbnail-gallery__item', className );

		return (
			<div className={ classes }>
				<div className="smb-thumbnail-gallery__item__figure">
					<Figure
						url={ imageURL }
						id={ imageID }
						alt={ imageAlt }
						selectHandler={ ( media ) => {
							const newImageURL = !! media.sizes && !! media.sizes.large ? media.sizes.large.url : media.url;
							setAttributes( { imageURL: newImageURL, imageID: media.id, imageAlt: media.alt } );
						} }
						removeHandler={ () => setAttributes( { imageURL: '', imageAlt: '', imageID: 0 } ) }
						isSelected={ isSelected }
					/>
				</div>

				{ ( ! RichText.isEmpty( caption ) || isSelected ) &&
					<RichText
						className="smb-thumbnail-gallery__item__caption"
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

		const classes = classnames( 'smb-thumbnail-gallery__item', className );

		return (
			<div className={ classes }>
				<div className="smb-thumbnail-gallery__item__figure">
					<img src={ imageURL } alt={ imageAlt } className={ `wp-image-${ imageID }` } />
				</div>

				{ ! RichText.isEmpty( caption ) &&
					<div className="smb-thumbnail-gallery__item__caption">
						<RichText.Content value={ caption } />
					</div>
				}
			</div>
		);
	},

	deprecated: deprecated,
} );
