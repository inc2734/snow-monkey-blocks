import classnames from 'classnames';

import {
	InspectorControls,
	PanelColorSettings,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';

import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';

import FontAwesome from '@smb/component/font-awesome';
import { toNumber } from '@smb/helper';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
} ) {
	const {
		evaluationValue,
		iconColor,
		isDisplayNumeric,
		numericAlign,
		numericColor,
		title,
		titleAlign,
	} = attributes;

	const generateIcons = () => {
		const icons = [];
		const evaluationNumber = toNumber( evaluationValue, 0, 5 );
		const fillIconCount = Math.floor( evaluationNumber );
		const emptyIconCount = 5 - Math.ceil( evaluationNumber );
		const halfIconCount = fillIconCount + emptyIconCount === 5 ? 0 : 1;

		for ( let i = 0; i < fillIconCount; i++ ) {
			icons.push( <FontAwesome icon="star" key={ `fill${ i }` } /> );
		}

		if ( halfIconCount !== 0 ) {
			icons.push( <FontAwesome icon="star-half-alt" key="half1" /> );
		}

		for ( let j = 0; j < emptyIconCount; j++ ) {
			icons.push(
				<FontAwesome icon={ [ 'far', 'star' ] } key={ `empty${ j }` } />
			);
		}

		return icons;
	};

	const classes = classnames( 'smb-evaluation-star', className, {
		[ `smb-evaluation-star--title-${ titleAlign }` ]: 'left' !== titleAlign,
	} );

	const bodyClasses = classnames(
		'smb-evaluation-star__numeric',
		`smb-evaluation-star__numeric--${ numericAlign }`
	);

	const evaluationStarBodyStyles = {
		color: numericColor || undefined,
		display: isDisplayNumeric ? 'inline' : 'none',
	};

	const evaluationStarIconStyles = {
		color: iconColor || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

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

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	const onChangeTitleAlign = ( value ) =>
		setAttributes( {
			titleAlign: value,
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

					<SelectControl
						label={ __( 'Title position', 'snow-monkey-blocks' ) }
						value={ titleAlign }
						onChange={ onChangeTitleAlign }
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

			<div { ...blockProps }>
				{ ( ! RichText.isEmpty( title ) || isSelected ) && (
					<RichText
						tagName="span"
						className="smb-evaluation-star__title"
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						onChange={ onChangeTitle }
					/>
				) }

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
			</div>
		</>
	);
}
