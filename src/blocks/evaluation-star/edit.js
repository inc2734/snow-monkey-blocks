import classnames from 'classnames';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
} from '@wordpress/block-editor';

import {
	RangeControl,
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __, sprintf } from '@wordpress/i18n';

import FontAwesome from '@smb/component/font-awesome';
import { toNumber } from '@smb/helper';

import metadata from './block.json';

export default function ( {
	attributes,
	setAttributes,
	className,
	isSelected,
	clientId,
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
			icons.push( <FontAwesome icon="star-half-stroke" key="half1" /> );
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

	const styles = {
		'--smb-evaluation-star--icon-color': iconColor || undefined,
		'--smb-evaluation-star--numeric-color': numericColor || undefined,
	};

	const bodyClasses = classnames(
		'smb-evaluation-star__numeric',
		`smb-evaluation-star__numeric--${ numericAlign }`
	);

	const evaluationStarBodyStyles = {
		display: isDisplayNumeric ? 'inline' : 'none',
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	return (
		<>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [
						{
							colorValue: iconColor,
							onColorChange: ( value ) =>
								setAttributes( {
									iconColor: value,
								} ),
							resetAllFilter: () => ( {
								iconColor: metadata.iconColor,
							} ),
							label: __( 'Icon color', 'snow-monkey-blocks' ),
						},
						{
							colorValue: numericColor,
							onColorChange: ( value ) =>
								setAttributes( {
									numericColor: value,
								} ),
							resetAllFilter: () => ( {
								numericColor: metadata.numericColor,
							} ),
							label: __( 'Numeric color', 'snow-monkey-blocks' ),
						},
					] }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					panelId={ clientId }
				/>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
				>
					<ToolsPanelItem
						hasValue={ () =>
							evaluationValue !==
							metadata.attributes.evaluationValue.default
						}
						isShownByDefault
						label={ __( 'Evaluation', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								evaluationValue:
									metadata.attributes.evaluationValue.default,
							} )
						}
					>
						<RangeControl
							label={ __( 'Evaluation', 'snow-monkey-blocks' ) }
							help={ __(
								'Five-grade evaluation',
								'snow-monkey-blocks'
							) }
							value={ evaluationValue }
							onChange={ ( value ) =>
								setAttributes( {
									evaluationValue: toNumber( value, 0, 5 ),
								} )
							}
							min={ 0 }
							max={ 5 }
							step={ 0.1 }
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							titleAlign !==
							metadata.attributes.titleAlign.default
						}
						isShownByDefault
						label={ __( 'Title position', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								titleAlign:
									metadata.attributes.titleAlign.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Title position',
								'snow-monkey-blocks'
							) }
							value={ titleAlign }
							onChange={ ( value ) =>
								setAttributes( {
									titleAlign: value,
								} )
							}
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
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							isDisplayNumeric !==
							metadata.attributes.isDisplayNumeric.default
						}
						isShownByDefault
						label={ __( 'Show numeric', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								isDisplayNumeric:
									metadata.attributes.isDisplayNumeric
										.default,
							} )
						}
					>
						<ToggleControl
							label={ __( 'Show numeric', 'snow-monkey-blocks' ) }
							checked={ isDisplayNumeric }
							onChange={ ( value ) =>
								setAttributes( {
									isDisplayNumeric: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							numericAlign !==
							metadata.attributes.numericAlign.default
						}
						isShownByDefault
						label={ __( 'Show numeric', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								numericAlign:
									metadata.attributes.numericAlign.default,
							} )
						}
					>
						<SelectControl
							label={ __(
								'Numeric position',
								'snow-monkey-blocks'
							) }
							value={ numericAlign }
							onChange={ ( value ) =>
								setAttributes( {
									numericAlign: value,
								} )
							}
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
					</ToolsPanelItem>
				</ToolsPanel>
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
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
					/>
				) }

				<div className="smb-evaluation-star__body">
					<span
						className={ bodyClasses }
						style={ evaluationStarBodyStyles }
					>
						{ sprintf( '%.1f', Number( evaluationValue ) ) }
					</span>
					<div className="smb-evaluation-star__icon">
						<span>{ generateIcons() }</span>
					</div>
				</div>
			</div>
		</>
	);
}
