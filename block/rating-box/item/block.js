'use strict';

import classnames from 'classnames';

import { blockConfig } from '../../../src/js/config/block';
import toNumber from '../../../src/js/helper/to-number';
import { schema } from './_schema';
import { deprecated } from './_deprecated';

const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls, PanelColorSettings } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

registerBlockType( 'snow-monkey-blocks/rating-box--item', {
	title: __( 'Item', 'snow-monkey-blocks' ),
	description: __( 'It is a child block of the rating box block.', 'snow-monkey-blocks' ),
	icon: {
		foreground: blockConfig.blockIconColor,
		src: 'editor-alignleft',
	},
	category: blockConfig.blockCategories.common,
	parent: [ 'snow-monkey-blocks/rating-box' ],
	attributes: schema,

	edit( { attributes, setAttributes, className } ) {
		const { title, rating, color } = attributes;

		const classes = classnames( 'smb-rating-box__item', className );

		const itemEvaluationRatingStyles = {
			width: `${ rating * 10 }%`,
			backgroundColor: color || undefined,
		};

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'Block Settings', 'snow-monkey-blocks' ) }>
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

				<div className={ classes }>
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
							<div className="smb-rating-box__item__evaluation__rating" style={ itemEvaluationRatingStyles } />
						</div>
					</div>
				</div>
			</Fragment>
		);
	},

	save( { attributes, className } ) {
		const { title, rating, color } = attributes;

		const classes = classnames( 'smb-rating-box__item', className );

		const itemEvaluationRatingStyles = {
			width: `${ rating * 10 }%`,
			backgroundColor: color || undefined,
		};

		return (
			<div className={ classes }>
				<div className="smb-rating-box__item__title" >
					<RichText.Content value={ title } />
				</div>

				<div className="smb-rating-box__item__evaluation">
					<div className="smb-rating-box__item__evaluation__bar">
						<div className="smb-rating-box__item__evaluation__numeric">
							{ rating }
						</div>
						<div className="smb-rating-box__item__evaluation__rating" style={ itemEvaluationRatingStyles } />
					</div>
				</div>
			</div>
		);
	},

	deprecated: deprecated,
} );
