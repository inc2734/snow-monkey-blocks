import classnames from 'classnames';

import {
	FontSizePicker,
	InspectorControls,
	RichText,
	useBlockProps,
	getFontSizeClass,
	getFontSizeObjectByValue,
	useSettings,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	BaseControl,
	RangeControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		title,
		rating,
		color,
		titleFontSizeSlug,
		titleFontSize,
		numericFontSizeSlug,
		numericFontSize,
	} = attributes;

	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

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

	const selectedTitleFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! titleFontSizeSlug && fontSize.slug === titleFontSizeSlug
		)?.size || titleFontSize;

	const selectedNumericFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! numericFontSizeSlug && fontSize.slug === numericFontSizeSlug
		)?.size || numericFontSize;

	const titleFontSizeClass = !! titleFontSizeSlug
		? getFontSizeClass( titleFontSizeSlug )
		: undefined;

	const numericFontSizeClass = !! numericFontSizeSlug
		? getFontSizeClass( numericFontSizeSlug )
		: undefined;

	return (
		<>
			<InspectorControls group="typography">
				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						titleFontSizeSlug !== metadata.titleFontSizeSlug ||
						titleFontSize !== metadata.titleFontSize
					}
					isShownByDefault
					label={ __( 'Title font size', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						titleFontSizeSlug: metadata.titleFontSizeSlug,
						titleFontSize: metadata.titleFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							titleFontSizeSlug: metadata.titleFontSizeSlug,
							titleFontSize: metadata.titleFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Title', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/rating-box-item/title-font-size"
					>
						<FontSizePicker
							value={ selectedTitleFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									titleFontSizeSlug:
										fontSizeSlug || undefined,
									titleFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>

				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						numericFontSizeSlug !== metadata.numericFontSizeSlug ||
						numericFontSize !== metadata.numericFontSize
					}
					isShownByDefault
					label={ __( 'Numeric font size', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						numericFontSizeSlug: metadata.numericFontSizeSlug,
						numericFontSize: metadata.numericFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							numericFontSizeSlug: metadata.numericFontSizeSlug,
							numericFontSize: metadata.numericFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Numeric', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/rating-box-item/numeric-font-size"
					>
						<FontSizePicker
							value={ selectedNumericFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									numericFontSizeSlug:
										fontSizeSlug || undefined,
									numericFontSize: ! fontSizeSlug
										? value
										: undefined,
								} );
							} }
							withReset={ false }
							withSlider
						/>
					</BaseControl>
				</ToolsPanelItem>
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					{ ...useMultipleOriginColorsAndGradients() }
					settings={ [
						{
							colorValue: color,
							onColorChange: ( value ) =>
								setAttributes( {
									color: value,
								} ),
							resetAllFilter: () => ( {
								color: metadata.color,
							} ),
							label: __( 'Bar color', 'snow-monkey-blocks' ),
						},
					] }
				/>
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
				<div className="smb-rating-box__item__body">
					<RichText
						className={ classnames(
							'smb-rating-box__item__title',
							titleFontSizeClass
						) }
						style={ {
							fontSize: titleFontSize || undefined,
						} }
						placeholder={ __(
							'Write title…',
							'snow-monkey-blocks'
						) }
						value={ title }
						multiline={ false }
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
					/>

					<div
						className={ classnames(
							'smb-rating-box__item__numeric',
							numericFontSizeClass
						) }
						style={ {
							fontSize: numericFontSize || undefined,
						} }
					>
						{ rating }
					</div>
				</div>

				<div className="smb-rating-box__item__evaluation">
					<div className="smb-rating-box__item__evaluation__bar">
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
