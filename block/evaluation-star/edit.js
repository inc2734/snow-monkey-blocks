import classnames from 'classnames';

import {
	InspectorControls,
	PanelColorSettings,
	__experimentalBlock as Block,
} from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';

import {
	PanelBody,
	RangeControl,
	ToggleControl,
	SelectControl,
} from '@wordpress/components';

import FontAwesome from '../../src/js/component/font-awesome';
import { toNumber } from '../../src/js/helper/helper';

export default function( { attributes, setAttributes, className } ) {
	const {
		evaluationValue,
		iconColor,
		isDisplayNumeric,
		numericAlign,
		numericColor,
	} = attributes;

	const generateIcons = () => {
		const icons = [];
		const evaluationNumber = toNumber( evaluationValue, 0, 5 );
		const fillIconCount = Math.floor( evaluationNumber );
		const emptyIconCount = 5 - Math.ceil( evaluationNumber );
		const halfIconCount = fillIconCount + emptyIconCount === 5 ? 0 : 1;

		for ( let i = 0; i < fillIconCount; i++ ) {
			icons.push( <FontAwesome icon="star" /> );
		}

		if ( halfIconCount !== 0 ) {
			icons.push( <FontAwesome icon="star-half-alt" /> );
		}

		for ( let j = 0; j < emptyIconCount; j++ ) {
			icons.push( <FontAwesome icon={ [ 'far', 'star' ] } /> );
		}

		return icons;
	};

	const BlockWrapper = Block.div;
	const classes = classnames( 'smb-evaluation-star', className );

	const bodyClasses = classnames( 'smb-evaluation-star__numeric', [
		`smb-evaluation-star__numeric--${ numericAlign }`,
	] );

	const evaluationStarBodyStyles = {
		color: numericColor || undefined,
		display: isDisplayNumeric ? 'inline' : 'none',
	};

	const evaluationStarIconStyles = {
		color: iconColor || undefined,
	};

	const onChangeEvaluationValue = ( value ) =>
		setAttributes( {
			evaluationValue: toNumber( value, 0, 5 ),
		} );

	const onChangeIsDisplayNumeric = ( value ) =>
		setAttributes( {
			isDisplayNumeric: value,
		} );

	const onChangeNumericAlign = ( value ) =>
		setAttributes( {
			numericAlign: value,
		} );

	const onChangeIconColor = ( value ) =>
		setAttributes( {
			iconColor: value,
		} );

	const onChangeNumericColor = ( value ) =>
		setAttributes( {
			numericColor: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Evaluation Settings', 'snow-monkey-blocks' ) }
				>
					<RangeControl
						label={ __( 'Evaluation', 'snow-monkey-blocks' ) }
						help={ __(
							'Five-grade evaluation',
							'snow-monkey-blocks'
						) }
						value={ evaluationValue }
						onChange={ onChangeEvaluationValue }
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
						onChange={ onChangeIsDisplayNumeric }
					/>

					<SelectControl
						label={ __( 'Numeric position', 'snow-monkey-blocks' ) }
						value={ numericAlign }
						onChange={ onChangeNumericAlign }
						options={ [
							{
								value: 'left',
								label: __(
									'Position left',
									'snow-monkey-blocks'
								),
							},
							{
								value: 'right',
								label: __(
									'Position right',
									'snow-monkey-blocks'
								),
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
							onChange: onChangeIconColor,
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
						{
							value: numericColor,
							onChange: onChangeNumericColor,
							label: __( 'Numeric color', 'snow-monkey-blocks' ),
						},
					] }
				></PanelColorSettings>
			</InspectorControls>

			<BlockWrapper className={ classes }>
				<div className="smb-evaluation-star__body">
					<span
						className={ bodyClasses }
						style={ evaluationStarBodyStyles }
					>
						{ sprintf( '%.1f', Number( evaluationValue ) ) }
					</span>
					<div
						className="smb-evaluation-star__icon"
						style={ evaluationStarIconStyles }
					>
						<span>{ generateIcons() }</span>
					</div>
				</div>
			</BlockWrapper>
		</>
	);
}
