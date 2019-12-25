'use strict';

import classnames from 'classnames';
import FontAwesome from '../../../src/js/component/font-awesome';
import { toNumber } from '../../../src/js/helper/helper';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

import {
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';

import {
	Fragment,
} from '@wordpress/element';

import {
	__,
	sprintf,
} from '@wordpress/i18n';

export default function( { attributes, setAttributes, className } ) {
	const { evaluationValue, iconColor, isDisplayNumeric, numericAlign, numericColor } = attributes;

	const EditEvaluationIcon = () => {
		const icons = [];
		const evaluationNumber = toNumber( evaluationValue, 0, 5 );
		const fillIconCount = Math.floor( evaluationNumber );
		const emptyIconCount = 5 - Math.ceil( evaluationNumber );
		const halfIconCount = ( fillIconCount + emptyIconCount ) === 5 ? 0 : 1;

		for ( let i = 0; i < fillIconCount; i++ ) {
			icons.push( <FontAwesome icon="star" /> );
		}

		if ( halfIconCount !== 0 ) {
			icons.push( <FontAwesome icon="star-half-alt" /> );
		}

		for ( let j = 0; j < emptyIconCount; j++ ) {
			icons.push( <FontAwesome icon={ [ 'far', 'star' ] } /> );
		}

		return <span>{ icons }</span>;
	};

	const classes = classnames(
		'smb-evaluation-star',
		className
	);

	const bodyClasses = classnames(
		'smb-evaluation-star__numeric',
		[ `smb-evaluation-star__numeric--${ numericAlign }` ]
	);

	const evaluationStarBodyStyles = {
		color: numericColor || undefined,
		display: isDisplayNumeric ? 'inline' : 'none',
	};

	const evaluationStarIconStyles = {
		color: iconColor || undefined,
	};

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={ __( 'Evaluation Settings', 'snow-monkey-blocks' ) }>
					<RangeControl
						label={ __( 'Evaluation', 'snow-monkey-blocks' ) }
						help={ __( 'Five-grade evaluation', 'snow-monkey-blocks' ) }
						value={ evaluationValue }
						onChange={ ( value ) => setAttributes( { evaluationValue: toNumber( value, 0, 5 ) } ) }
						min={ 0 }
						max={ 5 }
						step={ 0.1 }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Numeric Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
				>
					<ToggleControl
						label={ __( 'Show numeric', 'snow-monkey-blocks' ) }
						checked={ isDisplayNumeric }
						onChange={ ( value ) => setAttributes( { isDisplayNumeric: value } ) }
					/>

					<SelectControl
						label={ __( 'Numeric position', 'snow-monkey-blocks' ) }
						value={ numericAlign }
						onChange={ ( value ) => setAttributes( { numericAlign: value } ) }
						options={ [
							{
								value: 'left',
								label: __( 'Position left', 'snow-monkey-blocks' ),
							},
							{
								value: 'right',
								label: __( 'Position right', 'snow-monkey-blocks' ),
							},
						] }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					colorSettings={ [
						{
							value: iconColor,
							onChange: ( value ) => setAttributes( { iconColor: value } ),
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
						{
							value: numericColor,
							onChange: ( value ) => setAttributes( { numericColor: value } ),
							label: __( 'Numeric color', 'snow-monkey-blocks' ),
						},
					] }
				>
				</PanelColorSettings>
			</InspectorControls>

			<div className={ classes }>
				<div className="smb-evaluation-star__body">
					<span className={ bodyClasses } style={ evaluationStarBodyStyles }>
						{ sprintf( '%.1f', Number( evaluationValue ) ) }
					</span>
					<div className="smb-evaluation-star__icon" style={ evaluationStarIconStyles }>
						<EditEvaluationIcon />
					</div>
				</div>
			</div>
		</Fragment>
	);
}
