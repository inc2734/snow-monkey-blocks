import classnames from 'classnames';

import {
	BlockControls,
	BlockVerticalAlignmentToolbar,
	InnerBlocks,
	InspectorControls,
	JustifyToolbar,
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

import {
	BaseControl,
	RangeControl,
	ToggleControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import { toNumber } from '@smb/helper';
import ResponsiveTabPanel from '@smb/component/responsive-tab-panel';

const ALLOWED_BLOCKS = [
	'snow-monkey-blocks/items-item-standard',
	'snow-monkey-blocks/items-item-block-link',
	'snow-monkey-blocks/items-banner',
	'snow-monkey-blocks/items-item-free',
];

const HORIZONTAL_JUSTIFY_CONTROLS = [
	'left',
	'center',
	'right',
	'space-between',
];

import metadata from './block.json';

export default function ( { attributes, setAttributes, className, clientId } ) {
	const {
		sm,
		md,
		lg,
		isGlue,
		isFill,
		verticalAlignment,
		contentJustification,
		gap,
		templateLock,
	} = attributes;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
				?.length,
		[ clientId ]
	);

	const classes = classnames( 'smb-items', className, {
		'smb-items--glue': isGlue && ! gap,
		'smb-items--fill': isFill,
	} );

	const contentJustificationModifier =
		!! contentJustification && 'left' !== contentJustification
			? contentJustification.replace( 'space-', '' )
			: undefined;

	const rowClasses = classnames( 'c-row', {
		'c-row--margin': ! isGlue && ( 'm' === gap || ! gap ),
		'c-row--middle': 'center' === verticalAlignment,
		'c-row--bottom': 'bottom' === verticalAlignment,
		[ `c-row--${ contentJustificationModifier }` ]: contentJustification,
		[ `c-row--margin-${ gap }` ]:
			! isGlue && ( 's' === gap || 'l' === gap ),
	} );

	const blockProps = useBlockProps( {
		className: classes,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{
			className: rowClasses,
		},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			templateLock,
			renderAppender: hasInnerBlocks
				? InnerBlocks.DefaultBlockAppender
				: InnerBlocks.ButtonBlockAppender,
			orientation: 'horizontal',
		}
	);

	const gapOptions = [
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
				>
					{ ! gap && (
						<ToolsPanelItem
							hasValue={ () =>
								isGlue !== metadata.attributes.isGlue.default
							}
							isShownByDefault
							label={ __(
								'Glue each item together',
								'snow-monkey-blocks'
							) }
							onDeselect={ () =>
								setAttributes( {
									isGlue: metadata.attributes.isGlue.default,
								} )
							}
						>
							<ToggleControl
								label={ __(
									'Glue each item together',
									'snow-monkey-blocks'
								) }
								checked={ isGlue }
								onChange={ ( value ) =>
									setAttributes( {
										isGlue: value,
									} )
								}
							/>
						</ToolsPanelItem>
					) }

					<ToolsPanelItem
						hasValue={ () =>
							isFill !== metadata.attributes.isFill.default
						}
						isShownByDefault
						label={ __(
							'Align the bottom of the last element of each items',
							'snow-monkey-blocks'
						) }
						onDeselect={ () =>
							setAttributes( {
								isFill: metadata.attributes.isFill.default,
							} )
						}
					>
						<ToggleControl
							label={ __(
								'Align the bottom of the last element of each items',
								'snow-monkey-blocks'
							) }
							checked={ isFill }
							onChange={ ( value ) =>
								setAttributes( {
									isFill: value,
								} )
							}
						/>
					</ToolsPanelItem>

					<ToolsPanelItem
						hasValue={ () =>
							lg !== metadata.attributes.lg.default ||
							md !== metadata.attributes.md.default ||
							sm !== metadata.attributes.sm.default
						}
						isShownByDefault
						label={ __( 'Columns per row', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								lg: metadata.attributes.lg.default,
								md: metadata.attributes.md.default,
								sm: metadata.attributes.sm.default,
							} )
						}
					>
						<ResponsiveTabPanel
							desktop={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Large window)',
										'snow-monkey-blocks'
									) }
									value={ lg }
									onChange={ ( value ) =>
										setAttributes( {
											lg: toNumber( value, 1, 6 ),
										} )
									}
									min="1"
									max="6"
								/>
							) }
							tablet={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Medium window)',
										'snow-monkey-blocks'
									) }
									value={ md }
									onChange={ ( value ) =>
										setAttributes( {
											md: toNumber( value, 1, 6 ),
										} )
									}
									min="1"
									max="6"
								/>
							) }
							mobile={ () => (
								<RangeControl
									label={ __(
										'Columns per row (Small window)',
										'snow-monkey-blocks'
									) }
									value={ sm }
									onChange={ ( value ) =>
										setAttributes( {
											sm: toNumber( value, 1, 6 ),
										} )
									}
									min="1"
									max="6"
								/>
							) }
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>

			{ ! isGlue && (
				<InspectorControls group="dimensions">
					<ToolsPanelItem
						hasValue={ () =>
							gap !== metadata.attributes.gap.default
						}
						isShownByDefault
						label={ __( 'Gap', 'snow-monkey-blocks' ) }
						onDeselect={ () =>
							setAttributes( {
								gap: metadata.attributes.gap.default,
							} )
						}
						panelId={ clientId }
					>
						<BaseControl
							id="snow-monkey-blocks/items/gap"
							label={ __( 'Gap', 'snow-monkey-blocks' ) }
							className="spacing-sizes-control"
						>
							<RangeControl
								className="spacing-sizes-control__range-control"
								value={
									gapOptions.filter(
										( option ) =>
											option.label?.toLowerCase() === gap
									)?.[ 0 ]?.value
								}
								resetFallbackValue={ undefined }
								onChange={ ( value ) =>
									setAttributes( {
										gap: gapOptions
											.filter(
												( option ) =>
													option.value === value
											)?.[ 0 ]
											?.label?.toLowerCase(),
									} )
								}
								withInputField={ false }
								min={ 1 }
								max={ 3 }
								marks
								renderTooltipContent={ ( _value ) =>
									gapOptions
										.filter(
											( option ) =>
												option.value === _value
										)?.[ 0 ]
										?.label?.toUpperCase()
								}
								hideLabelFromVision
								__nextHasNoMarginBottom
							/>
						</BaseControl>
					</ToolsPanelItem>
				</InspectorControls>
			) }

			<BlockControls group="block">
				<BlockVerticalAlignmentToolbar
					onChange={ ( value ) =>
						setAttributes( {
							verticalAlignment: value,
						} )
					}
					value={ verticalAlignment }
				/>

				<JustifyToolbar
					allowedControls={ HORIZONTAL_JUSTIFY_CONTROLS }
					value={ contentJustification }
					onChange={ ( value ) =>
						setAttributes( { contentJustification: value } )
					}
				/>
			</BlockControls>

			<div { ...blockProps }>
				<div
					{ ...innerBlocksProps }
					data-columns={ sm }
					data-md-columns={ md }
					data-lg-columns={ lg }
				/>
			</div>
		</>
	);
}
