'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../src/js/config/block';
import { schema } from './_schema';

const { first } = lodash;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/exclusive-accordion--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-justify',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/exclusive-accordion' ],
	attributes: schema,

	edit( { attributes, setAttributes, className, clientId } ) {
		const { title, rootId } = attributes;
		if ( '' === rootId ) {
			const { getBlockRootClientId, getBlocksByClientId } = wp.data.select( 'core/block-editor' );
			const rootBlockId = first( getBlocksByClientId( getBlockRootClientId( clientId ) ) ).clientId;
			setAttributes( { rootId: rootBlockId } );
		}

		const classes = classnames( 'smb-exclusive-accordion__item', className );

		return (
			<div className={ classes }>
				<div className="smb-exclusive-accordion__item__title">
					<div className="smb-exclusive-accordion__item__title__label">
						<RichText
							value={ title }
							onChange={ ( value ) => setAttributes( { title: value } ) }
							placeholder={ __( 'Enter title here', 'snow-monkey-blocks' ) }
						/>
					</div>
					<div className="smb-exclusive-accordion__item__title__icon">
						<i className="fas fa-angle-down"></i>
					</div>
				</div>
				<div className="smb-exclusive-accordion__item__body">
					<InnerBlocks />
				</div>
			</div>
		);
	},

	save( { attributes, className } ) {
		const { title, rootId } = attributes;
		const classes = classnames( 'smb-exclusive-accordion__item', className );

		return (
			<div className={ classes }>
				<input type="radio" name={ rootId } className="smb-exclusive-accordion__item__control" />
				<div className="smb-exclusive-accordion__item__title">
					<span className="smb-exclusive-accordion__item__title__label"><RichText.Content value={ title } /></span>
					<div className="smb-exclusive-accordion__item__title__icon">
						<i className="fas fa-angle-down"></i>
					</div>
				</div>
				<div className="smb-exclusive-accordion__item__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

} );
