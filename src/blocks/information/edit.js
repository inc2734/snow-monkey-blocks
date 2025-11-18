import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	BaseControl,
	RangeControl,
	SelectControl,
	ToggleControl,
	BorderBoxControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { useToolsPanelDropdownMenuProps } from '@smb/helper';

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/information-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/information-item' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const {
		labelColumnSize,
		labelAlign,
		labelVerticalAlign,
		smIsSplitColumn,
		columnPadding,
		labelColumnBackgroundColor,
		labelColumnTextColor,
		contentColumnBackgroundColor,
		borderColor,
		borderStyle,
		borderWidth,
		templateLock,
	} = attributes;

	const classes = classnames( 'smb-information', className, {
		'smb-information--has-border': !! borderWidth,
	} );

	const styles = {
		'--smb-information--column-padding': !! columnPadding
			? `var(--smb-information--column-padding-${ columnPadding })`
			: undefined,
		'--smb-information--label-column-background-color':
			labelColumnBackgroundColor || undefined,
		'--smb-information--label-column-text-color':
			labelColumnTextColor || undefined,
		'--smb-information--content-column-background-color':
			contentColumnBackgroundColor || undefined,
		'--smb-information--border-color': borderColor || undefined,
		'--smb-information--border-style': borderStyle || undefined,
		'--smb-information--border-width': borderWidth || undefined,
	};

	const blockProps = useBlockProps( {
		className: classes,
		style: styles,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'smb-information__body',
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			template: TEMPLATE,
			templateLock,
			renderAppender: hasInnerBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	const dropdownMenuProps = useToolsPanelDropdownMenuProps();

	const paddingOptions = [
		{
			label: 'S',
			value: 1,
		},
		{
			label: 'M',
			value: 2,
		},
		{
			label: 'L',
			value: 3,
		},
	];

	return (
		<>
			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
					dropdownMenuProps={ dropdownMenuProps }
				>
					<ToolsPanelItem
						hasValue={ () =>
							labelColumnSize !==
							metadata.attributes.labelColumnSize.default
						}
						isShownByDefault
						label={ __(
							'Label column size',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								labelColumnSize:
									metadata.attributes.labelColumnSize.default,
							} )
						}
					>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __(
								'Label column size',
								'snow-monkey-blocks'
							) }
							value={ labelColumnSize }
							options={ [
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
								},
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 50,
									label: __( '50%', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									labelColumnSize: parseInt( value ),
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							labelAlign !==
							metadata.attributes.labelAlign.default
						}
						isShownByDefault
						label={ __(
							'Label horizontal alignment',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								labelAlign:
									metadata.attributes.labelAlign.default,
							} )
						}
					>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __(
								'Label horizontal alignment',
								'snow-monkey-blocks'
							) }
							value={ labelAlign }
							options={ [
								{
									value: '',
									label: __( 'Left', 'snow-monkey-blocks' ),
								},
								{
									value: 'center',
									label: __( 'Center', 'snow-monkey-blocks' ),
								},
								{
									value: 'right',
									label: __( 'Right', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									labelAlign: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							labelVerticalAlign !==
							metadata.attributes.labelVerticalAlign.default
						}
						isShownByDefault
						label={ __(
							'Label vertical alignment',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								labelVerticalAlign:
									metadata.attributes.labelVerticalAlign
										.default,
							} )
						}
					>
						<SelectControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							label={ __(
								'Label vertical alignment',
								'snow-monkey-blocks'
							) }
							value={ labelVerticalAlign }
							options={ [
								{
									value: '',
									label: __( 'Top', 'snow-monkey-blocks' ),
								},
								{
									value: 'middle',
									label: __( 'Middle', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									labelVerticalAlign: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							smIsSplitColumn !==
							metadata.attributes.smIsSplitColumn.default
						}
						isShownByDefault
						label={ __(
							"Don't split the column in a smartphone",
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								smIsSplitColumn:
									metadata.attributes.smIsSplitColumn.default,
							} )
						}
					>
						<ToggleControl
							__nextHasNoMarginBottom
							label={ __(
								"Don't split the column in a smartphone",
								'snow-monkey-blocks'
							) }
							checked={ ! smIsSplitColumn }
							onChange={ ( value ) =>
								setAttributes( {
									smIsSplitColumn: ! value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					{ ...useMultipleOriginColorsAndGradients() }
					panelId={ clientId }
					__experimentalIsRenderedInSidebar
					settings={ [
						{
							colorValue: labelColumnBackgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									labelColumnBackgroundColor: value,
								} ),
							resetAllFilter: () => ( {
								labelColumnBackgroundColor:
									metadata.attributes
										.labelColumnBackgroundColor?.default,
							} ),
							label: __(
								'Label column background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: labelColumnTextColor,
							onColorChange: ( value ) =>
								setAttributes( {
									labelColumnTextColor: value,
								} ),
							resetAllFilter: () => ( {
								labelColumnTextColor:
									metadata.attributes.labelColumnTextColor
										?.default,
							} ),
							label: __(
								'Label column text color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: contentColumnBackgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									contentColumnBackgroundColor: value,
								} ),
							resetAllFilter: () => ( {
								contentColumnBackgroundColor:
									metadata.attributes
										.contentColumnBackgroundColor?.default,
							} ),
							label: __(
								'Content column background color',
								'snow-monkey-blocks'
							),
						},
					] }
				/>
			</InspectorControls>

			<InspectorControls group="border">
				<ToolsPanelItem
					hasValue={ () =>
						borderColor !==
							metadata.attributes.borderColor.default ||
						borderStyle !==
							metadata.attributes.borderStyle.default ||
						borderWidth !== metadata.attributes.borderWidth.default
					}
					isShownByDefault
					label={ __( 'Border', 'snow-monkey-blocks' ) }
					resetAllFilter={ () => ( {
						borderColor: metadata.attributes.borderColor.default,
						borderStyle: metadata.attributes.borderStyle.default,
						borderWidth: metadata.attributes.borderWidth.default,
					} ) }
					onDeselect={ () =>
						setAttributes( {
							borderColor:
								metadata.attributes.borderColor.default,
							borderStyle:
								metadata.attributes.borderStyle.default,
							borderWidth:
								metadata.attributes.borderWidth.default,
						} )
					}
					panelId={ clientId }
				>
					<BorderBoxControl
						{ ...useMultipleOriginColorsAndGradients() }
						__next40pxDefaultSize
						__experimentalIsRenderedInSidebar
						className="smb-border-box-control"
						enableAlpha={ true }
						enableStyle={ true }
						onChange={ ( value ) => {
							setAttributes( {
								borderColor: value?.color,
								borderStyle: value?.style,
								borderWidth: value?.width,
							} );
						} }
						popoverOffset={ 40 }
						popoverPlacement="left-start"
						value={ {
							color: borderColor,
							style: borderStyle,
							width: borderWidth,
						} }
					/>
				</ToolsPanelItem>
			</InspectorControls>

			<InspectorControls group="dimensions">
				<ToolsPanelItem
					hasValue={ () =>
						columnPadding !==
						metadata.attributes.columnPadding.default
					}
					isShownByDefault
					label={ __( 'Padding', 'snow-monkey-blocks' ) }
					onDeselect={ () =>
						setAttributes( {
							columnPadding:
								metadata.attributes.columnPadding.default,
						} )
					}
					panelId={ clientId }
				>
					<BaseControl
						__nextHasNoMarginBottom
						id="snow-monkey-blocks/information/padding"
						label={ __( 'Padding', 'snow-monkey-blocks' ) }
						className="spacing-sizes-control"
					>
						<RangeControl
							__next40pxDefaultSize
							__nextHasNoMarginBottom
							className="spacing-sizes-control__range-control"
							value={
								paddingOptions.filter(
									( option ) =>
										option.label?.toLowerCase() ===
										columnPadding
								)?.[ 0 ]?.value
							}
							resetFallbackValue={ undefined }
							onChange={ ( value ) =>
								setAttributes( {
									columnPadding: paddingOptions
										.filter(
											( option ) => option.value === value
										)?.[ 0 ]
										?.label?.toLowerCase(),
								} )
							}
							withInputField={ false }
							min={ 1 }
							max={ 3 }
							marks
							renderTooltipContent={ ( _value ) =>
								paddingOptions
									.filter(
										( option ) => option.value === _value
									)?.[ 0 ]
									?.label?.toUpperCase()
							}
							hideLabelFromVision
							withReset
						/>
					</BaseControl>
				</ToolsPanelItem>
			</InspectorControls>

			<div
				{ ...blockProps }
				data-sm-split-column={ smIsSplitColumn ? 'true' : undefined }
				data-label-align={ labelAlign || 'left' }
				data-label-vertical-align={ labelVerticalAlign || 'top' }
			>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
