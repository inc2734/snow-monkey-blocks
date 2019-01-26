'use strict';

import classnames from 'classnames';
import toNumber from '../../../src/js/helper/to-number';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	icon: 'editor-alignleft',
	category: 'smb',
	parent: [ 'snow-monkey-blocks/rating-box' ],
	attributes: {
		title: {
			source: 'html',
			selector: '.smb-rating-box__item__title',
		},
		rating: {
			type: 'number',
			default: 0,
		},
		color: {
			type: 'string',
		},
	},

	edit( { attributes, setAttributes, className } ) {
		const { title, rating, color } = attributes;

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Item Settings', 'snow-monkey-blocks' ) }>
						<RangeControl
							label={ __( 'Rating', 'snow-monkey-blocks' ) }
							value={ rating }
							onChange={ ( value ) => setAttributes( { rating: toNumber( value, 1, 10 ) } ) }
							min="1"
							max="10"
						/>
					</PanelBody>

					<PanelColorSettings
						title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
						initialOpen={ false }
						colorSettings={ [
							{
								value: color,
								onChange: ( value ) => setAttributes( { color: value } ),
								label: __( 'Bar Color', 'snow-monkey-blocks' ),
							},
						] }
					>
					</PanelColorSettings>
				</InspectorControls>

				<div className={ classnames( 'smb-rating-box__item', className ) }>
					<RichText
						className="smb-rating-box__item__title"
						placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
						value={ title }
						formattingControls={ [] }
						multiline={ false }
						onChange={ ( value ) => setAttributes( { title: value } ) }
					/>

					<div className="smb-rating-box__item__evaluation">
						<div className="smb-rating-box__item__evaluation__bar">
							<div className="smb-rating-box__item__evaluation__numeric">
								{ rating }
							</div>
							<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes } ) {
		const { title, rating, color } = attributes;

		return (
			<div className="smb-rating-box__item">
				<div className="smb-rating-box__item__title" >
					<RichText.Content value={ title } />
				</div>

				<div className="smb-rating-box__item__evaluation">
					<div className="smb-rating-box__item__evaluation__bar">
						<div className="smb-rating-box__item__evaluation__numeric">
							{ rating }
						</div>
						<div className="smb-rating-box__item__evaluation__rating" style={ { width: `${ rating * 10 }%`, backgroundColor: color } }></div>
					</div>
				</div>
			</div>
		);
	},
} );
