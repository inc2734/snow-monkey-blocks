import classnames from 'classnames';

import { PanelBody, RangeControl } from '@wordpress/components';

import {
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

export default function ( { attributes, setAttributes, className } ) {
	const { title, rating, color } = attributes;

	const classes = classnames( 'smb-rating-box__item', className );

	const itemEvaluationRatingStyles = {
		width: `${ rating * 10 }%`,
		backgroundColor: color || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const onChangeRating = ( value ) =>
		setAttributes( {
			rating: toNumber( value, 0, 10 ),
		} );

	const onChangeColor = ( value ) =>
		setAttributes( {
			color: value,
		} );

	const onChangeTitle = ( value ) =>
		setAttributes( {
			title: value,
		} );

	return (
		<>
			<InspectorControls>
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: color,
							onColorChange: onChangeColor,
							label: __( 'Bar color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				></PanelColorGradientSettings>

				<PanelBody
					title={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<RangeControl
						label={ __( 'Rating', 'snow-monkey-blocks' ) }
						value={ rating }
						onChange={ onChangeRating }
						min="1"
						max="10"
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					className="smb-rating-box__item__title"
					placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
					value={ title }
					multiline={ false }
					onChange={ onChangeTitle }
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
		</>
	);
}
