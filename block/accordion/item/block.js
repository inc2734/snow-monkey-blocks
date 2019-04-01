'use strict';

import classnames from 'classnames';
import { schema } from './_schema.js';
import { deprecated } from './_deprecated.js';

const { registerBlockType } = wp.blocks;
const { InspectorControls, RichText, InnerBlocks } = wp.editor;
const { PanelBody, CheckboxControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/accordion--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'editor-justify',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/accordion' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { title, initialState } = attributes;

		const classes = classnames( 'smb-accordion__item', className );

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Item Settings', 'snow-monkey-blocks' ) }>
						<CheckboxControl
							label={ __( 'Display in open state', 'snow-monkey-blocks' ) }
							checked={ initialState }
							onChange={ ( value ) => setAttributes( { initialState: value } ) }
						/>
					</PanelBody>
				</InspectorControls>
				<div className={ classes }>
					<div className="smb-accordion__item__title">
						<div className="smb-accordion__item__title__label">
							<RichText
								value={ title }
								onChange={ ( value ) => setAttributes( { title: value } ) }
								placeholder={ __( 'Enter title here', 'snow-monkey-blocks' ) }
							/>
						</div>
						<div className="smb-accordion__item__title__icon">
							<i className="fas fa-angle-down"></i>
						</div>
					</div>
					<div className="smb-accordion__item__body">
						<InnerBlocks />
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, initialState } = attributes;
		const classes = classnames( 'smb-accordion__item', className );

		return (
			<div className={ classes }>
				<input type="checkbox" className="smb-accordion__item__control" checked={ initialState } />
				<div className="smb-accordion__item__title">
					<span className="smb-accordion__item__title__label"><RichText.Content value={ title } /></span>
					<div className="smb-accordion__item__title__icon">
						<i className="fas fa-angle-down"></i>
					</div>
				</div>
				<div className="smb-accordion__item__body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
