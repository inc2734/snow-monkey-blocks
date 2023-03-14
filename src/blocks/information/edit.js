import classnames from 'classnames';

import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
	useInnerBlocksProps,
	__experimentalPanelColorGradientSettings as PanelColorGradientSettings,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients,
} from '@wordpress/block-editor';

import {
	SelectControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderBoxControl as BorderBoxControl,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import {
	useMigrateDoubleHyphenToSingleHyphen,
	useMultipleOriginColorsAndGradientsFallback, // @todo For WordPress 6.0
} from '@smb/hooks';

// @todo For WordPress 6.0
if ( undefined === useMultipleOriginColorsAndGradients ) {
	useMultipleOriginColorsAndGradients =
		useMultipleOriginColorsAndGradientsFallback;
}

const ALLOWED_BLOCKS = [ 'snow-monkey-blocks/information-item' ];
const TEMPLATE = [ [ 'snow-monkey-blocks/information-item' ] ];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	useMigrateDoubleHyphenToSingleHyphen( clientId, [
		{
			oldBlockName: 'snow-monkey-blocks/information--item',
			newBlockName: 'snow-monkey-blocks/information-item',
		},
	] );

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
		contentColumnBackgroundColor,
		borderColor,
		borderWidth,
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
		'--smb-information--content-column-background-color':
			contentColumnBackgroundColor || undefined,
		'--smb-information--border-color': borderColor || undefined,
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
			templateLock: false,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
		}
	);

	return (
		<>
			<InspectorControls group="styles">
				<PanelColorGradientSettings
					title={ __( 'Color', 'snow-monkey-blocks' ) }
					settings={ [
						{
							colorValue: labelColumnBackgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									labelColumnBackgroundColor: value,
								} ),
							label: __(
								'Label column background color',
								'snow-monkey-blocks'
							),
						},
						{
							colorValue: contentColumnBackgroundColor,
							onColorChange: ( value ) =>
								setAttributes( {
									contentColumnBackgroundColor: value,
								} ),
							label: __(
								'Content column background color',
								'snow-monkey-blocks'
							),
						},
					] }
					__experimentalHasMultipleOrigins={ true }
					__experimentalIsRenderedInSidebar={ true }
				/>

				<ToolsPanel label={ __( 'Dimensions', 'snow-monkey-blocks' ) }>
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
					>
						<SelectControl
							label={ __( 'Padding', 'snow-monkey-blocks' ) }
							value={ columnPadding }
							options={ [
								{
									value: '',
									label: __(
										'Default',
										'snow-monkey-blocks'
									),
								},
								{
									value: 's',
									label: __( 'S', 'snow-monkey-blocks' ),
								},
								{
									value: 'm',
									label: __( 'M', 'snow-monkey-blocks' ),
								},
								{
									value: 'l',
									label: __( 'L', 'snow-monkey-blocks' ),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( {
									columnPadding: value,
								} )
							}
						/>
					</ToolsPanelItem>
				</ToolsPanel>

				<ToolsPanel label={ __( 'Border', 'snow-monkey-blocks' ) }>
					<ToolsPanelItem
						hasValue={ () =>
							borderColor !==
								metadata.attributes.borderColor.default ||
							borderWidth !==
								metadata.attributes.borderWidth.default
						}
						isShownByDefault
						label={ __( 'Border', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								borderColor:
									metadata.attributes.borderColor.default,
								borderWidth:
									metadata.attributes.borderWidth.default,
							} )
						}
					>
						<BorderBoxControl
							{ ...useMultipleOriginColorsAndGradients() }
							className="smb-border-box-control"
							enableAlpha={ false }
							enableStyle={ false }
							onChange={ ( value ) => {
								setAttributes( {
									borderColor: value.color,
									borderWidth: value.width,
								} );
							} }
							popoverOffset={ 40 }
							popoverPlacement="left-start"
							value={ {
								color: borderColor,
								width: borderWidth,
							} }
							__experimentalHasMultipleOrigins={ true }
							__experimentalIsRenderedInSidebar={ true }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			<InspectorControls>
				<ToolsPanel
					label={ __( 'Block settings', 'snow-monkey-blocks' ) }
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
							label={ __(
								'Label column size',
								'snow-monkey-blocks'
							) }
							value={ labelColumnSize }
							options={ [
								{
									value: 33,
									label: __( '33%', 'snow-monkey-blocks' ),
								},
								{
									value: 25,
									label: __( '25%', 'snow-monkey-blocks' ),
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
							label={ __(
								'Label horizontal alignment',
								'snow-monkey-blocks'
							) }
							value={ labelAlign }
							options={ [
								{
									value: '',
									label: __(
										'Left side',
										'snow-monkey-blocks'
									),
								},
								{
									value: 'right',
									label: __(
										'Right side',
										'snow-monkey-blocks'
									),
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
