'use strict';

import classnames from 'classnames';

import { PanelBody, RangeControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import {
	RichText,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import { toNumber } from '../../../../src/js/helper/helper';

export default function( { attributes, setAttributes, className } ) {
	const { title, rating, color } = attributes;

	const classes = classnames( 'smb-rating-box__item', className );

	const itemEvaluationRatingStyles = {
		width: `${ rating * 10 }%`,
		backgroundColor: color || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'snow-monkey-blocks' ) }
				>
					<RangeControl
						label={ __( 'Rating', 'snow-monkey-blocks' ) }
						value={ rating }
						onChange={ ( value ) =>
							setAttributes( {
								rating: toNumber( value, 1, 10 ),
							} )
						}
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
							onChange: ( value ) =>
								setAttributes( { color: value } ),
							label: __( 'Bar Color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<RichText
					className="smb-rating-box__item__title"
					placeholder={ __( 'Write title...', 'snow-monkey-blocks' ) }
					value={ title }
					allowedFormats={ [] }
					multiline={ false }
					onChange={ ( value ) => setAttributes( { title: value } ) }
				/>

				<div className="smb-rating-box__item__evaluation">
					<div className="smb-rating-box__item__evaluation__bar">
						<div className="smb-rating-box__item__evaluation__numeric">
							{ rating }
						</div>
						<div
							className="smb-rating-box__item__evaluation__rating"
							style={ itemEvaluationRatingStyles }
						/>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
