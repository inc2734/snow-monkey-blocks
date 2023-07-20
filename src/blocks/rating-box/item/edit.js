import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	useBlockProps,
} from '@wordpress/block-editor';

import {
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className } ) {
	const { title, rating, color } = attributes;

	const classes = classnames( 'smb-rating-box__item', className );

	const styles = {
		'--smb-rating-box--rating-background-color': color || undefined,
	};

	const itemEvaluationRatingStyles = {
		width: `${ rating * 10 }%`,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					initialOpen={ false }
					settings={ [
						{
							colorValue: color,
							onColorChange: ( value ) =>
								setAttributes( {
									color: value,
								} ),
							label: __( 'Bar color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
				></PanelColorGradientSettings>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							rating !== metadata.attributes.rating.default
						}
						isShownByDefault
						label={ __( 'Rating', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								rating: metadata.attributes.rating.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Rating', 'snow-monkey-blocks' ) }
							value={ rating }
							onChange={ ( value ) =>
								setAttributes( {
									rating: toNumber( value, 0, 10 ),
								} )
							}
							min="1"
							max="10"
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					className="smb-rating-box__item__title"
					placeholder={ __( 'Write title…', 'snow-monkey-blocks' ) }
					value={ title }
					multiline={ false }
					onChange={ ( value ) =>
						setAttributes( {
							title: value,
						} )
					}
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
