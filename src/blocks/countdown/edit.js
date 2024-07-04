import classnames from 'classnames';

import {
	AlignmentToolbar,
	BlockControls,
	getFontSizeClass,
	getFontSizeObjectByValue,
	FontSizePicker,
	InspectorControls,
	useSettings,
	useBlockProps,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	BaseControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { __ } from '@wordpress/i18n';

import DateTimePicker from '@smb/component/date-time-picker';

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		alignment,
		numericColor,
		clockColor,
		countdownTime,
		numericFontSizeSlug,
		numericFontSize,
		clockFontSizeSlug,
		clockFontSize,
	} = attributes;

	const [ fontSizes ] = useSettings( 'typography.fontSizes' );

	const classes = classnames( 'smb-countdown', className );

	const listClasses = classnames( 'smb-countdown__list', {
		[ `align-${ alignment }` ]: !! alignment,
	} );

	const styles = {
		'--smb-countdown--numeric-color': numericColor || undefined,
		'--smb-countdown--clock-color': clockColor || undefined,
	};

	const clockFontSizeClass = !! clockFontSizeSlug
		? getFontSizeClass( clockFontSizeSlug )
		: undefined;

	const numericFontSizeClass = !! numericFontSizeSlug
		? getFontSizeClass( numericFontSizeSlug )
		: undefined;

	const selectedClockFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! clockFontSizeSlug && fontSize.slug === clockFontSizeSlug
		)?.size || clockFontSize;

	const selectedNumericFontSize =
		fontSizes.find(
			( fontSize ) =>
				!! numericFontSizeSlug && fontSize.slug === numericFontSizeSlug
		)?.size || clockFontSize;

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( value ) =>
						setAttributes( {
							alignment: value,
						} )
					}
				/>
			</BlockControls>

			<InspectorControls group="typography">
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
						id="snow-monkey-blocks/countdown/numeric-font-size"
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

				<ToolsPanelItem
					panelId={ clientId }
					hasValue={ () =>
						clockFontSizeSlug !== metadata.clockFontSizeSlug ||
						clockFontSize !== metadata.clockFontSize
					}
					isShownByDefault
					label={ __( 'Clock font size', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						clockFontSizeSlug: metadata.clockFontSizeSlug,
						clockFontSize: metadata.clockFontSize,
					} ) }
					onDeselect={ () => {
						setAttributes( {
							clockFontSizeSlug: metadata.clockFontSizeSlug,
							clockFontSize: metadata.clockFontSize,
						} );
					} }
				>
					<BaseControl
						label={ __( 'Clock', 'snow-monkey-blocks' ) }
						id="snow-monkey-blocks/countdown/clock-font-size"
					>
						<FontSizePicker
							value={ selectedClockFontSize }
							onChange={ ( value ) => {
								const fontSizeSlug = getFontSizeObjectByValue(
									fontSizes,
									value
								).slug;

								setAttributes( {
									clockFontSizeSlug:
										fontSizeSlug || undefined,
									clockFontSize: ! fontSizeSlug
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
						{
							colorValue: clockColor,
							onColorChange: ( value ) =>
								setAttributes( {
									clockColor: value,
								} ),
							resetAllFilter: () => ( {
								clockColor: metadata.clockColor,
							} ),
							label: __( 'Clock color', 'snow-monkey-blocks' ),
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
							countdownTime !==
							metadata.attributes.countdownTime.default
						}
						isShownByDefault
						label={ __( 'Date time', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								countdownTime:
									metadata.attributes.countdownTime.default,
							} )
						}
					>
						<DateTimePicker
							currentDate={ countdownTime }
							onChange={ ( value ) =>
								setAttributes( {
									countdownTime: value,
								} )
							}
							onReset={ () =>
								setAttributes( {
									countdownTime:
										metadata.attributes.countdownTime
											.default,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<div { ...blockProps }>
				<ul className={ listClasses } data-time={ countdownTime }>
					<li className="smb-countdown__list-item smb-countdown__list-item__days">
						<span
							className={ classnames(
								'smb-countdown__list-item__numeric',
								numericFontSizeClass
							) }
							style={ { fontSize: numericFontSize || undefined } }
						>
							-
						</span>
						<span
							className={ classnames(
								'smb-countdown__list-item__clock',
								clockFontSizeClass
							) }
							style={ { fontSize: clockFontSize || undefined } }
						>
							{ __( 'Days', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__hours">
						<span
							className={ classnames(
								'smb-countdown__list-item__numeric',
								numericFontSizeClass
							) }
							style={ { fontSize: numericFontSize || undefined } }
						>
							--
						</span>
						<span
							className={ classnames(
								'smb-countdown__list-item__clock',
								clockFontSizeClass
							) }
							style={ { fontSize: clockFontSize || undefined } }
						>
							{ __( 'Hours', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__minutes">
						<span
							className={ classnames(
								'smb-countdown__list-item__numeric',
								numericFontSizeClass
							) }
							style={ { fontSize: numericFontSize || undefined } }
						>
							--
						</span>
						<span
							className={ classnames(
								'smb-countdown__list-item__clock',
								clockFontSizeClass
							) }
							style={ { fontSize: clockFontSize || undefined } }
						>
							{ __( 'Minutes', 'snow-monkey-blocks' ) }
						</span>
					</li>
					<li className="smb-countdown__list-item smb-countdown__list-item__seconds">
						<span
							className={ classnames(
								'smb-countdown__list-item__numeric',
								numericFontSizeClass
							) }
							style={ { fontSize: numericFontSize || undefined } }
						>
							--
						</span>
						<span
							className={ classnames(
								'smb-countdown__list-item__clock',
								clockFontSizeClass
							) }
							style={ { fontSize: clockFontSize || undefined } }
						>
							{ __( 'Seconds', 'snow-monkey-blocks' ) }
						</span>
					</li>
				</ul>
			</div>
		</>
	);
}
